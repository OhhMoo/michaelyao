2026-08-22, 15:39
Tags: [[llm]] [[ML]]

### 1. FFN (Feed-Forward Network)
![[Pasted image 20260822154102.png|309]]

##### 用一个例子：句子 "The cat sat"
假设输入序列是 3 个 token，每个 token 过完 embedding + 位置编码后得到一个 512 维向量。可以把它想成一张 3 行的表：

```
输入 x（3 × 512）：
┌─────────┬────────────────────────────┐
│ The     │ [0.2, -0.5, ..., 0.8]      │  ← 512 个数，表示"The 是什么 + 它在第1位"
│ cat     │ [0.7, 0.1, ..., -0.3]      │  ← "cat 是什么 + 它在第2位"
│ sat     │ [-0.4, 0.9, ..., 0.2]      │  ← "sat 是什么 + 它在第3位"
└─────────┴────────────────────────────┘
```

注意此刻每个向量里**只有自己这个词的信息**——`cat` 的向量完全不知道句子里有 `The` 和 `sat`。

##### 注意力层生成了什么
注意力做的事，一句话：**让每个 token 根据自己的需要，从其他 token 那里"收集"信息，合成一个新向量。**

1.：每个 token 同时扮演三个角色
每个向量被三个矩阵分别投影成 Q、K、V：
- **Query（查询）**："我在找什么？" —— 比如 `sat` 的 Q 可能在"询问"：谁是动作发出者？
- **Key（键）**："我是什么？" —— 每个 token 的"名片"，供别人匹配
- **Value（值）**："如果你关注我，你能从我这拿走什么信息？"

2. 算注意力权重
每个 token 的 Q 去和所有 token 的 K 点积，过 softmax，得到一行权重。比如 `sat` 那一行可能是：
```
sat 的注意力权重：  The → 0.1,   cat → 0.7,   sat → 0.2
                          （主语是 cat，所以重点关注它）
```

3. 加权求和 Value
用这些权重对所有 token 的 V 加权求和：
```
sat 的新表示 = 0.1 × V(The) + 0.7 × V(cat) + 0.2 × V(sat)
```
**这就是注意力的输出**：`sat` 的新向量里，70% 的信息来自 `cat`——它现在"知道"这个动作是猫发出的了。
对 3 个 token 都做一遍（8 个头并行做 8 遍、拼接、过 `W^O`），输出还是一张 3 × 512 的表：

```
MHA 输出（3 × 512）：
│ The │ 新向量：融合了 cat 和 sat 的信息
│ cat │ 新向量：知道自己是主语，动作是 sat
│ sat │ 新向量：知道动作发出者是 cat
```

**关键对比：进来时是"每个词孤立的意思"，出去时是"每个词在这句话里的意思"。** 这就是"上下文感知的表示"。


**最为关键的一步!**
MHA 的输出**不是直接**进 FFN，中间还要过 Add & Norm。数据是这样流的：
```
x（原始输入 3×512）
 │
 ├──→ MHA(x) = y（上下文感知的新表示 3×512）
 │              │
 │   ┌──────────┘
 │   ▼
 └──→ 相加：z = x + y        ← Add（残差，"原始的自己 + 收集来的信息"）
       │
       ▼
     LayerNorm(z)            ← Norm（每个向量数值归一化）
       │
       ▼
   这就是 FFN 的输入！（3 × 512）
       │
       ▼
   FFN：3 个向量各自独立过 W₁→ReLU→W₂（token 之间不交流）
       │
       ▼
   再 Add & Norm → 送入下一层
```

为什么中间非要加残差？因为 `y`（MHA 输出）只包含"从别人那收集来的信息"，如果直接用它往下传，**token 自己的原始信息就丢了**。`x + y` 保证了：`cat` 的新表示 = 原来的 cat + 上下文带来的修正。

所以！！！
> "每个 token 带着'我在上下文中是什么'的表示走进 FFN"


#### 1.1 什么是FFN
FFN将输入向量（通常是多头注意力输出）映射到更高维度进行*非线性变换*，然后再映射回原维度或者另一个目标维度。

>   在 Transformer 中，FFN 的中间层通常使用比输入向量更高的维度（例如，在维度为 $d_{model}=512$ 时，中间层一般是 2048）。这样可以让网络学习到更丰富和复杂的特征表示。增大前馈子层（FFN）的隐状态维度对模型性能（例如机器翻译质量、预训练模型的下游任务表现）往往有明显提升。


#### 1.2 FFN & Activation
![[Pasted image 20260822155541.png|393]]

FFN的结构其实非常简单，就是**两个全连接层 + 中间一个 ReLU 激活**：
$$
FFN(x) = ReLU(0, x·W₁ + b₁) · W₂ + b₂
$$
但是在这之中是有维度变化的，attention is all u need 里就是:
```
512 维 ──W₁──→ 2048 维 ──ReLU──→ 2048 维 ──W₂──→ 512 维
         升维 4 倍                    再压回来 
```
- 先把向量**升维**到 2048 维（d_ff = 2048），展开到更大的空间；
- ReLU 把负值截断为 0，引入**非线性**；
- 再**降维**回 512 维，好接上残差连接和下一层。

而且这里的$W1, b1, W2, b$都是可学习参数，将会在训练中被更新。

#### 1.3 FFN input and output
- Input: ffn的输入是前一个add&norm的输出，也就是每个token经过注意力融合上下文之后，又加了残差归一化的向量，所以每个 token 带着"我在上下文中是什么"的表示走进 FFN。



### 2.  Activation function

#### 一些比较basic的activation
##### 2.1 ReLU
![[Pasted image 20260822161209.png]]

##### 2.2 Tanh
![[Pasted image 20260822161235.png|486]]

##### 2.3 Sigmoid
![[Pasted image 20260822161346.png]]


#### GeLU
GeLU（Gaussian Error Linear Unit）最早在一些预训练语言模型（如 BERT）中开始流行，是一种在性能上往往优于 ReLU 的激活函数。它的形状是一个平滑的 S 型曲线，相比 ReLU，更能平滑地“选择”对负值进行保留还是裁剪。
![[Pasted image 20260822161434.png]]

```python
import numpy as np

def GeLU(x):
    return 0.5 * x * (1 + np.tanh(
        np.sqrt(2 / np.pi) * (x + 0.044715 * x**3)
    ))
```
- 和ReLU的差异：
	-  **平滑性**：GeLU 是平滑曲线，而 ReLU 在 ( x=0 ) 处存在拐点，梯度不连续。
	- **负值处理**：ReLU 对所有负值直接输出 0；GeLU 则会给负值以一定概率保留，避免“神经元死亡”问题。
	- **计算开销**：ReLU 是极其简单的分段函数，GeLU 则包含了 $\tanh$等函数，计算要更复杂，也更耗时一些。
	- **应用场景**：ReLU 更适合使用在卷积神经网络（CNN）中，而 GeLU 更适用于全连接网络（FNN）


#### Swish
![[Pasted image 20260822161646.png]]

优点：
![[Pasted image 20260822161722.png]]


### 3. GLU（Gated Linear Unite）
定义： GLU（Gated Linear Unit）是一种门控机制，将全连接输出分为两部分：一部分负责主干输出，另一部分经过一个门控函数（通常是 Sigmoid 或者其它激活）来选择性地“保留”或“抑制”信息。它有助于增强模型的表示能力。

最简单的 GLU 块可以表示为：
$$G L U(x)=F(x W+b) \odot (x V+c)$$
这里的$\odot$ 是element-wise乘积，$F$ 在这里可以替换任意activation
	- **优点**：可以理解为在不同维度上，对输入的信息进行“选择性保留”或“屏蔽”。相比单纯的激活函数，GLU 机制更灵活。
	- **缺点**：由于增加了一些线性映射和门控操作，计算量会比普通 FFN 稍大，需要根据实际需求做权衡。


因为原版的FFN有一个小问题：
```plain
FFN(x) = ReLU(x·W₁ + b₁) · W₂
```
`x·W₁` 把 512 维升到 2048 维，ReLU 把负值砍掉，再压回来。简单有效，但有个局限：**ReLU 是一个"粗暴"的开关**——大于 0 原样放行，小于 0 一刀切到 0。信息通过的"量"没法精细调节。

所以GLU的核心是，增加一个**可学习的门（gate）**
```
GLU(x) = F[(x·W + b) ⊗ σ(x·V + c)]
          线性部分    ⊗   门控部分
```

所以glu和fnn大体上是一样的，不同的是
```python
原版内部：  x ──→ x·W₁ ──→ ReLU ──→ ·W₂ ──→ 输出
              （一条路径，升维后过激活函数，再降维）

GLU 版：   x ──→ x·W₁ ────────┐
                              ├─→ ⊗ ──→ ·W₂ ──→ 输出
           x ──→ x·V ──→ 激活 ─┘
           （两条路径，一条出内容，一条出门，相乘后再降维）
```

这里的 $\odot$ 是 hadamard product, 具体在application上就是一种position wise的mutiplication --> 比如：
```python
内容支路：x·W₁   = [2.0,  -1.0,  3.0,  0.5]
门控支路：σ(x·V) = [0.9,   0.1,  0.7,  0.02]
                    ↓     ↓      ↓     ↓     对应位置相乘
结果：    ⊗ 后  = [1.8,  -0.1,  2.1,  0.01]
```

所以我们可以把这里的F替换成GeLU和swish
- GeLU
![[Pasted image 20260822171813.png]]

- Swish
![[Pasted image 20260822171832.png]]

在application层，**在总参数量（也大致是计算量）完全相同的前提下，把"一路升维 + ReLU"换成"两路升维 + 门控相乘"，模型效果反而更好。**
![[Pasted image 20260822172131.png|405]]
```python
class FeedForward(nn.Module):
    def __init__(self, dim: int, hidden_dim: int, multiple_of: int, dropout: float):
        super().__init__()
        hidden_dim = multiple_of *\
             ((2 * hidden_dim // 3 + multiple_of - 1) // multiple_of)
        self.w1 = nn.Linear(dim, hidden_dim)
        self.w2 = nn.Linear(hidden_dim, dim)
        self.w3 = nn.Linear(dim, hidden_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.dropout(self.w2(F.silu(self.w1(x)) * self.w3(x)))
```




### Summary
![[Pasted image 20260822172214.png]]
- **FFN（Feed-Forward Network）** 是 Transformer 中最重要的模块之一，与注意力机制协同工作。通过增大中间层维度并引入非线性激活，FFN 能大大提升模型的表达能力。
- **激活函数** 在 FFN 中不可或缺，决定了模型的非线性和梯度流动。除了最常见的 ReLU，GeLU 和 Swish 等平滑激活在大型预训练 Transformer 中也很受欢迎。
- **GLU（Gated Linear Unit）** 给 FFN 带来了门控机制，可进一步提升网络选择性保留信息的能力。与不同激活函数结合（Sigmoid/GeLU/Swish）能在不同场景带来性能增益。


### Reference
https://www.kimi.com/share/1a028c78-f8a2-84cd-8000-000051097a31
2026-08-21, 22:58
Tags: [[llm]] [[ML]]

### 1. What is attention
简单来说， Attention计算的本质是通过点积来衡量查询和键之间的相关性并进行加权汇总，以聚焦于重要语义信息。这一部分的技术主要是指以下这些部分，由于输入的不同，会分为self-attention和cross-attention：

#### 1.1 为什么需要attention
在自然语言处理、序列建模等任务中，输入往往是**变长序列**：如文本、音频或视频帧序列等。传统的 RNN（如 LSTM、GRU）等方法，在处理较长序列时，会面临 **梯度消失** 或 **梯度爆炸**，同时由于循环结构本身的限制，模型难以灵活地在不同位置之间建立直接的、可控的依赖关系。

**Attention**（注意力机制）的引入，核心动机是让模型在处理当前时间步（或当前词）时，可以**自适应地**“关注”输入序列中更重要的部分，忽略不重要的部分。它通过**显式地**计算每个位置之间的相关性（相似度），并据此加权求和来获取上下文信息，从而达到了更好的表示效果。

在机器翻译、文本摘要、阅读理解等场景中，**不同时刻**对于输入序列不同位置的信息需求是不同的。*Attention 机制能让模型动态地分配“注意力权重”*，使得在当前生成某个词时能够侧重参考输入序列的相应语义部分。相比纯 RNN/CNN，这种机制在捕捉长距离依赖方面表现更出色。

所以从整体来看，就是：

$$X = \text{WordEmbedding} + \text{PositionalEncoding}$$
$$Q = XW^Q,\quad K = XW^K,\quad V = XW^V$$
$$\text{Attention} = \underbrace{\text{softmax}\Big(\underbrace{\frac{QK^T}{\sqrt{d_k}}}_{\text{scaled dot-product}}\Big)}_{\text{注意力权重}}\cdot V$$
```python
X(第一层=embedding+位置编码, 之后=上一层输出)
  → 投影成 Q, K, V
  → QK^T 点积 → ÷√d_k 缩放 → softmax 得权重 → ×V 加权求和   [这就是 Attention]
  → Add & Norm（残差+归一化）
  → Feed Forward
  → Add & Norm
  → 作为下一层的输入
```

#### 1.2 Scaled Dot-Product Attention的计算步骤
![[Pasted image 20260822143432.png|466]]
1. 准备Q，K，V：
- **Q（Query，查询）**：你想问的问题。比如解码器当前要生成下一个词，它的隐藏向量就是 Q——"我现在需要什么信息？"
- **K（Key，键）**：参考序列里每个位置的"索引标签"。每个位置都把自己映射成一个键向量，用来被 Q 匹配。
- **V（Value，值）**：每个位置真正携带的信息内容。K 是"标签"，V 是"标签背后的内容"。

这张图讲的是 Transformer 里最核心的 **Scaled Dot-Product Attention（缩放点积注意力）**，我按它的四个步骤给你拆开讲：

 2. 计算注意力得分
拿 Q 和每个位置的 K 做点积：

$$\text{score}(Q, K_i) = \frac{Q \cdot K_i}{\sqrt{d_k}}$$
- 点积衡量的是**相似度**：Q 和某个 K 方向越接近，点积越大，说明这个位置和当前查询越相关。
- **为什么要除以 $\sqrt{d_k}$？** 因为当向量维度 $d_k$ 很大时，点积的结果会随维度增大而变得很大。大的得分经过 softmax 后会被压到接近 0 或 1 的极端区域，梯度几乎为 0，训练就停滞了。除以 $\sqrt{d_k}$ 把得分缩放到合理范围，让梯度保持健康。

3. softmax 归一化
$$\alpha_i = \text{softmax}(\text{score}(Q, K))$$
把所有位置的得分变成一组**总和为 1 的权重** $\alpha_i$。可以理解成"注意力分配比例"：哪些位置分到的注意力多，哪些少。

4. 加权求和
$$\text{Attention}(Q, K, V) = \sum_i \alpha_i \cdot V_i$$
用权重对所有的 V 加权求和。得分高的位置贡献多，得分低的贡献少。输出就是一份"按相关度提炼过的信息摘要"，也就是当前位置的上下文表示。

实际计算时不是一个个向量算，而是把所有位置堆成矩阵一次性算完：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

#### 1.3  Q，K，V从哪里来？
假设输入序列有 $n$ 个位置，每个位置的表示（embedding）是一个 $d_{\text{model}}$ 维向量，堆成矩阵 $X \in \mathbb{R}^{n \times d_{\text{model}}}$。模型里有三个**通过学习训练出来的**权重矩阵：

$$W^Q \in \mathbb{R}^{d_{\text{model}} \times d_k}, \quad W^K \in \mathbb{R}^{d_{\text{model}} \times d_k}, \quad W^V \in \mathbb{R}^{d_{\text{model}} \times d_v}$$

然后：

$$Q = X W^Q, \qquad K = X W^K, \qquad V = X W^V$$

因为同一个向量很难同时扮演好三个角色，所以我们要找三个不同的权重：

- $XW^Q$ 把每个位置投影成"**它在找什么**"的表示
- $XW^K$ 投影成"**它能被怎么找到**"的表示（像索引/标签）
- $XW^V$ 投影成"**它实际携带什么信息**"的表示

三个矩阵的初始值是随机的，训练过程中通过反向传播不断调整，最终学会把输入投影到适合各自角色的空间。如果不做投影、直接拿 $X$ 自己和自己算点积，相当于强制"查询"和"被查询"用同一套表示，表达能力会受限，而且 $W^Q, W^K$ 还提供了额外的可学习参数。

eg. 
假设 $d_{\text{model}} = 512$，$d_k = d_v = 64$（多头注意力中单个头的维度）：
- 输入 $X$：$n \times 512$（比如 10 个词，每个 512 维）
- $W^Q, W^K, W^V$：各是 $512 \times 64$
- 得到的 $Q, K, V$：各是 $10 \times 64$

然后才进入你图里那套 $QK^T / \sqrt{d_k}$ → softmax → 乘 $V$ 的流程。



#### 1.4 Self-Attention
![[Pasted image 20260822145435.png|411]]
对于self-attention，输入和输出是同一个序列！
- 场景：在一个序列的内部建模各个位置之间的依赖关系时用到。
- 例如 Transformer Encoder/Decoder 里，对同一个序列做 Q, K, V，这就是 self-attention。
- 好处：让网络可以捕捉序列内部任意两位置之间的直接交互，无需循环地逐步传播信息。

具体来说，*每个词都在问“谁和我有关？”*
![[Pasted image 20260822145548.png]]
eg. 
句子："那只动物没有过马路，因为**它**太累了。"
对"它"这个词来说，self-attention 做的事是：
1. "它"的向量作为 Q，和句中每个词的 K 算相似度：
    - "它"·"动物" → 得分 0.8
    - "它"·"马路" → 得分 0.3
    - "它"·"过" → 得分 0.05
    - ...
        
2. softmax 变成权重后，"动物"分到了最大的权重。
3. 加权求和 V 之后，"它"的新表示里**混入了大量"动物"的语义**。

于是，"它"这个位置输出的向量，不再是孤立的"它"，而是"**它（≈那只动物）**"。


#### 1.5 Cross-Attention
![[Pasted image 20260822150045.png|352]]

对于cross-attention，Q和K/V就来自于两个不同的attention序列，一个序列“提问”，另一个序列“查询”

![[Pasted image 20260822150559.png]]
但atttention的公式还是一样的， 所以对于这个红框，一个箭头上来的就是Q，剩下两个就是K和V，一个例子就是：

把"我爱学习"翻译成英文 "I love studying"：
- **Encoder** 先把整句中文加工成一串上下文表示 H （每个中文词一个向量，已经互相"看过"了）。
- **Decoder** 逐词生成英文。假设已经生成了 "I"，现在要生成下一个词：
    1. Decoder 当前的状态投影成 **Q**，含义是："我接下来要生成的词，跟原文哪些词最相关？"
    2. 拿这个 Q 去和 H 中每个中文位置的 **K** 算相似度：
        - Q·"我" → 得分最高（刚生成了 "I"，前后衔接）
        - Q·"爱" → 得分也很高（下一个该生成 "love" 了）
        - Q·"学习" → 得分较低
    3. softmax 得权重，对 H 的 **V** 加权求和 → 得到一份"聚焦在'爱'上的原文信息摘要"。
    4. 这份摘要参与后续计算，最终让 "love" 的概率最大。

### 2. Multi-head Attention (多头注意力)
- 将 Q, K, V 分为个子空间（头），并行计算注意力，然后再拼接（concat）起来再投影。
- 具体来说，就是：

![[Pasted image 20260822151545.png]]

- 好处：让模型在不同子空间上学习到**不同类型**的关注模式，提升模型表现。
- 具体点就是：有的头专门盯"主谓关系"，有的头盯"指代关系"（比如"它"指向谁），有的头只看相邻词。单个注意力头只能在一个表示空间里找一种相似性，多头相当于同时从 8 个角度审视序列。


#### 2.1 不同类型的多头注意力：MHA， MQA， GQA
![[Pasted image 20260822151737.png]]


#### 2.2 MHA Code Implementation
```python
import torch
from torch import nn
class MutiHeadAttention(torch.nn.Module):
    def __init__(self, hidden_size, num_heads):
        super(MutiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.head_dim = hidden_size // num_heads
        
        ## 初始化Q、K、V投影矩阵
        self.q_linear = nn.Linear(hidden_size, hidden_size)
        self.k_linear = nn.Linear(hidden_size, hidden_size)
        self.v_linear = nn.Linear(hidden_size, hidden_size)
        
        ## 输出线性层
        self.o_linear = nn.Linear(hidden_size, hidden_size)
        
    def forward(self, hidden_state, attention_mask=None):
        batch_size = hidden_state.size()[0]
        
        query = self.q_linear(hidden_state)
        key = self.k_linear(hidden_state)
        value = self.v_linear(hidden_state)
        
        query = self.split_head(query)
        key = self.split_head(key)
        value = self.split_head(value)
        
        ## 计算注意力分数
        attention_scores = torch.matmul(query, key.transpose(-1, -2)) / torch.sqrt(torch.tensor(self.head_dim))
        
        if attention_mask != None:
            attention_scores += (1-attention_mask) * -1e9 #masking
        
        ## 对注意力分数进行归一化, softmax
        attention_probs = torch.softmax(attention_scores, dim=-1)
        output = torch.matmul(attention_probs, value)
        
        ## 对注意力输出进行拼接
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.head_dim * self.num_heads)
        
        output = self.o_linear(output)
        
        return output

        
    def split_head(self, x):
        batch_size = x.size()[0]
        return x.view(batch_size, -1, self.num_heads, self.head_dim).transpose(1,2)
        MHA
```

这里其中的一部就包含了对paddding做mask：对于有 padding 的序列（如批量训练时把短序列补到同样长度），我们需要在注意力计算的 softmax 之前，对 padding 位对应的得分位置添加一个极大的负数（如负无穷），从而让 softmax 结果在这些位置趋近于 0，*彻底屏蔽掉无效位的影响。（也就是把对空气部分的weight归零）*


#### 2.3 MQA （Multi-Query Attention）
因为对MHA直接进行计算的话，那就会有8套不同的$W^Q, W^K, W^V$

那么在这种情况下，在生成第 t 个词时，需要拿它的 Q 去和**前面所有 t−1 个位置**的 K、V 算注意力。如果每生成一个词都把整段历史重算一遍，太浪费： 所以实际做法是**缓存**：把过去每个位置的 K、V 存起来（这就是 **KV cache**），每步只算新位置的 K、V 追加进去。

但 KV cache 的大小很惊人：
$$cache 大小=2×层数×头数×d_{head}​×序列长度$$
这里乘以2是因为K和V需要各存一次, 但假如把K和V只投影出一个head，那么在这种情况下，就会$1/h$ faster。

```Python
## 多查询注意力
import torch
from torch import nn
class MutiQueryAttention(torch.nn.Module):
    def __init__(self, hidden_size, num_heads):
        super(MutiQueryAttention, self).__init__()
        self.num_heads = num_heads
        self.head_dim = hidden_size // num_heads
        
        ## 初始化Q、K、V投影矩阵
        self.q_linear = nn.Linear(hidden_size, hidden_size)
        self.k_linear = nn.Linear(hidden_size, self.head_dim) ###在这里的self.head_dim 就表示了这里只有一个head被count into kv cache calculation
        self.v_linear = nn.Linear(hidden_size, self.head_dim) ###
        
        ## 输出线性层
        self.o_linear = nn.Linear(hidden_size, hidden_size)
        
    def forward(self, hidden_state, attention_mask=None):
        batch_size = hidden_state.size()[0]
        
        query = self.q_linear(hidden_state)
        key = self.k_linear(hidden_state)
        value = self.v_linear(hidden_state)
        
        query = self.split_head(query)
        key = self.split_head(key, 1)
        value = self.split_head(value, 1)
        
        ## 计算注意力分数
        attention_scores = torch.matmul(query, key.transpose(-1, -2)) / torch.sqrt(torch.tensor(self.head_dim))
        if attention_mask != None:
            attention_scores += (1-attention_mask) * -1e9
        
        ## 对注意力分数进行归一化
        attention_probs = torch.softmax(attention_scores, dim=-1)
        output = torch.matmul(attention_probs, value)
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.head_dim * self.num_heads)
        output = self.o_linear(output)
        return output
        
    def split_head(self, x, head_num=None):
        
        batch_size = x.size()[0]
        
        if head_num == None:
            return x.view(batch_size, -1, self.num_heads, self.head_dim).transpose(1,2)
        else:
            return x.view(batch_size, -1, head_num, self.head_dim).transpose(1,2)
```


#### 2.4 GQA （Grouped-Query Attention)
所以GQA就是一种折中的方**做法**：
- 将$h$个 Query 头分为 $G$ 组$(1 \le G \le h)$ 
- 每组使用独立的 K,；所以**分组越少**越接近 MQA，共享程度越高，速度快但表达力受限；
- **分组越多**越接近 MHA，速度较慢但表达力更强。

```Python
## 分组注意力查询
import torch
from torch import nn
class GroupQueryAttention(torch.nn.Module):
    def __init__(self, hidden_size, num_heads, group_num):
        super(MutiQueryAttention, self).__init__()
        self.num_heads = num_heads #在这里添加了具体的头数组
        self.head_dim = hidden_size // num_heads
        self.group_num = group_num
        
        ## 初始化Q、K、V投影矩阵
        self.q_linear = nn.Linear(hidden_size, hidden_size)
        self.k_linear = nn.Linear(hidden_size, self.group_num * self.head_dim)
        self.v_linear = nn.Linear(hidden_size, self.group_num * self.head_dim)
        
        ## 输出线性层
        self.o_linear = nn.Linear(hidden_size, hidden_size)
        
    def forward(self, hidden_state, attention_mask=None):
        batch_size = hidden_state.size()[0]
        
        query = self.q_linear(hidden_state)
        key = self.k_linear(hidden_state)
        value = self.v_linear(hidden_state)
        
        query = self.split_head(query)
        key = self.split_head(key, self.group_num)
        value = self.split_head(value, self.group_num)
        
        ## 计算注意力分数
        attention_scores = torch.matmul(query, key.transpose(-1, -2)) / torch.sqrt(torch.tensor(self.head_dim))
        if attention_mask != None:
            attention_scores += (1-attention_mask) * -1e9
        
        ## 对注意力分数进行归一化
        attention_probs = torch.softmax(attention_scores, dim=-1)
        output = torch.matmul(attention_probs, value)
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.head_dim * self.num_heads)
        output = self.o_linear(output)
        return output

    def split_head(self, x, group_num=None):
        batch_size,seq_len = x.size()[:2]
        if group_num == None:
            return x.view(batch_size, -1, self.num_heads, self.head_dim).transpose(1,2)
        else:
            x = x.view(batch_size, -1, group_num, self.head_dim).transpose(1,2)
            x = x[:, :, None, :, :].expand(batch_size, group_num, self.num_heads // group_num, seq_len, self.head_dim).reshape(batch_size, self.num_heads // group_num * group_num, seq_len, self.head_dim)
            return x
```

#### 2.5 Following Improvement
```python
MHA ──→ MQA/GQA ──→ MLA ──→ MLA+DSA/NSA ──→ CSA/HCA (DeepSeek-V4)
         ↓               ↓            ↓                ↓
     减少K/V份数      压缩每条     只读最相关的      多个token压成
     (头数维度)      的宽度        条目(数量维度)    一条+稀疏选择
```


### Reference
Note: https://www.kimi.com/share/1a028685-5f12-823c-8000-000078770c41

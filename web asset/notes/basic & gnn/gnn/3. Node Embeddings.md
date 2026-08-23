2026-03-15, 21:50
Tags: [[GNN]] [[Neural Network]]
>Goal: Efficient task-independent feature learning for machine learning with graphs
![[Pasted image 20260315215336.png|400]]

`Embedding is the feature representation of the graph`
an example will be:
![[Pasted image 20260321192855.png|400]]

### Set Up
- Assume we have a graph G, where 
  1. V is the vertex set
  2. A is the adjacency matrix (assume binary)
  3. For simplicity: no node feratures or extra information is used
![[Pasted image 20260321193201.png|400]]

> We need to ensure the similarity in the embedding space approximate the similarity in graph 
![[Pasted image 20260321193410.png|400]]
- Encoder: maps from nodes to embeddings
- Define a noode similarity function
- Decoder DEC maps from embeddings to the similarity score
- Optimize the parameters of the encoders so that 
$$\text{similarity}(u,v)\approx Z_v^T \cdot Z_u$$
![[Pasted image 20260321200527.png|400]]
#### Shallow Encoding
![[Pasted image 20260321200710.png|400]]

![[Pasted image 20260321200750.png|400]]
#### Example
Say you have a small graph with **4 nodes** (A, B, C, D), and you want **3-dimensional embeddings** (d=3).
**The embedding matrix Z** (3 × 4):

```
       A     B     C     D
Z = [ 0.2   0.9   0.1   0.5 ]
    [ 0.8   0.3   0.7   0.2 ]
    [ 0.5   0.6   0.4   0.9 ]
```
**To get the embedding for node B**, you create its one-hot vector```
```
v_B = [0, 1, 0, 0]ᵀ
z_B = Z · v_B = [0.9, 0.3, 0.6]ᵀ
```

#### Define Node Similarity
![[Pasted image 20260322133432.png|400]]
> This is unsupervised/self-supervised way of learning node embeddings
![[Pasted image 20260322133611.png|400]]



## Random Walk Approach for Node Embedding
### Notation Used
![[Pasted image 20260325211514.png|400]]

### Random Walk
>Given a graph and a starting point, we select a neighbor of it at random, and move to this neighbor; then we select a neighbor of this point at random, and move to it

#### Basic Logic
![[Pasted image 20260325211712.png|400]]
`Random-walk embedding`
![[Pasted image 20260325211812.png|400]]
Therefore:
![[Pasted image 20260325211954.png|400]]
The reason of using random walk:
1. It is expressive: flexible stochastic definition of node similarity that incorporates both local and higher-order neighborhood information. (Idea: if random walk starting from node $u$ and visit $v$ with high probability, $u$ and $v$ are similar)
2. It is efficiency: Do not need to consider all node pairs when training; only to consider pairs that co-occur on random walks


#### Unsupervised Feature Learning
- Intuition: Find embedding of nodes in $d-dimensional$ space that preserves similarity *(In other word, the idea is to translate the discrete structure of a graph into a cotinuous mathematical space where geometry reflects "closeness" in the network)*
- Idea: Learn node embedding such that nearby nodes are close together in the network
`Given a node u, how do we define nearby nodes?`
- $N_R(u)$ neighbourhood of $u$ obtained by some random walk strategy $R$.

![[Pasted image 20260325213732.png|400]]

#### Optimization Process
![[Pasted image 20260325213931.png|400]]
- The math
![[Pasted image 20260325214048.png|400]]

> The softmax function treat the similarity between nodes as a dot product iin vector space. An example of such case...

Imagine a tiny network with 3 nodes: **A, B, and C**. Suppose our random walk strategy says that if we start at **A**, we often visit **B**, but rarely visit **C**.
We want to learn 2D embeddings for them: $\mathbf{z}_A, \mathbf{z}_B, \mathbf{z}_C$.

The Goal:
We want $P(B | \mathbf{z}_A)$ to be high and $P(C | \mathbf{z}_A)$ to be low.

`Step 1: Initial (Random) Embeddings`
Let’s say our model starts with random vectors:
- $\mathbf{z}_A = [1, 0]$
- $\mathbf{z}_B = [0, 1]$ (Perpendicular to A)
- $\mathbf{z}_C = [1, 0.1]$ (Very similar to A)
`Step 2: Calculate Dot Products (Scores)`
- $\mathbf{z}_A^\top \mathbf{z}_B = (1)(0) + (0)(1) = \mathbf{0}$
- $\mathbf{z}_A^\top \mathbf{z}_C = (1)(1) + (0)(0.1) = \mathbf{1}$
`Step 3: Compute Softmax Probability for Node B`
$$P(B | \mathbf{z}_A) = \frac{e^0}{e^0 + e^1} = \frac{1}{1 + 2.718} \approx \mathbf{0.27}$$
`Step 4: The Optimization (The "Learning")`
The model sees that the probability for neighbor **B** is only **27%**, which is low. The optimization (using Gradient Descent) will:
1. **Nudge** $\mathbf{z}_B$ to be more like $\mathbf{z}_A$ (increasing the dot product).
2. **Push** $\mathbf{z}_C$ further away from $\mathbf{z}_A$ (decreasing the dot product).

#### Negative Samplling to Simplify the Calculation
- *Sample k negative nodes each with prob. proportional to its degree*
- Two consideration for $k$:
  1. Higher K gives more robust estimates
  2. Higher K corresponds ot higher bias on negative events
![[Pasted image 20260325215223.png|450]]
`Usually people choose between 5~20. It is a super small number if we are thinking about the size of the node numbers `

#### Stochastic Gradient Descent
> Instead of evaluating gradients over all examples, evaluate it for each individual training examples

![[Pasted image 20260325215755.png|400]]


### Node2vec
> Goal: Embed nodes with similar network neighborhoods close in the feature space

*We frame this goal as a maximum likelihood optimizaiton problem, independent to the downstream prediction taks*
Therefore, the key observation: Flexible notion of network neighborhood $N_R(u)$ of node $u$ leads to rich node embeddings. Develop biased $2^{nd}$ order random walk $R$ to generate network neighborhood $N_R(u)$ of node $u$.

The idea:
![[Pasted image 20260325220524.png|400]]

Define different type of node movement:
![[Pasted image 20260325220703.png|400]]

Demonstrate in probability:
![[Pasted image 20260325220942.png|400]]

Steps of node2vec algorithm:
1. compute ranodm walk probabililtiees
2. Siimulate $r$ random walks of length $l$ starting from each node $u$
3. Optimize the node2vec objective using gradient descent

Beauty here: it has linear-time complexity
ALl 3 stepps are individually parallelizable

## Embedding entire graph
> Goal: want to embed a subgraph or an entire graph $G$
>  Grpah embedding: $z_G$ 

![[Pasted image 20260325222855.png|400]]

#### Idea 1: Average
- Run a standard graph embedding technique on the (sub)graph $G$
- Then just sum (or average) the node embeddings in the (sub)graph G
$$ Z_G = \sum_{v\in G} Z_v$$
Basically the average of the value of all the node in the graph. This is used to classify molecules based on their graph structure

#### Idea 2: Create virtual node
- Introduce a "virtual node" to represent the (sub)graph and run a standard graph embedding technique
![[Pasted image 20260325225843.png|400]]

#### Idea 3: anonymous walk
- States in anonymous walks correspond to the index of the first time we visited the node in a random walk. 

- **Standard Walk:** Node A $\to$ Node B $\to$ Node A $\to$ Node C
- **Anonymous Version:** $1 \to 2 \to 1 \to 3$ (A is the 1st node seen, B is the 2nd, C is the 3rd).
![[Pasted image 20260325230545.png|400]]
- Agnostic the identity of the nodes visited (hence anonymous)
- Number of anonymous walks grows exponentially
- ![[Pasted image 20260325230803.png|400]]

> Determine how many anonyous walks are needed
- We want the distrubtion to have erroor of more than $\epsilon$ with prob. less than $\delta$: 
- The formula determines the minimum number of walks needed to ensure your estimated distribution is close to the "true" distribution within an error bound $\epsilon$:
$$m = \left\lceil \frac{2}{\epsilon^2} (\log(2^\eta - 2) - \log(\delta)) \right\rceil$$
- **$\eta$ (Eta):** The total number of _possible_ anonymous walk patterns of a certain length. This grows very quickly as walk length increases.
- **$\epsilon$ (Epsilon):** Your tolerance for error. Because it is squared in the denominator ($\epsilon^2$), if you want to be twice as accurate, you need **four times** as many samples.
- **$\delta$ (Delta):** Your failure probability (e.g., $\delta = 0.01$ means you want to be right 99% of the time).
- **$\log(2^\eta - 2)$:** This term represents the complexity of the "pattern space." Since there are $\eta$ possible patterns, there are $2^\eta$ possible subsets of patterns to consider.

#### Idea 4: Learn Walk Embedding
![[Pasted image 20260325231905.png|400]]

The process:
> Run T different random walks from u each of length l

![[Pasted image 20260325232017.png|400]]

![[Pasted image 20260325232342.png|400]]


### How to use Embeddings
![[Pasted image 20260325232530.png|400]]


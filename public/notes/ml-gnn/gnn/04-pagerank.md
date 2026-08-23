2026-04-13, 21:18
Tags: [[ML]] [[GNN]] [[Neural Network]]

> Represent the graph as page
### PageRank
- Web as a graph
See Node = web pages
See Edges = hyperlinks

> The key here is the Link Analysis Approaches
> - PageRank
> - Personalized PageRank
> - Random Walk with Restarts

*The idea, link as vote*
Page is more important if it has more links
![[Pasted image 20260413195636.png|400]]

**A "vote" from an important page is worth more:
- each link's vote is proportional to the importance of its source page
- if page $i$ with importance $r_i$ has $d_i$ out-links, each link get $\frac{r_i}{d_i}$ votes
- node $j$'s importance $r_j$ is the sum of the votes on its in-links

![[Pasted image 20260413200033.png|400]]

1. Using the "FLOW" model
![[Pasted image 20260413200356.png|400]]

2. Matrix formulation
 ![[Pasted image 20260413200934.png|400]]
So basically, $M_{ij}$ represent the node j is connected with i. and the importance= 1/dj. 
Furthermore, each column of M sum up to be one, because M is a stochastic matrix.

Rank vector r is importance score of page i. It sum up to be 1, but it can dynamically adjust the value.

For example:
![[Pasted image 20260413201710.png|400]]
In this case, it reveals the stationary distribution through the random walk. And here is the illustration:
![[Pasted image 20260413202413.png|400]]
and it is connected with eigenvector centrality:
![[Pasted image 20260413202617.png|400]]

>Eigenvector Formulation
- The Flow equation: 
  $1\cdot r = M \cdot r$  
which looks like $(Ax=λx)$, where $\lambda = 1$ and $x=r$.
in this case, $r$ is the eigenvector of $M$ with eigenvalue 1. 
Geometrically, the vector is not even being stretch (since is it multiplied by 1)

>Power iteration
- Solve for $r$ by assign each node an initial page rank
- repeat until convergence 
  - Calculate the page rank of each node
![[Pasted image 20260413204736.png|400]]

An example:
![[Pasted image 20260413205100.png|400]]

> Two problems
1. Some pages are dead ends (have no outlinks)
2. Spider traps (all out-links are within the group)
- Dead End
![[Pasted image 20260413205352.png|400]]
The random walker just dead at the end, it just produce 0 and leak out thegraph.

- Spider trap
![[Pasted image 20260413205410.png|400]]
The random walker is trap at one node and cannot get out


> Solution to these problem
- For deadend traps: *follow random teleport links with total probability 1.0 from dead-ends*
![[Pasted image 20260413205812.png|400]]
(The idea behind this is to make the matrix column stochastic by always teleporting when there is nowhere else to go)


- For spider traps: *at each time step, the random surfer has two options*
  1. with prob.$\beta$ follow a link at random
  2. with prob. $1-\beta$ jump to a random page
  3. common values for $\beta$ are in the range of 0.8 to 0.9
![[Pasted image 20260413205704.png|400]]

The solved result:
![[Pasted image 20260413210639.png|400]]

### Topic specific PageRank --> Personalized PageRank
In this case, it only 
1. Teleport to a specific set of nodes
2. nodes can have different probabilities of the surfer landing there
   $S = [0.1, 0, 0.2, 0.5, 0, 0, 0.1 0.1]$

### Random Walk with restarts

> Purpose: Node proximity measurement

![[Pasted image 20260413212951.png|400]]
In this case, it is obvious that A and A' are less connected compare to C and C', since C and C' both are cross connected, sharing common neighbors

> Proximity on Graphs
![[Pasted image 20260413213925.png|400]]

It is asking, what if instead of teleporting everywhere equally, you only teleport to a specific set of pages S? In the restarting senario, everytime after teleportation, the walker wake up and back to Q. In this senario, the Node Q and nodes related to Q will have higher importance, as it has higher number of income nodes


Core idea:
**Given:** A set of `QUERY_NODES` (the node(s) you care about)
**Do this repeatedly:**
```
1. Start at a QUERY_NODE
2. Walk to a random neighbor → record +1 visit to that node
3. At each step:
     - With probability (1 - ALPHA): keep walking randomly
     - With probability ALPHA:        restart back to a QUERY_NODE
4. Repeat for many many steps
```
**Result:** Count up visits to each node. Higher visit count = more related to your query.
#### What ALPHA Controls
$$\alpha = \text{restart probability}$$

| High $\alpha$                | Low $\alpha$                 |
| ---------------------------- | ---------------------------- |
| Restart often                | Rarely restart               |
| Stay close to query node     | Explore far away             |
| Measures **tight proximity** | Measures **loose proximity** |

It's a knob between "local" and "global" similarity.
#### Why Visit Count = Proximity
Think about it intuitively:
- The surfer **always restarts from Q**
- So nodes directly connected to Q get visited constantly
- Nodes far away are rarely reached before a restart happens
- Therefore **visit frequency naturally captures graph distance** from Q

---
#### Concrete Example
Say $Q = A$ in this graph:
```
A — B — C
|       |
D — E — F
```

Starting from A, the surfer explores outward. With restarts always going back to A:
- **B, D** get visited very often (1 hop from A)
- **C, E** get visited sometimes (2 hops)
- **F** gets visited rarely (3 hops)
So the ranking by proximity to A would be: $B, D > C, E > F$



### Matrix Factorization and Node Embedding
The simplest node similarity:
Node u,v are similar if they are connected!
Which means : $Z_v^{T}Z_u = A_{u,v}$. 
Where u and v are two entries of teh graph in the adjacency matrix A
Therefore, $Z^TZ = A$
![[Pasted image 20260413220118.png|400]]

**However, We can't perfectly compress a graph into small vectors, so we find the best approximate compression by minimizing the L2 norm here— and this turns out to be identical to learning node embeddings via dot product similarity.**

![[Pasted image 20260413220447.png|400]]

#### For Random Walk-based similarity
![[Pasted image 20260413220607.png|400]]

#### Annotated Formula
$$\underbrace{\log}_{\text{log of PMI}} \left( \underbrace{vol(G)}_{\text{graph scale}} \cdot \underbrace{\frac{1}{T}\sum_{r=1}^{T}(D^{-1}A)^r}_{\text{avg. multi-hop walk probs}} \cdot \underbrace{D^{-1}}_{\text{degree normalize}} \right) - \underbrace{\log b}_{\text{negative sample correction}}$$

Comparison: Simple Embeddings vs Node2Vec

|Method|Matrix Factorized|Captures|
|---|---|---|
|Simple node embedding|$A$|Direct connections only (1 hop)|
|DeepWalk|$\log\left(vol(G) \cdot \frac{1}{T}\sum_r(D^{-1}A)^r \cdot D^{-1}\right) - \log b$|Multi-hop neighborhood|
|Node2Vec|Same as DeepWalk but with biased walks (parameters $p$, $q$)|Flexible local/global structure|


> Node2Vec is not doing anything fundamentally different from matrix factorization.  
> It is factorizing a **richer matrix** that encodes averaged multi-step random walk probabilities —  
> which is why it captures both local and global graph structure better than using $A$ directly.

$$\boxed{Z^T Z \approx \log\left(vol(G) \cdot \frac{1}{T}\sum_{r=1}^{T}(D^{-1}A)^r \cdot D^{-1}\right) - \log b}$$

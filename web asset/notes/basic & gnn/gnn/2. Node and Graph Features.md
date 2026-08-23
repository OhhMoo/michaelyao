2026-03-11, 21:18
Tags: [[GNN]] [[Deep Learning]]
### Node-level Tasks and Features
Given : $G = (V,E)$
Find function : $f: v\rightarrow R$ 

> In this case, we know the few nodes that are labeled, and we are finding the nodes that are not labeled yet. 
![[Pasted image 20260311210345.png|400]]
 Correctly color the node here. 

Therefore, we need *Node-Level features*:
- Node degree
- Node centrality
- Clustering coefficient
- Graphlets
#### Node Degree
![[Pasted image 20260311210643.png|400]]
**Key Point: it treat all neighboring nodes equally

#### Node Centrality
**Node centrality** $c_v$ taks the node importance in a graph into account:
![[Pasted image 20260311210851.png|400]]

> Eigenvector centrality
- A node $v$ is important if surrounded by important neighboring nodes $u \in N(V)$
![[Pasted image 20260311211126.png|400]]

> Betweenness Centrality
- A node is important if it lies on many shortest paths between other nodes
![[Pasted image 20260311211743.png|400]]
Evaluating the importance of the transit hub of the node

> Closeness Centrality
- A node is important if it has small shortest path lengths to all other nodes
![[Pasted image 20260311212046.png|400]]


#### Clustering Coefficient
- It measures how connected $v'$s neighboring nodes are:
  ![[Pasted image 20260313145635.png|400]]
- Since $k_v$ is the degree, which represents the number of neighbors node $v$ has, $k_v$ choose 2 represents the maximum possible number of edges that could exist between v's neighbors. (represents how many distinct pairs you can form from $n$ items)
- The ratio is between *0 and 1*.

eg. the $e_v = 0.5$ cases. the edges around the nodes = 3; kv = 4. Thus 4 choose 2 = 6. 
$3 \div 6 = 0.5$
#### Graphlets
- Observation : Clustering coefficient counts the #(triangles) in the ego-network
![[Pasted image 20260313150615.png|400]]

> Definition: Graphlets rooted connected non-isomorphic subgraphs
- However, there are different graphs, and also, the position in the graph. (Different positions are not equal to each other, thus creating new graphlets) --> 72 in total
![[Pasted image 20260313150846.png|400]] 
*Orbit: An orbit is defined using a **Graph Automorphism**. An automorphism is a permutation (reordering) of the nodes that preserves the adjacency of the graph.*

- Graphlet Degree Vectors
> Graphlet Degree Vector: Graphlet-base features for nodes

*Counts the number of graphlet that are touching.* 
eg.
![[Pasted image 20260313152117.png|500]]
In the Graphlet Degree Vector (GDV) calculation, we don't just ask "Is this shape present?"; 
we ask "**Does node $v$ play the role of the black dot in this shape?**"
- Graphlet $c$ has the root (black dot) on the middle node. (because the neighboring point must be connected)
- Graphlet $d$ has the root (black dot) on an end node.
![[Pasted image 20260313152748.png|400]]

---

### Link Prediction Task and Features
> The task is: link prediction, predict new links based on existing link in the network
> 	The key is to design features for a pair of nodes.

**Two formulations of the link rediction task**
![[Pasted image 20260313160445.png|400]]

- Methodology:
  1. For each pair of nodes (x,y) compute score c(x,y)
  2. Sort pairs (x,y) by the decreasing score c(x,y)
  3. Predict top n pairs as new links
#### Link-level features
##### 1. Distance Based features
> This is finding the shortest path distance between two nodes
![[Pasted image 20260313160819.png|400]]

##### 2. Local Neighborhood Overlap
![[Pasted image 20260313161024.png|601]]
You can find either:
- Common neighbors (the union of the neighboring nodes)
- Jaccard's coefficient (common neighbors over the total degree)
- Adamic-Adar index (and log operations)
> But there is one limitation: two nodes may still potentially be connected in the future even without local overlaps

##### 3. Global Neighborhood overlap
> Katz Index: coount the number of paths of all lengths between a given pair of nodes

The representation: $P_{ab}^{(x)}$, which represents *the number of path of length x that starts at node a and ends at node b*.
![[Pasted image 20260313162658.png|400]]
Since it is u-->v; thus you need to first get to u, then get to v. So it is the multiplication of itself to get the entry multiple times with ones. 

Therefore, the Katz Index will do the job:
![[Pasted image 20260313205405.png|400]]
- Length 1 ($A$): Direct friends.
- Length 2 ($A^2$): Friends-of-friends.
- Length $l$ ($A^l$): $l$-degree of separation.

Then, we find the sum across all the path lengths, where Katz index matrix is computed in closed-form:
![[Pasted image 20260313205648.png|400]]


### Graph-Level Features and Graph Kernels
> Design kernels instead of feature vectors
- A quick intro to kernels:
  1. Kernel $K(G,G') \in R$ measres similarity between data sets
  2. Kernel matrix $K=(K(G,G'))_{G,G'}$ must always be positive semidefinite (i.e., has positive eigenvals)
  3. There exists a feature representation $\phi$ such that $K(G,G') = \phi (G)^T \phi (G')$
  4. Once the kernel is defined, off-the-shelf ML model, such as `kernel SVM`, can be used to make prediictions.

>Goal: Design graph feature vector $\phi (G)$
>Key idea: `Bag-of-Words (BoW) for a graph`

![[Pasted image 20260313211613.png|400]]
(But the bag of words cannot effectively represent the node information)

Thus, we use `Bag of node degrees`
![[Pasted image 20260313213040.png|400]]
##### Graphlet Kernels
>Couont the number of different graphlets in a graph
- The graphlet in the graphlet kernels are different from the kernel in the node level:
![[Pasted image 20260313213242.png|400]]
- The Mathematical Notation used:
	- $G$: The large graph you are analyzing.
	- $\mathcal{G}_k$: A pre-defined list of all possible graphlets (shapes) with $k$ nodes.
	- $f_G \in \mathbb{R}^{n_k}$: This means the result is a vector (a list of numbers) where each number corresponds to a count of one specific shape.
	- $(f_G)_i = \#(g_i \subseteq G)$: This simply means the $i$-th number in your vector is the number of times graphlet $g_i$ appears as a subgraph in $G$.
![[Pasted image 20260313213725.png|400]]

Therefore, for any given two graphs, $G$ and $G'$, graphlet kernel is computed as$$K(G,G')=f_G^T \times f_{G'}$$
But for this, G and G' might have different sizes, that will greatly skew the value. 
Solution: : we normalize each feature vector
$$h_G = \frac{f_G}{\text{sum}(f_G)}$$
$$K(G,G')=h_G^T \times h_{G'}$$
- Computatinal Limit
![[Pasted image 20260313214254.png|400]]

#### Weisfeiler-Lehman Kernel
> The idea here is to use neighborhood structure to iteratively enrich node vocabulary
   *Color Refinement*

![[Pasted image 20260313214454.png|400]]
In steps:
1. Color refinement (Assign the initial colors and aggregate neighborhing colors)
   ![[Pasted image 20260313214616.png|300]]
2. Apply hash function to produce the new color
   ![[Pasted image 20260313214700.png|300]]
3. Hash the aggregated Color again
   ![[Pasted image 20260313214738.png|300]]
4. Run it till you want to stop
   ![[Pasted image 20260313214836.png|300]]

After color refinement, WL kernel counts number of nodes with a given color
![[Pasted image 20260313214959.png|300]]
Then do the dot product with the labeled colors.
![[Pasted image 20260313215055.png|300]]

`It is computationally efficient, because the computational process is linear`
#### Short Summary
![[Pasted image 20260313215200.png|400]]



### Reference
https://www.youtube.com/watch?v=buzsHTa4Hgs&list=PL-myaKI4DslVPIos0HopgT8SjOn7HLJw8&index=27
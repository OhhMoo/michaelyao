2026-03-10, 16:08
Tags: [[GNN]] [[Deep Learning]]
### 1. Why Graphs
#### Types of Networks and Graphs
1. Networks (Natural Graphs)
![[Pasted image 20260311113711.png|400]]

2. Graphs (as a representation)
![[Pasted image 20260311113751.png|400]]

> Main questions: How do we take adventage of relational structure for better prediction?

- The Complexity of Graph:
  ![[Pasted image 20260311114000.png|400]]
- Representation Learning --> the removal of feature engineering step
  ![[Pasted image 20260311114220.png|400]]
- **Map nodes to d-dimensional embedding, such that similar nodes in the network are embedded close together.**
  ![[Pasted image 20260311114334.png|400]]

---
### 2. The Application of Graph Neural Network
##### Node-level Prediction 
It is processing the specific lable on the node
 eg. Alpha Fold, representing `Spatial Graph`
   ![[Pasted image 20260311115802.png|400]]

##### Edge-level prediction
Edge predict the proximity of the existing linkage
- Recommender system (Whether a edge might exist between a consumer and a product)
![[Pasted image 20260311120732.png|400]]
- Side effect prediction
![[Pasted image 20260311120809.png|400]]

##### Sub-graph level machine learning prediction
- The final location will be the node, and the traffic on the road will be the edge
![[Pasted image 20260311121010.png|400]]

##### Graph level machine learning prediction
- Find pheraputic effect of the molecules --> graph classification model
![[Pasted image 20260311121140.png|400]]
- Graph generation: generate new structure and new molecules
![[Pasted image 20260311121228.png|400]]

---
### 3. Choice of Graph Representation
in graph, we have `objects, interation, and system`
![[Pasted image 20260311121540.png|400]]

> 1. What are nodes?
> 2. What are edges?

We need to choose proper network representation of a given domain/problem to determines our ability to use networks successfully. 

#### Directed vs. Undirected Graphs
> Simply is there an arrow or not...
![[Pasted image 20260311122000.png|400]]

- *Node Degress, $k_i$ , the number of edges adjacent to node $i$
- *Average degree:*$$\bar k= <k> = \frac{1}{N}\sum^{N}_{i=1} = \frac{2E}{N}$$
- In directed networks, we define an `in-degree` and `out-degree`. The total degree of a node is the sum of `in-degree` and `out-degree`. 
![[Pasted image 20260311122549.png|489]]

#### Bipartite Graph
> Definition: the graph whose nodes can be divided into two disjoint sets U and V such that every link connects a node in U to one in V. (There is no internal connections)

![[Pasted image 20260311122729.png|400]]
- Folded/Projected Bipartite graphs:
  Where the Projection U represent the common connection to V, and vice versa
![[Pasted image 20260311122956.png|400]]

#### Adjacency 
##### Adjacency Matrix
- 1 represents the connection
- For undirected graph, the matrix is naturally symmetric

![[Pasted image 20260311123543.png|555]]
##### Adjacency list
It is easier to work with if network is 
- Large
- Sparse
It allows us ot quickly retrieve all neighbors of a given node.
![[Pasted image 20260311123953.png|400]]

#### Node, Edge Attributes, and other graph types
- Weight, ranking, type, sign...
- Chemcial, bonding types...
- Other graph types
>Self-edges and Multigraphs
![[Pasted image 20260311124331.png|400]]

#### Connectivity
>Connectivity: Any two vertices can be joined by a path
>Disconnected: a graph that is made up by two or more connected components

- Representing in adjacency matrices:
![[Pasted image 20260311124614.png|400]]

- Strongly and Weakly connected directly graph: 
> Strongly: has a path from each node to every other node and vice versa (A-B, B-A)
> Weakly: is connected if we disregard the edge directions.
![[Pasted image 20260311124848.png|400]]

In this case, A-B is strongly connected, A-D and C-G is weekly connected.
Furthermore, A-B-C shows a strongly connected component:
![[Pasted image 20260311125100.png|400]]


### Reference:
https://www.youtube.com/watch?v=P-m1Qv6-8cI&list=PL-myaKI4DslVPIos0HopgT8SjOn7HLJw8&index=24

![[lecture1pre.pdf]]
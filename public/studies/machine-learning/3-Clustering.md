2026-05-30, 12:00
Tags: [[ML]] [[Unsupervised ML]]
### 1. The context of clustering
![[Pasted image 20251030205414.png#center|360]]
- Only has input x, but with no y label as the targeting answer to train regression.

### 2. K-mean
#### 2.1 K-mean intuition
- K-mean will repeatedly do two things:
  1. Assign points to cluster centroids
  2. Move cluster centroids
![[Pasted image 20251030210425.png#center|360]]
**Step 1: Assign points to cluster centroid:
  - It will label the points that closer to the assigned points (eg. closer to red are 'red' points, closer to blue are 'blue' points)

**Step 2: Move the cluster centroids 
- Move the cluster centroids to the location with lowest average location
- Then back to step one since the relative distance to the centroids has changed

**Repeat until the location no longer changing.**

#### 2.2 K-mean algorithm
 ![[Pasted image 20251030212311.png|center|400]]
 - In step by step:
  1. Set up a set of randomly initialized $K$ cluster centroids $\mu_1,\mu_2...,\mu_k$
  2. Repeat:
     - Assign $c^{i}$ (i range from 1 to K) of cluster centroids closest to $x^{i}$
     - Find the average of points assigned to cluster K (In both x direction and y direction, or $x_n$ direction) 
     - $Distance = ||x^i-\mu_k||^2$
- Eg.1. For $\mu_1$ 
$$\mu_1=\frac{1}{4}[x^{(1)}+x^{(5)}+x^{(6)}+x^{(10)}]$$
### 2.3 Optimization of K-means
1. Notations:
![[Pasted image 20251031220540.png|450]]
eg. $x^{(10)}$  is the set of number, $c^{10}$ is the number of cluster assigned to, and $\mu_c^{10}$ is the cluster centroid $x^{10}$ has been assigned to. 

2. Cost function (Distortion Cost function):
![[Pasted image 20251031220908.png|450]]
- First move from c (the assignment of the point)
- Then move the cluster centroids

### 2.4 Initializing K-means
- **Random initialization**
![[Pasted image 20251031222317.png|400]]
- **Choosing the number of clusters**
	Elbow method
![[Pasted image 20251031222656.png|400]]
	1. But the clustering is truly ambiguous, it may decrease smoothly.
	2. Do not just minimize the cost function, since it will always leads to more cluster created.
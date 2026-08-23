### Tags: [[ML]]
## 1. Reduce the number of features
- Example 1: From 2D to a line
![[Pasted image 20251120141533.png|center|400]]
Feature 1: the length of the car
Feature 2: the height of the car
The combined axis $\rightarrow$ new create feature: *Car Size* (a line, which is 1D value)

- Example 2: From 3D to 2D![[Pasted image 20251120141909.png|center|400]]
Reduce 3D axis into a 2D plane. 

- Example 3: Multiple columns conditions
![[Pasted image 20251120142215.png|center|400]]
Compress the data into mainly two columns

## 2. PCA algorithm
- Choose an axis (principal component)
	Step 1: Find an axis
	Step 2: Find the distance (perpendicular) between the axis and the point
	Step 3: Change (Move) the axis to minimize the distance
![[Pasted image 20251120143055.png|center|350]]

- PCA Projection visualization
Before:
- The point is more squished together $\rightarrow$ less information
![[Pasted image 20251120143241.png|center|300]]
After:
- The points are spread apart, and the distance is minimized.
![[Pasted image 20251120143205.png|center|300]]

The first one is the **first principal axis**, the **second principal axis** must be perpendicular to the first axis, and the third principal axis must be perpendicular to both first and second (yes, cross product)
![[Pasted image 20251120143947.png|center|300]]

- Coordinate on the new axis
	This calculation can be carried out by dot product.
	Dot the position vector with the direction vector from the new axis.
Example:
![[Pasted image 20251120143708.png|center|400]]

- *PCA is not linear regression.* 
Linear regression is minimizing the distance between the data point and the y-axis (mean-squared error), while PCA is minimizing the perpendicular line segment distance.
	- Linear regression is used to predict y axis, whereas PCA generate a new axis![[Pasted image 20251120144307.png|center|400]]


## 3.  PCA implementation
- Use scikit-learn to apply PCA
	Preprocessing: perform features scaling
	Step 1: fit the data to obtain 2 (or 3) new axe $\rightarrow$ fit includes mean normalization
	
	Step 2: optional examine how much variance is explained by each principal component (```explained_variance_ration```)
	
	Step 3: Transform (project) the data onto the new axes

```python
X = np.array([1,1],[2,2],[4,5]) #this is a 2d vector

pca_1 = PCA(n_components=1) #component=1 -> dataset to 1 principal axis
pca_1.fit(X)
pca_1.explained_variance_ratio_ #output the percentage of variance captured by the first principal component
X_trans_1 = pca_1.transform(X) #transform the data into output
X_reduced_1 = pca.inverse_transform(X_trans_1) #compare with the existing value


```
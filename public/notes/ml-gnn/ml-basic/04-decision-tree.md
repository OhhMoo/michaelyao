### Tags: [[ML]] [[Decision Tree]]
## 1. Decision Tree Model
#### Decision 1: How to choose what feature to split on at each node? 
 - Goal: $\rightarrow$ Maximize purity 
![[Pasted image 20251027220934.png#center|436]]
#### Decision 2: When to stop splitting?
- When a node is 100% one class
- When splitting a node will result in the tree exceeding a maximum depth
- When improvements in purity score are below a threshold. (There are only 2 in the node)
- When number of examples in a nude is blow a threshold. (Further node might lead to overfitting)

## 2. Measuring purity
#### 2.1 Entropy as a measure of impurity:
- IF in the group is only all True or all False, the entropy will be $\rightarrow$ zero. 
- Other conditions are based on the fraction of $\frac{True}{Total}$, which is shown in the case of cat and dog as follow:
![[Pasted image 20251028164138.png#center|400]]
- The entropy function are thus shown as:
$$p_0 = 1 - p_1$$
$$H(p_1) = -p_1\,log_2 (p_1) - p_0\,log_2(p_0)\: == -p_1log_2(p_1)-(1-p_1)log_2(1-p_1)$$
- Example: when $p_1 = 0.5$, we find $log_2(0.5)=-1$, thus $H(p_1) = 1$
- This is shown in the following graph:
![[Pasted image 20251028165019.png#center|230]]
- PS: $0log_2(0) = 0$ is the approximation used here.

#### 2.2 Information Gain
- It is a weighted average calculation to evaluate the the entropy of two different group after the node.
- We need the entropy from the root node to compares withe the weighted average entropy from the group after the node.

For example, the root node has 5 cats and 5 dogs, the root node entropy is:
$$p_1=\frac{5}{10}=0.5 \:|\:H(0.5) = 1$$
Then we can find the reduction in the entropy from three different node:
![[Pasted image 20251028170308.png#center|400]]
- **Information Gain Definition**
$$
\text{Information Gain} = H(p_1^{root})-\Big(w^{left}H(p^{left}_{1})+w^{right}H(p_1^{right})\Big)
$$
	- Where $w^{left}$ and  $w^{right}$ are the number of sample in that group over the total sample from the previous node. 
	- (eg. total 10 cats and dogs, 7 are in left group, thus $w^{left}=\frac{7}{10}$

- Choose the feature that maximize the information gain.


#### 2.3 Decision Tree Learning
- Recursive splitting:
  1. Building smaller decision tree by recursion using decision tree.

- One-hot encoding:
  1. If the categorical values will take more than two features ($K$ values), create $K$'s binary features, and then fit them into the regression. (Get 0 or 1 values)

- Splitting on a continuous features:
  1. Try different threshold and calculate information gain. (Choose the midpoints between all different examples as possible splits)
  2. Find the threshold that maximize the information gain.
  3. Then based on the threshold to set for 0 and 1 (binary decision)
![[Pasted image 20251028221826.png#center|400]]

### 2.4 Generalization on decision tree: Regression
- From a set of features X to predict a number Y $\rightarrow$ Regression Problem
- **Reduce the variance for regression algorithm**
- Find weight and variance. $\rightarrow$ Find weight of the variance
- Find the variance of the root node and minus the variance (reduction variance)
- Find the feature give the biggest reduction variance.
![[Pasted image 20251028222838.png#center|400]]

### 2.5 Tree ensemble
- Create few trees $\rightarrow$  makes them vote (less sensitive to a single variable change in a decision tree )

- **Sampling with replacement**:
  1. Sampling with replacement:
     To construct a training set a bit similar to but a little bit different from the original training set.
  2. Bagged decision tree algorithm:
     1. Given training set of size $m$
     2. For $b=1$ to $B$: use sampling with replacement to create a new training set of size $m$
     3. Then train a decision tree on the new dataset.
     4. Get these tree to vote for the final decision.
        ![[Pasted image 20251028230438.png#center|300]]
  3. **Random forest algorithm**:
     - Prevent repeating usage of same root node and some of the node close to the root node.
     - If $n$ features are available, pick a random subset of $k<n$ features that allow the algorithm to only choose from that subset of features. 
     - Use $K = \sqrt{n}$  for the choose of $K$ if it is big (like around 10)

### 2.6 XGBoost trees
- Intuition
  1. Deliberate practice $\rightarrow$ Look at the decision tree, find the part that is not working well so far
  2.  Build the next decision tree focused on the part that is not doing really well for now.

- In Graph:
  1. Find the part that is predicted wrong on. 

![[Pasted image 20251029003030.png#center|636]]

- Using XGBoost in code
  1. For Classification
```python
from xgboost import XGBClassifier
model = XGBClassifier()
moodel.fit(X_train,y_train)
y_pred = model.predict(X_test)
```
2. For Regression
```python
from xgboost import XGBRegressor
model = XGBRegressor()
model.fit(X_train,y_train)
y_pred = model.predict(X_test)
```

### 2.6 Reason to choose decision trees
- Decision Trees:
  1. Recommended: Works well on tabular (structured) data
  2. Not recommended: Unstructured data (images, audio, text)
  3. Pros: Fast/Small decision trees are human interpretable (interpretability)

- [[5. Neural Network Structure]]:
  1. Works well on all types of data
  2. May be slower than a decision tree
  3. Works with transfer learning
  4. Easy to string together.
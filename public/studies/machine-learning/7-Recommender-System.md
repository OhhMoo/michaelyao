### Tags: [[ML]] [[Neural Network]]
# Part 1: Understand recommendation
## 1. Making recommendations
 - **Per-item features**
![[Pasted image 20251119155737.png|center|500]]
$n_u$ is number of user, $n_m$ is number of movies, $n$ is number of feature (romance/action)

As a result, the vector $x^i$ has $n$ 's  row, representing the number of the features.

Prediction is similar to linear regression:
$$ w\cdot x^i +b$$
Eg. Alice (1) rate romance = 0.99, action = 0 as the feature vector for the third movie, thus prediction of unknown will be:
$$ \begin{bmatrix} 5 \\0 \end{bmatrix} \cdot \begin{bmatrix} 0.99 \\0 \end{bmatrix}  + b =4.95 $$
Therefore, for user $j$ predicting rating for movie $i$ :
$$ \text{score} = w^j \cdot x^i + b^j$$
## 2. Cost Function
**Notation:**
![[Pasted image 20251119161231.png|center|500]]
The variable learning here is $w^{(j)}$ and $b^{(j)}$, thus the cost function looks like:
$$J(w^{(j)}, b^{(j)}) = \frac{1}{2m^{(j)}} \sum_{i:r(i,j)=1}(w^{(j)}\cdot x^{(i)}+b^{(j)}-y^{(i,j)})^2 $$
We can do this for all the user to find the cost function for all the user:
![[Pasted image 20251119161946.png|center|600]]
- Looks like the linear regression $\rightarrow$ include both loss function and normalization

This process can be vectorized, shown in the following code:
```python
def cofi_cost_function(x,w,b,Y,r, lambda_):
	pred = x @ w.T + b
	cost = (pred-Y)*R
	J = 0.5*np.sum(cost**2) +0.5*lambda_*(np.sum(w**2) + np.sum(x**2))
	return J
```


## 3. Collaborative filtering algorithm
- Express the cost function for both w, b and x.
![[Pasted image 20251119162921.png|center|450]]

- Then applied optimization like gradient descent in [[1. Linear Regression]]
![[Pasted image 20251119163151.png|center|450]]
	The gradient descent will optimize w, b and x since the cost function J comes with these 3 different variables.


## 4. Binary Labels
For binary labels:
	Predict that the probability of $y^{(i,j)} = 1$ is given by:$$ g(w^{(j)}\cdot x^{(i)}+b^{(j)}) $$ Where $g(z) = \frac{1}{1+e^{-z}}$ , from logistic regression

Apply this binary label into the cost function, we got: 
![[Pasted image 20251119164638.png|center|400]]
Thus, the total cost function for this will turn into:
$$ J(w,b,x) = \sum_{(i,j):r(i,j)=1} L\big(f(w,b,x),y^{(i,\,j)}\big)$$

# Part 2: Recommender Systems implementation
## 5. Mean normalization
- Turn dataset to an matrix and 
- Vectorize the matrix to find the average rating
- Do subtraction on matrix and average vector to find the new matrix
- Add back $\mu_i$ to prevent zero column position 
	($\mu_1$ correspond to the average value on that column)
![[Pasted image 20251119170730.png|center|400]]

## 6. Collaborative filtering in TensorFlow
- Auto Diff (Automatic differentiation)
This is the auto diff for simple linear relationship between $wx=y$ , where the initial input of $w$ equals to 3, and the final value should be 1.
```python
w = tf.Variable(3.0)
x = 1.0
y = 1.0
alpha = 0.01
iterations = 30
for iter in range(iterations):
	with tf.GradientTape() as tape:
		fwb = w*x
		cost_j = (fwb-y)**2
	[djdw] = tape.gradient(cost_j,[w])
	w.assign_add(-alpha*djdw)
```

- Collaborative filtering with optimizer
```python
optimizer = keras.optimizer.Adam(learning_rate = 1e-1)
iterations = 200
for iter in range (iterations):
	with tf.GradientTape() as tape:
		cost_value = cofiCostFuncV(X,W,b,Ynorm,R,num_users,
		num_movies,lambda)
	grads = tape.gradient(cost_value,[X,W,b])
	optimizer.apply_gradients(zip(grads,[X,W,b]))
		
```


## 7. Related items and limitations

- Find the squared distance:
$$\sum_{l=1}^{n}\Big(x_l^{(k)}-x_l^{(i)}\Big)^2 == ||x_l^{(k)}-x_l^{(i)}||^2$$
	in code, this is 
```python
	def sq_dis(a,b): #where a and b are two final matrix
		d = np.sum((a-b)**2)
		return d
	```
- Limitations:
  1. Cold start problem: new item for collective filtering will not be accurate.
  2. Need use side information about items.


# Part3: Content-based filtering
## 8. Content-based filtering features
![[Pasted image 20251119201138.png|center|500]]
This can be expressed as: $$V^{(j)}_u\cdot V^{(i)}_m$$
*Example 1. the product of dot product is still a value*![[Pasted image 20251119201839.png|center|500]]

## 9. Deep learning for content-based filtering
- Apply [[Neural Network Structure]], initial input multiple unit, but the two neural network should output same number, shown below: ![[Pasted image 20251119202129.png|cenetr|500]]
- Use sigmoid function can also narrow the output between 0 to 1, which can be used to find the probability that $y^{(i,j)}$ is 1.
- The dot product is constructed for the output of neural network, shown below:![[Pasted image 20251119202642.png|center|450]]
- Go through the "find distance" function to find something that is similar.

## 10. Recommending from a large catalogue
- Step 1: Retrieval
  ![[Pasted image 20251119205926.png|center|450]]
  The trade-off: more items results in better performance, but slower recommendations $\rightarrow$ Carry out experiments to see if retrieving additional items results in more relevant recommendations. 
- Step 2: Ranking
  1. Take the list retrieved, and rank using learned model
  2. Display ranked items to user![[Pasted image 20251119210247.png|center|300]]
## 11. TensorFlow: content-based filtering
- It blinds both filtering we saw previously and a bit of neural network
Neural network part:
```python
user_NN = tf.keras.models.Sequential(
	tf.keras.layers.Dense(256,activation="relu"),
	tf.keras.layers.Dense(128,activation="relu"),
	tf.keras.layers.Dense(32)
)

iten_NN = tf.keras.models.Sequential(
	tf.keras.layers.Dense(256,activation='relu'),
	tf.keras.layers.Dense(128,activation='relu'),
	tf.keras.layers.Dense(32)
)

```

- Content-based filtering & Find similarity (distance function)
```python
input_user = tf.keras.layers.Input(shape=(num_user_features))
vu = user_NN(input_user)
vu = tf.linalg.12_normalize(vu,axis=1)

#create the item input and point to the base network
input_item = tf.keras.layers.Input(shape=(num_item_features))
vm = item_NN(input_item)
vm = tf.linalg.12_normalize(vm,axis=1)

#measure the similarity of the two vector outputs
output = tf.keras.layers.Dot(axis=1)([vu,vm]) #Take the dot product

#specify the inputs and output of the model
model = Model([input_user, input_item], output)

#specify the cost function (not gradient descent, but MSE here)
cost_fn = tf.keras.losses.MeanSquaredError()

```
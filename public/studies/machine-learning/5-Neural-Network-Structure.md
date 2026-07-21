### Tags: [[ML]] [[Neural Network]] [[Unsupervised ML]]
### 1. Inference Process in TensorFlow
eg. Coffee Roasting (input a: Temperature / Time)
![[Pasted image 20251012200502.png|400]]

- Inference Process:
1. Set-up the layer 1
```python
x = np.array([[200.0, 17.0])
layer_1 = Dense(units=3, activation='sigmoid')
a1 = layer_1(x)

#unit represent number of neuron
#activation is the activation function used here. Sigmoid is used for logistic regression
```
2. Forward Propagation
```python
layer_2 = Dense(units=1, activation = 'sigmoid')
a2 = layer_2(a1)
```
3. Make Decision
```python
if a2 >= 0.5:
	yhat = 1
else:
	yhat = 0
```

### 2. Data in TensorFlow
1. NumPy array
```python
x = np.array([[1,2,3],
			  [4,5,6]])		  
#2D matrix
```
- This is a 2 by 3 matrix, where the leading number is the row number, and the second number is the columns number. 
- There is a *BIG* difference in these following conditions:
```python
x = np.array([[200,17]]) #this is a 1x2 matrix (1 row,2 columns)
x = np.array([200],
			 [17]) #this is a 2x1 matrix (2 rows, 1 column)
			 
x = np.array([200,17]) #this is not a matrix, but a 1D vector
```

 - Convert Data in Tensor to NumPy
 ```python
 a2.numpy()
 #output will change from tf.Tensor([[0.8]]) to array([[0.8]])
 ```

### 3. Build a neural network architecture:
- String Layers:
```python
model = Sequential([
	Dense(units=3, activation='sigmoid'),
	Dense(units=1, activation = 'sigmoid')
	])
```
- Or
```python
layer_1 = Dense(units=3, activation='sigmoid')
layer_2 = Dense(units=1, activation = 'sigmoid')
model = Sequential([layer_1, layer_2])
```

- **Put them together**:
```python
x = np.array([[200,17],
			  [120,5],
			  [425,20],
			  [212,18]]]) #The training set
y = np.array([1,0,0,1])
model.compile(...)
model.fit(X,y)
model.predict(x_new) #input the new x to find the prediction result
```

### 4. Apply TensorFlow: Diabetes Predictions
- [[2. Logistic Regression]] is used there as the activation function.
- New Data Comparison method is introduced here: 


![[Neural_Network_tf.ipynb]]


### 5. Forward prop in NumPy (Math) in Single Layer
1. Single layer calculation:
![[Pasted image 20251013130948.png|400]]
- For each single unit of neuron:
```python
w1_1 = np.array([1,2])
b1_1 = np.array([-1])
z1_1 = np.dot(w1_1,x)+b1_1
a1_1 = sigmoid(z1_1)
#a1_1, first layer, first unit
#a1_2, first layer, second unit
```
- Therefore, for all unit in this layer:
![[Pasted image 20251013131431.png|500]]
- Put them together to get the a output in this layer:
```python
a1 = np.array([a1_1, a1_2, a1_3])
```

2. Pass the value to the next layer:
- Carry to the next layer:
$$a^{[2]}_1 = g(\vec{w_1}^{[2]}\cdot{\vec{a}^{[1]}+b^{[2]}_1}$$
- In Code:
```python
w2_1 = np.array([-7,8,9])
b2_1 = np.array([3])
z2_1 = np.dot(w2_1,a1) + b2_1
a2 = sigmoid(z2_1)
```

### 6. General implementation
##### Process
- Dense function
```python
def dense(a_in, W,b):
	units = W.shape[1] #get number of columns
	a_out = np.zeros(units) #get an array of zero
	for j in range(units):
		w = W[:,j] #all rows, j's column
		z = np.dot(w,a_in) + b[j]
		a_out[j] = g(z) #apply sigmoid or ther activation function
	return a_out
```
- Sequential function
```python
def sequential(x):
	a1 = dense(x,W1,b1)
	a2 = dense(a1,W2,b2)
	a3 = dense(a2,W3,b3)
	a4 = dense(a3,W4,b4)
	f_x = a4
	return f_x
```
- 3. Run the sequential function:
```python
# the sequential function is inputing a vector each time:
m = X.shape[0] #get number of rows
for i in range (m):
	p[i,0] = sequential(X[i],W1,b1,W2,b2)
return p
```
##### Note:
1. For w = W[: , j] syntax:
- It is selecting all rows value from that specific column
```python
W = [[1, 2, 3], 
	 [4, 5, 6], 
	 [7, 8, 9]]
w_column1 = W[:,1] #[1,4,7]
w_column2 = W[:,2] #[2,5,8]
w_column3 = W[:,3] #[3,6,9]
```
2. Convention
- Character convention
```md
capital W (or other characters) refers to matrix
lower w refers to vector
```
- Matrix convention
![[Pasted image 20251013134947.png#left|450]]

## 7. Vectorization
#### 1. Vectorized dense function
- Set up the matrix
```python
X = np.array([200,17]) #2D array
W = np.array([[1,-3,5],
			  [-2,4,6]]) 
B = np.array([[-1,1,2]]) # 1x3 2D array
```
- Dense function
```python
def dense(A_in,W,B):
	Z = np.matmul(A_in,W) + B
	A_out = g(Z)
	return A_out
#matmul stand for matrix multiplication
```

#### 2. Matrix multiplication
- Transpose of Matrix
![[Pasted image 20251013145418.png|150]]
Transpose is used to fit the matrix multiplication
- Calculate Z value
![[Pasted image 20251013150230.png]]
- Code
```python
A = np.array([[1,-1,0.1],
			 [2,-2,0.2]])
AT = A.T #numpy function doing transpose
```
 In this case, AT should look like:
```python
AT = np.array([[1,2],
			   [-1,-2],
			   [0.1,0.2]])
```
Then do the matrix multiplication:
```python
Z = np.matmal(At,W)
#or
Z = AT @ W
```

![[Pasted image 20251013151049.png#center|400]]

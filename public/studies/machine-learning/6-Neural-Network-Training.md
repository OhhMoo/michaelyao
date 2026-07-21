### Tags: [[ML]] [[Neural Network]] [[Unsupervised ML]]
### 1. Implementation
- Step1 : Specify the model for TensorFlow to run with
- Step2: Compiles the model with a specific loss function
- Step3: Train the model.
![[Pasted image 20251014201448.png|400]]

### 2. Training Process in Detail
**1. Create the Model**
- Tell TensorFlow what is the unit and the activation function for the model.
- Illustrated in [[5. Neural Network Structure]]

**2. Loss and cost functions
- Determine the type of the loss function.
- Cost function stays the same as shown below.
$$J(W,B)=\frac{1}{m}\sum_{i=1}^{m}L(f(\vec{x}^{(i)},y))$$
  1. Binary classification (0/1)
  ```python
from tensorflow.keras.losses import BinaryCrossentropy

model.compile(loss=BinaryCrossentropy())
  ```
  2. Regression Problem $\rightarrow$ Minimize the Mean Squared Error
  ```python
from tensorflow.keras.losses import MeanSquaredError
model.compile(loss=MeanSquaredError())
  ```

**3. Training process $\rightarrow$ Gradient descent $\rightarrow$ Update model to minimize the loss
![[Pasted image 20251014202957.png|350]]

```python
model.fit(X,y,epochs=100)
#epochs stands for number of times the model will pass through the entire training dataset during the training process
```

### 3. Activation Function
- Basic Three activation function
![[Pasted image 20251014210531.png|400]]
- Output layer:  Choose the activation function based on Y's output.
![[Pasted image 20251014211304.png|350]]
- Hidden layer: ReLU is the most common choice.
![[Pasted image 20251014211530.png|400]]

```python
model = Sequential([
	Dense((units=3, activation='relu'), #take relu 
	Dense(units=1, activation = 'sigmoid')])
```

- Reason for using different activation function
  1. If all the neuron are using linear activation, the result will have no difference compare to just doing linear regression.
  2. This is shown below. If we use linear activation only,  the result can be simplified as linear regression. Similar thing happens to logistic regression.
![[Pasted image 20251016191951.png|400]]


### 4. Neural Network with Softmax output
- Adding a hidden layer of Softmax activation function:
![[Pasted image 20251016200709.png|400]]

- Apply in TensorFlow (Not the best way)
```python
#This might have numerical round-off problem
model = Sequential([
	Dense(units=25, activation='relu'),
	Dense(units=10, activation='softmax')
	])
from tensorflow.keras.losses import SparseCategoricalCrossentropy
model.compile(loss=SparseCategoricalCrossentropy())
model.fit(X,Y,epochs=100)
```

### 5. Prevent Numerical Roundoff Errors
- Basic idea:
Write out the sigmoid and softmax function using a linear relationship, and then add another statement to adjust it to that activation function:
![[Pasted image 20251016201704.png|400]]

```python 
model = Sequential([
	Dense(unit=25, activation='relu'),
	Dense(unit=1, activation='linear') #instead of sigmoid
model.compile(loss=BinaryEntropy(from_logits=True))
])
```
- here is an extra prediction step to convert it back from linear to sigmoid function
```python
model.fix(X,Y,epochs=100)
logit = model(X)
f_x = tf.nn.sigmoid(logit)
```

- Applied in Softmax:
```python
model = Sequential([
	Dense(units=25, activation='relu'),
	Dense(units=10, activation='linear')
	])
model.compile(loss=SparseCategoricalCrossentropy(from_logits=True))
model.fit(X,Y,epochs=100)
```


### 6. Additional Layer Types
1. Dense layer
   - Each neuron output is a function of all the activation outputs of the previous layer.
   - As shown below, $\vec{a}^{[1]}$ represent all the output in previous layer.
$$\vec{a}_1^{[2]}=g(\vec{w}_1^{[2]}\cdot\vec{a}^{[1]}+\vec{b}_1^{[2]}) $$
![[Pasted image 20251016214417.png#center|200]]

2. Convolutional layer
   - Each neuron only looks at part of the previous layer's output. (Only look at a limited window of the data or activation neurons)
   - Faster computation
   - More architectural options
   - Need less training data (less prone to overfitting)
   - Example: EKG to read heart diseases:
![[Pasted image 20251016214750.png#center|500]]

Little Project:
Hand-written letters recognition
![[EMNST_Classification.ipynb]]

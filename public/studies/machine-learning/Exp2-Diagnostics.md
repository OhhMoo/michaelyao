### Tags: [[ML]] [[Data Processing]]
## 1. Evaluation of the model
### 1. Evaluate Linear regression
- **Split the dataset
![[Pasted image 20251018160926.png#center|400]]
```python
from sklearn.model_selection import train_test_split
x_train,x_,y_train,y_=train_test_split(x_,y_,test_size=0.40,random_state=1) 
#40% in temporary x_,y_;60% in training
x_cv,x_test,y_cv,y_test=train_test_split(x_,y_,test_size=0.50,random_state=1)
#split the 40% lefted into two subset (50% each)
del x_,y_
```

- **Model selection
   - Split the data into training set/cross validation set/test set. 
![[Pasted image 20251018185959.png#center|350]]
   - Use training set to train the model.
   - Cross-validation set is used to choose the model.
   - Test set is used to measure the performance of the model.
![[Pasted image 20251018191133.png#center|300]]

- **Evaluation Process
1. Standard Scalar
$$
z = \frac{x-\mu}{\sigma}
$$
```python
from sklearn.preprocessing import StandardScaler, PolynomialFeatures

X_train_scaled = scaler_linear.fit_transform(x_train)
```

2. Calculate Mean Square Error
```python
yhat = linear_model.predict(X_train_scaled)
mse_train = mean_squared_error(y_train, yhat)/2
```

3. Test group with cross verification (cv) group
```python
X_cv_scaled = scaler_linear.transform(x_cv)
yhat_cv = linear_model.predict(X_cv_scaled)
mse_cv = mean_squared_error(y_cv,yhat_cv)/2
```

4. Find the model that minimized the mean squared error of the cv group
   - For linear model, this might looks something like this:
```python
train_mses = []
cv_mses = []
models = []
polys = []
scalers = []

for degree in range(1,11):
    poly = PolynomialFeatures(degree, include_bias=False)
    X_train_mapped = poly.fit_transform(x_train)
    polys.append(poly)
    
    # Scale the training set
    scaler_poly = StandardScaler()
    X_train_mapped_scaled = scaler_poly.fit_transform(X_train_mapped)
    scalers.append(scaler_poly)
    
    # Create and train the model
    model = LinearRegression()
    model.fit(X_train_mapped_scaled, y_train )
    models.append(model)
    
    # Compute the training MSE
    yhat = model.predict(X_train_mapped_scaled)
    train_mse = mean_squared_error(y_train, yhat) / 2
    train_mses.append(train_mse)
    
    # Add polynomial features and scale the cross validation set
    X_cv_mapped = poly.transform(x_cv)
    X_cv_mapped_scaled = scaler_poly.transform(X_cv_mapped)
    
    # Compute the cross validation MSE
    yhat = model.predict(X_cv_mapped_scaled)
    cv_mse = mean_squared_error(y_cv, yhat) / 2
    cv_mses.append(cv_mse)
```

- We can further plot this out:
```python
import matplotlib.pyplot as plt
degrees = range(1, 11) 
plt.plot(degrees, train_mses, 
		 color='blue', alpha=0.7, lw=2, linestyle='-', 
		 marker='o', label='Training MSE') 

plt.plot(degrees, cv_mses, 
		 color='red', alpha=0.7, lw=2, linestyle='-', 
		 marker='s', label='CV MSE') 

plt.xlabel('Degree') 
plt.ylabel('Mean Squared Error') 
plt.legend() 
plt.show()
```

![[Pasted image 20251018234055.png#center|400]]
- The best fitting model will be:
```python
degree = np.argmin(cv_mses)+1
```

### 2. Evaluate [[6. Neural Network Training]]

#### 2.1 Neural Network on Regression type problem:
   1. Find MSE for both train and cv, basically same as shown above.
   2. Find the model with lowest train and cv mean squared error.
#### 2.2 Neural Network on [[8. Classification]] type problem:
  (1) Find classification error:
  ```python
  from sklearn.metrics import accuracy_score
  train_prediction = model.predict(X_train)
  #classification error = 1-accuracy
  train_accuracy = accuracy_score(y_train, train_predictions)
  train_error = 1 - train_accuracy

  ```
  (2) Find cross-validation classification error
```python
from sklearn.model_selection import cross_val_score 
from sklearn.metrics import make_scorer
cv_scores = cross_val_score(model,X_train,y_train,cv=5,scoring='accuracy')
cv_errors = 1 - cv_scores
mean_cv_error = cv_errors.mean()
```
PS:
```md
cv=5 here means split the data into 5 equal parts (folds)
and then train and evaluate the data for 5 times:
- Iteration 1: Train on folds 2-5, evaluate on fold 1
- Iteration 2: Train on folds 1,3-5, evaluate on fold 2
- Iteration 3: Train on folds 1-2,4-5, evaluate on fold 3
- Iteration 4: Train on folds 1-3,5, evaluate on fold 4
- Iteration 5: Train on folds 1-4, evaluate on fold 5
```

![[Pasted image 20251019001337.png]]

## 2. Bias/variance

 - $J_{train}$ is high, $J_{cv}$ is high. This indicated HIGH BIAS (underfit)
 - $J_{train}$ is low, $J_{cv}$ is high. This indicated High Variance (overfit)
 - We are trying to find low values on both $J_{train}$ and $J_{cv}$
 ![[Pasted image 20251022160406.png|400]]
 - For the trend, if the degree of polynomial is low, the J-cv will be high. However, if the degree of polynomial is high, the J-cv will increase again, which can be represented as:
 ![[Pasted image 20251022160720.png|400]]

#### 2.1 Regularization and bias/variance

- The regulation formulae in [[2. Logistic Regression]] will exert an extra pressure on the $w$ values. Thus, we go the lines shown as below:
![[Pasted image 20251022161627.png|400]]
- If $\lambda$ equals to zero, the function will be a high order linear regression, thus the $J_{train}$ value will be minimized. Meanwhile, the $J_{cv}$ will be high.
- If $\lambda$ is high, the function will turn to a straight-line, the bias will be high. Meanwhile, the $J_{cv}$ will be high.
- Find the proper $\lambda$ as shown on the diagram.

#### 2.2 Establishing a baseline level of performance
![[Pasted image 20251022162718.png|400]]
- Compare training error and cv error with the baseline performance.
- High variance is overfitting; high bias is underfitting

#### 2.3 Learning Curve
1. For High Bias
	- $J_{cv}$ and $J_{train}$ tend to be flatten out in High bias condition. Adding training data will not reduce the error level.
	![[Pasted image 20251022163754.png|400]]

2. For High variance
   - With small $\lambda$ , adding data into extrapolation will help on reducing the error
	![[Pasted image 20251022164035.png|400]]

#### 2.4 Potential solution to Bias/Variance
1. Conditions related to learning algorithms:
![[Pasted image 20251022231212.png|400]]

2. *The bias and variance in neural network*
- The Flow chart to treat neural network conditions:
![[Pasted image 20251022232717.png|400]]

- Neural networks with overfitting $\rightarrow$ regularization
Just add "kernel_regularizer" in the code as shown:
```python
model = Sequential([
	Dense(units=25, activation='relu', kernel_regularizer=L2(0.001)),
	Dense(units=10, activation='linear', kernel_regularizer=L2(0.01))
	])
model.compile(loss=SparseCategoricalCrossentropy(from_logits=True))
model.fit(X,Y,epochs=100)
``` 


## 3. ML Development Process

![[Pasted image 20251023133810.png|400]]
#### 3.1 Adding data
1. Data augmentation: modifying an existing training example to create a new training example.
	   - eg1: add original audio clip with noisy background or audio on bad cellphone connection
	   - eg2: introduce distortions
	![[Pasted image 20251023134900.png|400]]
2. Data synthesis
   - Use the existing system to find proper data to fit into the dataset.
     -eg. Use the words font library to generate different font photo for OCR practices

#### 3.2 Transfer learning
- Use the existing model as the starting points, and redesign the last layer to fit the task. 
- Steps:
  1. Supervised pre-training
  2. Fine tuning
![[Pasted image 20251023141228.png|400]]

- Why does transfer learning work
  1. Use the same type of the input
  2. The first few layer of the neural network might identifying the same features
  3. Fine tune the network on your own data.

![[Pasted image 20251023141502.png|400]]
Because the first few layer are doing the same thing like identifying the edges and corners and the curves or the basic shapes.

## 4. Error metrics for skewed datasets
### 4.1 Confusion matrix
![[Pasted image 20251023152439.png|250]]
	 1. Precision: $$\frac{\text{True\;positives}}{\text{Trus\;pos+False\;pos}}$$
	 2. Recall: $$\frac{\text{True positives}}{\text{True pos + False neg}}$$
	 3. Specifically, precision is the percentage of correct prediction over total correct numbers.
	 4. Similarly, recall is the percentage of the correct prediction.
![[Pasted image 20251023153123.png|400]]

### 4.2 Trade off between precision and recall
- The trade off between precision and recall:

![[Pasted image 20251023154104.png]]

- *Use F1 Score* 
$$ F_1\;score = \frac{1}{\frac{1}{2}\cdot(\frac{1}{P}+\frac{1}{R})} $$
	or it can be expressed as:
$$ F_1\:score = 2\frac{PR}{P+R} $$

This is a harmonic mean function.


Tags: [[ML]] [[Supervised ML]]
##### - Logistic Regression: Mathematical Modeling:
- Find Cost function
- Calculate gradient descent
- Minimize cost function by multiple gradient descent
- Plug in Sigmoid function
- Regularization $\rightarrow$ prevent overfitting or underfitting
![[Pasted image 20251022230837.png]]
	
	Apply this into action, we find:

![[Logistic Regression_math.ipynb]]

##### - Scikit Learn
1. Split the training and testing data
```python
from sklearn.model_selection import train_test_split 
X_train, X_test, y_train, y_test = train_test_split( 
	x, y, 
	test_size=0.2
	random_state=42
)

#20% testing, 80% training
```

2. Fit the data with scikit
```python
lr_model = LogisticRegression()
lr_model.fit(X_train,y_train)
y_pred = lr_model.predict(X_test)
print('Prediction:', y_pred)
```

3. Test the accuracy of the data (Basic Data)
```python
correct = (y_pred.flatten() == y_test).sum() total = len(y_test) print(f"Correct predictions: {correct}/{total}")
```

4. To represent data, use heat map in [[5 - Knowledge Base/Plotting]] and [[3D Plot]]

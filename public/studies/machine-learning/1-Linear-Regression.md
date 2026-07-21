Tags: [[ML]] [[Supervised ML]]
##### - Linear Regression: Mathematical Modeling:
- Find Cost function
- Do gradient descent
- Minimize cost function by multiple gradient descent
![[Linear Regression_math.ipynb]]
##### -Linear Regression with Scikit:
1. From Sci-Kit learn import linear regression model
```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import tran_test_split
```
2. Split the dataset into training set and testing set
```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#test_size=0.2 represent 20% for testing, 80% for training
#random_state=42 sets a random seed for reproducibility
```
3. Fit the model
```python
model = LinearRegression()
model.fit(X_train, y_train)
```
4. Based on the x_test set, make prediction on y
```python
y_pred = model.predict(X_test)
```
5. Comparing the result:
```python
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

r2 = r2_score(y_test, y_pred) 
mse = mean_squared_error(y_test, y_pred) 
rmse = np.sqrt(mse) 
mae = mean_absolute_error(y_test, y_pred)
#Use these value to evaluate the accuracy
```
6. Plot the result using [[Scatter Plot]] and [[5 - Knowledge Base/Plotting]] :
```python
plt.scatter(y_test, y_pred, alpha = 0.5)
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title('Actual vs Predicted Values')
plt.show
```

7. The perfect prediction line will be x=y, which can be plotted as:
```python
plt.plot([y_test.min(), y_test.max()], 
		[y_test.min(), y_test.max()], 
		'r--', lw=2
		)
```

8. The regression line can be plot out through [[5 - Knowledge Base/Plotting]]: Polynomial
```python
m, b = np.polyfit(y_test, y_pred, 1)
plt.plot(y_test,m*y_test+b,label='line of the best fit')
```

![[Linear Regression_Housing Price Prediction.ipynb]]


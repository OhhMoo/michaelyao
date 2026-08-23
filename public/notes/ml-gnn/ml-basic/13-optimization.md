### Tags: [[ML]] [[Unsupervised ML]] [[Supervised ML]]
## 1. Gradient Descent
Used in [[1. Linear Regression]] and [[2. Logistic Regression]] as  a method to constantly update $\vec{w}$ and $\vec{b}$ . 
$$\vec{w} = \vec{w}-\alpha \frac{\partial}{\partial{{w}}} J(w,b)$$

$$\vec{b} = \vec{b}-\alpha \frac{\partial}{\partial{{b}}} J(w,b)$$
![[Pasted image 20251016212631.png#center|400]]

## 2. Adam Algorithm
- Adam: Adaptive Moment Estimation
  - If $w_j$ or $b$ keeps moving in same direction, increase $a_j$
  - If $w_j$ or $b$ keeps oscillating, reduce $a_j$ (Works much faster than gradient descent)
![[Pasted image 20251016212010.png#center|400]]
- In TensorFlow for [[6. Neural Network Training]]:
```python
model = Sequential([
	tf.keras.layers.Dense(units=25, activation='relu'),
	tf.keras.layers.Dense(units=15, activation='sigmoid'),
	tf.keras.layers.Dense(units=10, activation='linear')
	])

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3), loss=tf,keras.losses.SparseCatagoricalCrossentropy(from_logits=True))

model.fit(X,Y,epochs=100)
```



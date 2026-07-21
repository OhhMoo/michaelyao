### Tags: [[ML]] [[Unsupervised ML]] [[Neural Network]]
## 1. Multiclass Classification
- Definition: multiple group of y values
![[Pasted image 20251016192907.png#center|400]]
### - Softmax Regression
- Logistic regression take in 2 possible value
  if the possibility of output 0 is 0.71, then the possibility to output 1 is 0.29. (They add up to 1 in total)
- Similarly, for Softmax regression:
![[Pasted image 20251016193503.png#center|400]]
- Thus, for general case of Softmax based on $a_1+a_2+...+a_n=1$:
$$
z_j = \vec{W_j}\cdot\vec{x}+b_j \;\;\; where\ j=1,2,...,N
$$$$a_j=\frac{e^{Z_j}}{\sum^{N}_{k=1}e^{z_k}}=P(y=j|\vec{x})$$
- Cost function (Cross-entropy loss):
![[Pasted image 20251016194934.png#center|450]]
- The loss curve represent as $a_j$ approaching 1, $-log(1)=0$, loss is minimized. 
- Otherwise, when $-log(0)$, the cost is approaching infinity.
- All $a_j$ value ranging from 0 to 1, and the loss function only take one $a_j$ value into calculation, serve as  the output layer of [[6. Neural Network Training]].

- The softmax function is intaking a set of vector and outputting a set of value between 0 to 1, which can be achieved in the code as:
```python
def softmax(z):
	N = len(z)
	a = np.zeros(N)
	ez_sum = 0
	for k in range (N):
		ez_sum = ez_sum + np.exp(z[k])
	for j in range (N):
		a[j] = np.exp(z[j])/ez_sum
	return a
```


## 2. Multi-label Classification
![[Pasted image 20251016205252.png]]
- Key points:
  1. It output multiple true classes simultaneously
  2. Activation: It used sigmoid on EACH output
  3. Loss: Binary cross-entropy for Each label
  ![[Pasted image 20251016205618.png#center|400]]

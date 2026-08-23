2026-05-30, 12:00
Tags: [[ML]] [[Unsupervised ML]] [[Data Processing]]
## 1. Finding unusual events
1. Build a model for the probability of x
2. Compare the value with $\epsilon$ 
3. Determine whether it is an anomaly

This process is called *Density estimation*:
![[Pasted image 20251108184742.png|center|400]]
- Anomaly detection example:
![[Pasted image 20251108185008.png|center|400]]


## 2. Gaussian (normal) distribution
- Formula:
$$p(x) = \frac{1}{\sqrt{2\pi}\sigma}e^{\frac{-(x-\mu)^2}{2\sigma^2}}$$
- $\mu$ represent the mean of the distribution
- $\sigma$ represent the standard deviation, and $\sigma^2$ represent the  variance.
- The probability under the curve sum up to be 1
- Examples:
![[Pasted image 20251108185841.png|center|400]]
- Maximum likelihood formulas:
![[Pasted image 20251108190057.png|center|400]]

## 3. Anomaly detection algorithm
- We are finding the product of the probability of different features
- Thus, we have the function:
![[Pasted image 20251108190650.png|center|400]]
- Step by step:
  1. Choose n features $x_i$ that you think might be indicative of anomalous examples
  2. Fit parameters $\mu_1,....,\mu_n$ and $\sigma_1^2,..., \sigma_n^2$ 
  3. Find the probability $\rightarrow$ NORMPDF (yes, the one in IB)
     ![[Pasted image 20251108191241.png|300]]
  4. Evaluate $p(x)<\epsilon$

- Mathematical Example
![[Pasted image 20251108191546.png|center|400]]

## 4. Developing anomaly detection system
- Real-number evaluation:
  1. Set up y=1 for anomalous and y=0 for non-anomalous examples
  2. Then use labeled examples
  3. Split the dataset with train/cv/test. Train algorithm on training set, but leave all the anomalies on CV set and test set.
     - OR just leave no test set
     ![[Pasted image 20251108192452.png|300]]
     - Because we don't have enough data for anomalies.
4. Evaluation process:![[Pasted image 20251108192719.png|center|400]]
   where we can still apply the [[Exp2. Diagnostics]] strategies mentioned like F1 or true/false positive table. This can be achieved in code as follow:
```python
def select_threshold(y_val, p_val): 
    best_epsilon = 0
    best_F1 = 0
    F1 = 0
    
    step_size = (max(p_val) - min(p_val)) / 1000
    
    for epsilon in np.arange(min(p_val), max(p_val), step_size):
    
        prediction = p_val < epsilon #this is anomaly
        tp = sum((prediction == 1) & (y_val == 1))
        fn = sum ((prediction == 0) & (y_val == 1))
        fp = sum ((prediction == 1) & (y_val == 0))
        prec = tp/(tp+fp)
        rec = tp/(tp+fn)
        F1 = (2*prec*rec)/(prec+rec)
    
        
        if F1 > best_F1:
            best_F1 = F1
            best_epsilon = epsilon
        
    return best_epsilon, best_F1

```

## 5. Anomaly detection condition, feature selection
Characteristic of anomaly detection
1. Very small number off positive example (y=1), and very large number of negative examples (y=0)
2. Many different types of anomalies, where future anomalies may look nothing like any of the anomalous examples we've seen so far.

Choosing what features to use:
1. Transform a non-gaussian features into a more gaussian feature
![[Pasted image 20251108194710.png|center|400]]

2. Applied through code:
```python
plt.hist(x**0.4, bins=50) #exponent form of transformation
plt.hist(log(x+10), bins = 50) #log(x+c) form of transformation
```
	The transformation need to be carried on the CV set and test set

3. Add more features will make the anomaly detection become easier
![[Pasted image 20251108195252.png|center|400]]

4. We can create new features through the combinations of existing features
![[Pasted image 20251108195414.png|center|400]]
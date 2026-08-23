2026-07-30, 14:28
Tags: [[RL]] [[David Silver]] [[ML]]

### Introduction
- There are a lots of state.... So we cannot just build a table --> not practical 

So we evaluate the idea of RL from both:
**Prediction** asks: "How good is this strategy?"  
**Control** asks: "What is the best strategy?"

#### Value Function Approximation
![[Pasted image 20260730143724.png]]

To visualize it, the parameter (w) here is taking the stage (s, and/or a), and we spit out the expected return (value $v$) or (value-action $q$) 
![[Pasted image 20260730144207.png]]

#### Function Approximator
A machine that kind of "learn", or "mimic" an unknown or complex function by mapping inputs to outputs, without needing to know the exact mathematical formula behind it.

In RL case, we usually consider `differentiable` function approximator:
![[Pasted image 20260730144901.png]]
(Inherent linear on linear combinations of features; No inherent linearity on neural network)

### Incremental Methods
#### Gradient Descent
![[Pasted image 20260730145431.png]]

We can use to (instead of minizing the direct error) is to minimize the mean squared error:
![[Pasted image 20260730145732.png]]

#### Feature Vector
So we are using a collection of features to represent the state:
![[Pasted image 20260730150243.png]]

Following this idea, we can develop linear vlaue function approximation, with the feature vector we created:
![[Pasted image 20260730150848.png]]
So this is updating our value function approximation to get closer to our true value function. However, in most cases, we cannot directly find $v_{\pi}(S)$, we dont know the value function. Therefore, we go with --> setting up *Target*:
![[Pasted image 20260730152237.png]]

- In more detail, Monte Carlo can be seen with:
![[Pasted image 20260730152603.png]]
In other sense, we can kind of see this as supervised ML, where we are just basically generating the data for learning.

- In this similar sense, this idea can be applied to TD learning, where :
![[Pasted image 20260730213025.png]]
`Interestingly, this linear methhod still converges close to the global optimum`

So combining these two idea, we can also create the TD($\lambda$) Learning-->
![[Pasted image 20260730213856.png]]
Forward view and backward view linear TD($\lambda$) are equivalent

#### Control
![[Pasted image 20260730214941.png]]

- But in this case, we are minimizing mean-square error with action-value:
![[Pasted image 20260730215517.png]]

and similarily, we are defining the state $and$ action with a feature vector:
![[Pasted image 20260730215742.png]]

so in exact, what we are seeing is:
![[Pasted image 20260730215924.png]]
where we substitute MC, TD(0), and TD($\lambda$) and see how everything works together.
![[Pasted image 20260730221236.png]]

##### Also, bootstraping usually help in some sense:
![[Pasted image 20260730221355.png]]
in basically all the cases here, when $\lambda$ goes to 1, MC seems not performing well. On the other hand, when $\lambda =0$, it is not as good as the sweet spot in the middle.

> However, it is possible that TD can blow up everything here....
![[Pasted image 20260730221803.png|340]]

So we have *gradient TD* that semi-solve this problem
![[Pasted image 20260730221902.png]]

We also have evaluation on control method:
![[Pasted image 20260730221919.png]]

### Batch Method
#### Problem with gradient descent 
![[Pasted image 20260730222320.png]]


#### Deep Q-Network
![[Pasted image 20260730230857.png]]

Stochastic Gradient Descent with Experience Replay
![[Pasted image 20260731001205.png]]

and then we apply this to Deep Q-Network
![[Pasted image 20260731001310.png]]


#### Linear Least Squares Prediction
- Experience replay finds least squares solution
- But it may take many iterations
- Using linear value function approximation $v(s,w)=x(s)^T w$
- We can solve the least squares solution directly (from linear algebra)

![[Pasted image 20260731002016.png]]

and we plug these into MC, TD, and TD($\lambda$)
![[Pasted image 20260731002058.png]]

#### Apply to evaluation/prediction/control
![[Pasted image 20260731002157.png]]

and ![[Pasted image 20260731002205.png]]

we have
`least squares Q-learning`
![[Pasted image 20260731002232.png]]


### Reference
https://www.youtube.com/watch?v=UoPei5o4fps&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ&index=6
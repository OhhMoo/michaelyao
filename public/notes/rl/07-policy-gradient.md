2026-08-04, 15:23
Tags: [[RL]] [[ML]]

## 1. Introduction
#### Motivation
> WE conisder two different type of value function approximation V and Q

So we are trying to directly parametrise the `policy`, which again, rely on `model-free` reinforcement learning
![[Pasted image 20260804152915.png]]

So what we are seeing is a probability distribution function of state and parameter $[s, \theta]$ with different actions

#### Value-based and policy-based RL
--> Gradient Ascent (go along the policy with more returns, maximize reward)
![[Pasted image 20260804153443.png]]

> Adventages
> - Better convergence properties
> - Effective in high-dimensional or continuous action spaces
> - Can learn stochastic policies

> Disadventages
> - Typically converge to a local rather than global optimum
> - Evaluating a policy is typically inefficient and high variance

`More stable, sometime less efficient as we mvoe on the direction improving the policy  for just a little bit`

Why we might need stochastic policies?
>eg1 . the best strategy to play in Rock-paper-scissors is a stochastic process, the best strategy is a random performance agaist the opponent.


>eg2. So in this case here, we deterministic policy will not drag us out of the gray box from one side of the chart, but stochastic policy can do better to solve this. (Key is the robot cannot differentiate the two grey box)![[Pasted image 20260804154242.png]]

#### Policy Search
- We are improving parameter $\theta$, but how can we measure the quality of $\pi_\theta$? 

1. In episodic env, we can use the *start value* (if we only care about the performance from the start to the end)
2. In continuous env, we can use the *average value*, or even
3. *Average reward* per time-step.
![[Pasted image 20260804155000.png]]

#### Policy Optimization
key here, find $\theta$ maximize $J(\theta)$
![[Pasted image 20260804155454.png]]


## 2. Finite Difference Policy Gradient
#### Policy Gradient
Imagine there is some surface that is defined by two policyy parameter, and the reward with those policy parameter, we want to find the local maximum (the highest point) related to these policy parameter --> we are doing `gradient ascent`
![[Pasted image 20260804222856.png]]
where we take the partial derivative,

some easy way to do so may looks like:
![[Pasted image 20260804223120.png]]
one of the key here is that we are *perturbing* in $k$th dimension
and we see $J(\theta)$ as the expected return over the trajectories. 

## 3. Monte-Carlo Policy Gradient
#### Likelihood ratio
*the gradient of the policy divided by the policy itself is equal to the log of the policy*. 

And we define this part of the function as: **score function**
![[Pasted image 20260804224104.png]]
the log here is *just the chain rule!* As simple as that.....

#### Softmax policy
![[Pasted image 20260804224847.png]]
To interpret the score function, we can see it as "how much this current feature for the action we took minus the average feature"
ps. $\phi(s,a)$ is the feature vector, and it transpose dotted with $\theta$.

in other sense, *if this feature generate more reward, we should probably do more about this feature*

#### Gaussian policy
![[Pasted image 20260804225211.png]]
this is still measuring how much more am i doing compare to the mean.

### Policy Gradient Theorem
![[Pasted image 20260804230536.png]]
the conditions are:
- A state s is drawn from some distribution $d(s)$
- The agent picks action a from policy $π_θ​(s,a)$
- The environment immediately gives reward $r=R_{s,a}$​ and terminates


Based on this:
- The policy gradient theorem generalizes the likelihood ratio approach to multi-stepp MDPs
- Replaces instantaneous reward $r$ with long-term value $Q^{\pi} (s,a)$ 
- Policy gradient theorem applies to start state objectives, average reward and average value objective
>Theorem:![[Pasted image 20260804230948.png]]


#### Monte-Carlo Policy gradient (REINFORCE)
![[Pasted image 20260804232559.png]]
but monte carlo is not super efficient...
so we want to achieve similar effect in smaller time
![[Pasted image 20260804233149.png]]
PS: it also comes with super high variance...

## 4. Actor-Critic Policy Gradient
We can use `critic` to estimate the action-value function...
So there are *two* set of parameter running parallelly!!!

In this sense:
![[Pasted image 20260804233421.png]]

> Key here, we are not using return to evaluate the action value function, but use a critic to evaluate.
> So maybe we have a neural network or stuff like that to estimate $Q_w$

*We move in the direction of the critic saying hey this is good or bad $\Delta \theta$ 

#### Estimatinng the action-value function
When we get to the policy evaluation, it falls back to how good current policy $\pi_{\theta}$ in the context of parameter $\theta$. 
![[Pasted image 20260804234209.png]]

#### Action-Value Actor-Critic
![[Pasted image 20260804234422.png]]
Lively, this should be what we see here, where we update actor and critic at the same time!

##### Bias in Actor-Critic Approximation
![[Pasted image 20260804234757.png]]

**So we can using a baseline to reduce the variance**
![[Pasted image 20260804235216.png]]

##### Estimating the adventage function
![[Pasted image 20260804235630.png]]


#### Actors at Different time-scales
- How it being write up
![[Pasted image 20260804235735.png]]

- How valid as observe the policy gradient with all the traces
![[Pasted image 20260804235854.png]]

## 5. Natural Policy Gradient
Work directly with starting off with deterministic policies
![[Pasted image 20260805000220.png]]


### Reference
https://www.youtube.com/watch?v=KHZVXao4qXs&t=2627s
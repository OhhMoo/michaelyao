### Tags: [[ML]] [[Reinforcement Learning]]
# Part 1: Reinforcement Learning Formalism
## 1. The Return in reinforcement learning
An example about Mars Rover:
![[Pasted image 20251121163023.png|center|400]]
- Concepts:
	**State**: There are 6 state. State 1 and state 6 are the *terminal state* with rewards
	
	**Return**: Robot goes through some sequence of states, the return the reward on that state times with a discount factor $\gamma$. 

Example: for $\gamma = 0.9$ , we have return equals to: $$\text{Return} = R_1\times\gamma + R_2 \times \gamma^2 +R_3\times\gamma^3...+R_n\times\gamma^n$$
Therefore, the return will be:
![[Pasted image 20251121164007.png|center|400]]

Furthermore, the return depends on the action you need to take at that location.
If the rover is moving to the left for all the cell, with $\gamma = 0.5$, the reward will be:
![[Pasted image 20251121164325.png|center|400]]
As you move further away from the 100 award spot, the award will the drastically decreases.

Similarly, for going to the right: 
![[Pasted image 20251121164441.png|center|400]]
And we can combine them to find the best reward rover can get in each step taken.

## 2. Making decisions: Policies in reinforcement learning
- We need a policy $\pi$ in a specific state $s$ to take an action $a$
- ***Goal of reinforcement learning: find a policy $\pi$ that tells you what action to take in every state so as to maximize the return***
- Review of the key concepts:
  { states, actions, rewards, discount factor $\sigma$, return, policy $\pi$ }
![[Pasted image 20251121185315.png|center|400]]
- Markov Decision Process (MDP)
![[Pasted image 20251121185513.png|center|400]]
## 3. State-action value function
Definition: $Q(s,a)$ = Return, if you
- start in state $s$
- take action $a$ (once)
- then behave optimally after that

Example: ![[Pasted image 20251121191457.png|center|400]]
The best possible return from state $s$ is max $Q(s,a)$, this gives us a good way to compute the optimal policy $\pi$ of $S$. 


## 4. Bellman Equation
Use to calculate $Q(s,a)$ 
- s: Current State
- a: current action
- s': state you get to after taking action $a$
- a': action that you take in the state $s'$
- **R(s) = reward of current state

$$ Q(s,a) = R(s) + \gamma \cdot max_{a'}Q\,(s',a') $$
Example:
![[Pasted image 20251125204646.png|center|400]]
For Q(2, $\leftarrow$) = R(2) + 0.5 $\times$ max value of the return in (1), which both of them are 100. Therefore, Q(2, $\leftarrow$) = 0 + 0.5$\times$ 100=50, which is the reward on the left.

Explanation:
There are two component of Bellman equation, immediate reward and the reward get from behaving optimally.

![[Pasted image 20251125205342.png|center|400]]
These two equation are equivalent, since they are equivalent. 


## Stochastic Environment in Reinforcement learning

**In stochastic environment, we are not optimizing the return (cuz it is just merely a random number), we are optimizing the average of the return, which is shown below:
![[Pasted image 20251125210547.png|center|400]]

![[Pasted image 20251125210717.png|center|400]]

An easy way to understand this is: there are 90% it go to left, and 10% it go to right, and we take the average of that two condition as the future return, and then plug that value into the calculation.

# Part 2 Concept of Continuous State
Discrete: Only in certain number of state
Continuous: Multiple state with multiple factors.
![[Pasted image 20251126231035.png|center|400]]

Where the $\dot{x}$ and other dot factors are the vector describing the speed in that direction. Example: x is the position at x axis, $\dot{x}$ the velocity moving in x direction.

## Example: Lunar lander
![[Pasted image 20251126231552.png|center|400]]

Reward function:
![[Pasted image 20251126231621.png|center|400]]

Goal: 
- Learn a policy $\pi$ that given S
- Picks action $a=\pi(s)$ so as to maximize the return

## Learning the state-value function
### 1. Structure of the learning algorithm
![[Pasted image 20251126232149.png|center|400]]
1. Create a vector input as $S$ representing states and $a$ representing action (0100 shows firing in left, 1000 shows firing in right)
2. Run through neural network, with final output in one neuron
3. Get $Q(s,a)$ value, where there are four states of a.
4. Pick the $a$ that maximized $Q(s,a)$

Utilize Bellman Equation to find $x$ and $y$, and use randomized data to collect the data and compared with the result from Bellman Equation
![[Pasted image 20251126232859.png|center|400]]

Learning algorithm:
1. Initialize neural network randomly as guess of Q(s,a)
2. Repeat{
   Take actions in the lunar lander. Get (s,a,R(s),s'), Store 10,000 most recent }(s,a,R(s),s') tuples
   }
3. Train neural network:
   Create training set of 10,000 examples using Bellman equation x(s,a) and y=R(s) + $\gamma\,\text{max}_{a'}\,Q(s',a')$
4. Train $Q_{new}$  such that $Q_{new} (s,a) = y$  
5. Set $Q=Q_{new}$ 
Another name: Deep Q algorithm

### Algorithm refinement
1. Simultaneous output
![[Pasted image 20251126233801.png|center|400]]
This compute simultaneously for all four values, it will be much easier to pick the $Q_{max}$

2. $\epsilon$-greedy policy
In most of the cases, do the action that maximize Q(s,a), which is the =="greedy" action==. Meanwhile, take some =="exploration action"== that randomly take an action. 

Therefore, $\epsilon$ describe the probability an exploration move is being taken.
![[Pasted image 20251126235241.png|center|400]]
Another potential way is that starting with high $\epsilon$ value, the gradually reduce the level of random action since we have a better fitted Q value.

3. Mini-batch and soft updates
- Mini-batch
![[Pasted image 20251127003326.png|center|400]]

![[Pasted image 20251127003342.png|center|400]]
On average, the mini-batch gradient descent will tend to move toward local minimum in average, but the processing speed will be much faster.

For Learning algorithm, try to create a set of replay buffer in a small dataset to speed up the reinforcement learning

- Soft update
![[Pasted image 20251127003728.png|center|400]]
Soft update make a more gradual change to prevent abrupt change in $Q_{new}$. 


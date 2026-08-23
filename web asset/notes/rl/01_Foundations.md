
> The building blocks: Markov chains, rewards, returns, value functions, and the Bellman equation.

## 1. What is Reinforcement Learning?

Four core challenges:

| Challenge | What it means |
|-----------|---------------|
| **Optimization** | Find a policy that maximizes cumulative reward |
| **Delayed Consequences** | Actions affect not just immediate reward, but future states and rewards |
| **Exploration** | Must try unknown actions to discover potentially better outcomes |
| **Generalization** | Cannot pre-program every scenario; must learn patterns |

**Key distinction from Supervised Learning:**
- SL: Given $(x, y)$ pairs, learn a mapping
- RL: Given only rewards (often sparse, delayed), discover the right behavior
---
## 2. Markov Property
> The future depends only on the present state, not on how you got there.

![Markov Assumption](Pasted%20image%2020260721204322.png)

![State Representation](Pasted%20image%2020260721205013.png)

$$P(S_{t+1} = s' \text{ | } S_t = s, S_{t-1}, S_{t-2}, \text{...}) = P(S_{t+1} = s' \text{ | } S_t = s)$$
> The future depends only on the present state, not on how you got there.
$$P(S_{t+1} = s' 	ext{ | } S_t = s, S_{t-1}, S_{t-2}, 	ext{...}) = P(S_{t+1} = s' 	ext{ | } S_t = s)$$

**Key insight:** Find the **smallest state representation** that preserves the Markov property. Compress history without losing predictive power.

---

## 3. Markov Process (Markov Chain)

A pair $(S, P)$:

- $S$ = finite set of states
- $P$ = transition matrix, where $P(s' | s)$ = probability of moving to $s'$ from $s$

$P$ is an $|S| \times |S|$ matrix. Each row sums to 1.

**Example:** Mars Rover with 7 states, can move left/right with some probability.

![Mars Rover Example](Pasted%20image%2020260721210538.png)

![Policy Diagram](Pasted%20image%2020260721210858.png)

---

## 4. Markov Reward Process (MRP)

An MRP is $(S, P, R, \gamma)$ — a Markov chain plus rewards and discounting.

| Symbol | Meaning |
|--------|---------|
| $R(s)$ | Expected reward for **being** in state $s$ |
| $\gamma \in [0,1]$ | Discount factor — how much future rewards matter |
| $G_t$ | Return: cumulative discounted reward from time $t$ |

### Return

$$G_t = r_t + \gamma r_{t+1} + \gamma^2 r_{t+2} + \cdots$$

- $\gamma = 0$: Only immediate reward matters (myopic)
- $\gamma \to 1$: Long-term planning (far-sighted)
- $\gamma < 1$ ensures infinite sums converge

### Value Function $V(s)$

The expected return starting from state $s$:

$$V(s) = \mathbb{E}[G_t \text{ | } S_t = s]$$

---

## 5. The Bellman Equation for MRPs

The Markov property lets us write $V(s)$ recursively:

$$V(s) = \underbrace{R(s)}_{\text{immediate reward}} + \gamma \underbrace{\sum_{s' \in S} P(s' | s) V(s')}_{\text{expected future value}}$$

**Why this is powerful:** Instead of summing an infinite series, we do a one-step lookahead.

**This only works because of the Markov property.** If the future depended on the full history, we'd need the whole trajectory, not just $s'$.

---

## 6. Solving MRPs

### Direct Solution (Matrix Form)

$$\mathbf{V} = \mathbf{R} + \gamma \mathbf{P} \mathbf{V}$$

$$\mathbf{V} = (\mathbf{I} - \gamma \mathbf{P})^{-1} \mathbf{R}$$

**Problem:** Matrix inversion is $O(|S|^3)$. Only feasible for small state spaces.

### Iterative Solution (Dynamic Programming)

Repeatedly apply the Bellman update until convergence:

$$V_{k+1}(s) = R(s) + \gamma \sum_{s'} P(s' | s) V_k(s')$$

This is the foundation of all DP methods.

---

## 7. From MRP to MDP: Adding Actions

A **Markov Decision Process** is $(S, A, P, R, \gamma)$:

![MDP Diagram](Pasted%20image%2020260721202341.png)

![MDP Example](Pasted%20image%2020260721202823.png)

![History Statement](Pasted%20image%2020260721204134.png)

| Symbol    | Meaning                                    |     |
| --------- | ------------------------------------------ | --- |
| $S$       | States                                     |     |
| $A$       | Actions                                    |     |
| $P(s',a)$ | Transition dynamics (now depend on action) |     |
| $R(s, a)$ | Reward function (may depend on action)     |     |
| $\gamma$  | Discount factor                            |     |

A **Markov Decision Process** is $(S, A, P, R, \gamma)$:

| Symbol     | Meaning                                    |     |
| ---------- | ------------------------------------------ | --- |
| $S$        | States                                     |     |
| $A$        | Actions                                    |     |
| $P(s', a)$ | Transition dynamics (now depend on action) |     |
| $R(s, a)$  | Reward function (may depend on action)     |     |
| $\gamma$   | Discount factor                            |     |

**Key idea:** A policy $\pi(a | s)$ turns an MDP into an MRP. Once you fix the policy, you're back to the MRP framework.

### Policy
A policy $\pi$ maps states to action probabilities:

$$\pi(a | s) = P(A_t = a \text{ | } S_t = s)$$

Under a fixed policy, the MDP becomes an MRP with:
- $P^\pi(s' | s) = \sum_a \pi(a | s) P(s' | s, a)$
- $R^\pi(s) = \sum_a \pi(a | s) R(s, a)$

---

## 8. Summary: The Chain of Ideas

```
Markov Chain (S, P)
        ↓
MRP (S, P, R, γ)          ← add rewards + discounting
        ↓
MDP (S, A, P, R, γ)       ← add actions
        ↓
MDP + Policy π            ← reduces back to MRP
        ↓
Value Function V(s)       ← central object for evaluation
```

At each layer, the value function machinery — return, Bellman recursion, iterative solution — carries over.

---

## Reference
- Sutton & Barto: Chapter 3
- CS234 Lecture 1


> When the state space is too large for a table, approximate value functions with parameterized models (e.g., neural networks).

---

## 1. Why Function Approximation?

![Motivation](Pasted%20image%2020260728231056.png)

![FA Idea](Pasted%20image%2020260728231331.png)

**The tabular problem:**
- Chess: $\sim 10^{47}$ states
- Atari: Raw pixels — millions of dimensions
- Robot control: Continuous joint angles

**You cannot store $Q(s,a)$ in a table.**

**The solution:** Approximate with a function:

$$\hat{Q}(s, a; \mathbf{w}) \approx Q^\pi(s,a)$$

Where $\mathbf{w}$ are learnable parameters (e.g., neural network weights).

---

## 2. The Oracle Thought Experiment

To build intuition, imagine an oracle gives you the **true** $Q^\pi(s,a)$ for any query.
Then learning $\hat{Q}$ becomes **supervised regression:**

| | Supervised Learning | RL with Oracle |
|---|---|---|
| Input | Image $x$ | State-action $(s,a)$ |
| Target | Label $y$ | True $Q^\pi(s,a)$ |
| Learn | $f(x; \mathbf{w})$ | $\hat{Q}(s,a; \mathbf{w})$ |
| Loss | $(y - f)^2$ | $(Q^\pi - \hat{Q})^2$ |

**In reality, there is no oracle.** The target comes from:
- Monte Carlo return: $G_t$
- TD target: $R_{t+1} + \gamma \hat{Q}(S_{t+1}, A_{t+1}; \mathbf{w})$

These are **noisy, biased estimates** of $Q^\pi$ — but the approximation framework is the same.

---

## 3. Value Function Approximation Methods

![MC with FA](Pasted%20image%2020260728232202.png)

### Monte Carlo with Function Approximation

Target: the actual return $G_t$

$$\mathbf{w} \leftarrow \mathbf{w} + \alpha (G_t - \hat{Q}(S_t, A_t; \mathbf{w})) \nabla_\mathbf{w} \hat{Q}(S_t, A_t; \mathbf{w})$$

This is **gradient descent** on the squared error between predicted and actual return.

![TD with FA](Pasted%20image%2020260728232341.png)

![Weight Update](Pasted%20image%2020260728232432.png)

### TD with Function Approximation

Target: the TD target $R_{t+1} + \gamma \hat{Q}(S_{t+1}, A_{t+1}; \mathbf{w})$

$$\mathbf{w} \leftarrow \mathbf{w} + \alpha \left[ R_{t+1} + \gamma \hat{Q}(S_{t+1}, A_{t+1}; \mathbf{w}) - \hat{Q}(S_t, A_t; \mathbf{w}) \right] \nabla_\mathbf{w} \hat{Q}(S_t, A_t; \mathbf{w})$$

**Key difference from tabular TD:** The update changes $\mathbf{w}$, which affects $\hat{Q}$ for **all** states — not just $(S_t, A_t)$.

---

## 4. Deep Q-Networks (DQN)

When $\hat{Q}(s, a; \mathbf{w})$ is a deep neural network.

### Two Key Innovations (Mnih et al., 2015)

#### 1. Experience Replay

![Experience Replay](Pasted%20image%2020260728233504.png)

Store transitions $(s, a, r, s')$ in a **replay buffer**, then sample random mini-batches for training.

**Why:**
- Breaks correlation between consecutive samples
- Reuses past experience (data efficiency)
- Smooths learning

#### 2. Fixed Q-Targets

![Fixed Q-Targets](Pasted%20image%2020260728233629.png)

Use a **separate target network** $\hat{Q}(s', a'; \mathbf{w}^-)$ with frozen weights for computing the TD target.

$$\text{Target} = R_{t+1} + \gamma \max_{a'} \hat{Q}(S_{t+1}, a'; \mathbf{w}^-)$$

Update $\mathbf{w}^-$ to match $\mathbf{w}$ only periodically.

**Why:** Prevents oscillations and divergence. The target doesn't change while you're chasing it.

### DQN Loss

$$L(\mathbf{w}) = \mathbb{E}_{(s,a,r,s') \sim \text{replay}} \left[ \left( r + \gamma \max_{a'} \hat{Q}(s', a'; \mathbf{w}^-) - \hat{Q}(s, a; \mathbf{w}) \right)^2 \right]$$

Minimize via **gradient descent** (backprop through the Q-network).

---

## 5. DQN Algorithm (Pseudocode)

![DQN Pseudocode](Pasted%20image%2020260728233735.png)

```
Initialize replay buffer D
Initialize Q-network with random weights w
Initialize target network w^- = w

For episode = 1, M:
    Observe initial state s
    
    For t = 1, T:
        With probability ε: select random action a
        Otherwise: a = argmax_a Q(s, a; w)
        
        Execute a, observe r, s'
        Store (s, a, r, s') in D
        
        Sample random mini-batch from D
        For each transition in batch:
            y = r + γ max_a' Q(s', a'; w^-)    ← fixed target
            Loss += (y - Q(s, a; w))^2
        
        Gradient descent on Loss w.r.t. w
        
        Every C steps: w^- ← w                ← update target network
        s ← s'
```

---

## 6. Beyond DQN: Frontier Methods

| Method | Improvement | Key Idea |
|--------|-------------|----------|
| **Double DQN** | Reduce overestimation | Decouple action selection from action evaluation |
| **Prioritized Replay** | Better sampling | Sample transitions with high TD error more often |
| **Dueling DQN** | Better architecture | Separate streams for state-value and advantage |
| **Noisy Nets** | Adaptive exploration | Learn exploration parameters as part of network |

---

## 7. Summary: The Full RL Landscape

```
RL Methods
├── Model-Based
│   └── Dynamic Programming (Policy/Value Iteration)
│       └── Certainty Equivalence (learn model, then DP)
│
├── Model-Free
│   ├── Prediction (evaluate fixed π)
│   │   ├── Monte Carlo
│   │   └── Temporal Difference (TD)
│   │
│   └── Control (find optimal π)
│       ├── Monte Carlo Control (ES, On-Policy, Off-Policy)
│       ├── SARSA (on-policy TD)
│       ├── Q-Learning (off-policy TD)
│       └── DQN (Q-Learning + neural nets + replay + fixed targets)
│
└── Function Approximation
    ├── Linear approximation
    └── Deep neural networks (DQN and variants)
```

---

## Reference

- Sutton & Barto: Chapters 9–10, 16
- Mnih et al. (2015): "Human-level control through deep reinforcement learning"
- CS234 Lectures 4–5

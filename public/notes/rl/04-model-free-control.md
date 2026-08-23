> Find the **optimal policy** without knowing the MDP model. This is the heart of practical RL.
---
## 1. Generalized Policy Iteration (GPI)

![GPI](Pasted%20image%2020260728161501.png)

![GPI Continued](Pasted%20image%2020260728161859.png)

The unifying principle behind all control methods:

```
┌─────────────────────────────────────────┐
│  1. POLICY EVALUATION                   │
│     "How good is my current policy?"    │
│     → Update V or Q                     │
│                                         │
│  2. POLICY IMPROVEMENT                  │
│     "Can I do better at any state?"     │
│     → Make policy greedy w.r.t. V or Q  │
│                                         │
│  Repeat until convergence               │
└─────────────────────────────────────────┘
```

**Key insight:** Neither step needs to complete before the other runs. They can interleave in any way.

---

## 2. The Exploration Problem

If you always act greedily, you **never try** new actions. You might miss the optimal one.

**Solutions:**

| Method | How it explores | When to use |
|--------|----------------|-------------|
| **Exploring Starts (ES)** | Random $(s,a)$ at episode start | Theory; unrealistic in practice |
| **ε-Greedy** | Random action with prob $\epsilon$ | Default practical choice |
| **Softmax / Boltzmann** | Probabilistic, favors better actions | When you want smarter exploration |

![Epsilon-Greedy Improvement](Pasted%20image%2020260728162307.png)

### ε-Greedy Policy

$$\pi(a|s) = \begin{cases} 1 - \varepsilon + \frac{\varepsilon}{|A(s)|} & \text{if } a = a^* = \arg\max_a Q(s,a) \\ \frac{\varepsilon}{|A(s)|} & \text{otherwise} \end{cases}$$

- **$(1-\varepsilon)$** of the time: act greedily
- **$\varepsilon$** of the time: pick uniformly at random

---

## 3. Monte Carlo Control

![On-Policy Improvement](Pasted%20image%2020260728163326.png)

![Epsilon-Greedy Example](Pasted%20image%2020260728163632.png)

### MC with Exploring Starts (MC ES)

```
Initialize Q(s,a) = 0, π(s) = random

Loop forever:
    1. Pick random (s,a) as start, generate episode following π
    2. For each (s,a) in episode:
         Q(s,a) ← average of returns from (s,a)
    3. π(s) ← argmax_a Q(s,a) for all s
```

**Problem:** Requires being able to start from any $(s,a)$ — often impossible.

### On-Policy MC Control (ε-Greedy)

```
Initialize Q(s,a) = 0, π = ε-greedy w.r.t. Q

Loop forever:
    1. Generate episode following π (starts from normal initial state)
    2. For each (s,a) in episode:
         Q(s,a) ← Q(s,a) + α(G - Q(s,a))
    3. π ← ε-greedy w.r.t. updated Q
```

**No exploring starts needed** — exploration is built into the policy.

![GLIE](Pasted%20image%2020260728164312.png)

### GLIE: Greedy in the Limit with Infinite Exploration
For on-policy MC to converge to $Q_*$:
1. **Every $(s,a)$ visited infinitely often**
2. **Policy becomes greedy in the limit**
Achieved by **decaying $\varepsilon \to 0$** over time (e.g., $\varepsilon = 1/k$).

---

## 4. Temporal Difference Control

![SARSA](Pasted%20image%2020260728222512.png)

![On and Off Policy](Pasted%20image%2020260728225123.png)

### SARSA (On-Policy TD Control)

Uses the **actual next action** $A_{t+1}$ in the update:

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) \right]$$

**Why "SARSA":** $S_t \to A_t \to R_{t+1} \to S_{t+1} \to A_{t+1}$

**Key property:** On-policy — evaluates the same ε-greedy policy it follows.

**Behavior:** Conservative. Accounts for its own exploration. Good for avoiding dangerous states (e.g., cliff walking).

![Q-Learning](Pasted%20image%2020260728225954.png)

![Q-Learning Max](Pasted%20image%2020260728230120.png)

### Q-Learning (Off-Policy TD Control)

Uses **max over all next actions** regardless of what was actually taken:

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma \max_{a'} Q(S_{t+1}, a') - Q(S_t, A_t) \right]$$

**Key property:** Off-policy — evaluates the **greedy** policy while following an **exploratory** (ε-greedy) policy.

**Behavior:** Aggressive. Assumes perfect future actions. Often learns the optimal policy faster.

### SARSA vs. Q-Learning

| | SARSA | Q-Learning |
|---|---|---|
| **Target uses** | $Q(S', A')$ — actual next action | $\max_{a'} Q(S', a')$ — best action |
| **On/Off-policy** | On-policy | Off-policy |
| **Behavior** | Conservative | Aggressive |
| **Risk** | Avoids risky paths | May learn risky optimal paths |
| **Example** | Cliff walking — stays safe | Cliff walking — hugs the edge |

---

## 5. Off-Policy Monte Carlo Control

Learn about a **target policy** $\pi$ while following a different **behavior policy** $b$.

### Importance Sampling

Reweight returns from $b$ to estimate expectations under $\pi$:

$$\rho_{t:T-1} = \prod_{k=t}^{T-1} \frac{\pi(A_k | S_k)}{b(A_k | S_k)}$$

| | Ordinary IS | Weighted IS |
|---|---|---|
| **Formula** | $\frac{\sum \rho G}{N}$ | $\frac{\sum \rho G}{\sum \rho}$ |
| **Bias** | Unbiased | Biased (but consistent) |
| **Variance** | Can be infinite | Always finite |

**Key insight:** The behavior policy $b$ must "cover" the target policy $\pi$ — if $\pi$ might take an action, $b$ must have non-zero probability of taking it.

---

## 6. Summary: Model-Free Control Methods

```
Model-Free Control (find optimal policy)
├── Monte Carlo Methods
│   ├── MC ES                  ← exploring starts + greedy
│   ├── On-Policy MC (ε-greedy) ← GLIE, no ES needed
│   └── Off-Policy MC          ← importance sampling
│
├── Temporal Difference Methods
│   ├── SARSA                  ← on-policy, uses actual A'
│   └── Q-Learning             ← off-policy, uses max_a' Q(S',a')
│
└── All are instances of GPI
```

### The Policy Landscape

| Policy         | Type          | Used In                                  |
| -------------- | ------------- | ---------------------------------------- |
| Greedy         | Deterministic | Value Iteration, Q-Learning target       |
| ε-Greedy       | Stochastic    | SARSA, On-Policy MC, Q-Learning behavior |
| Softmax        | Stochastic    | Some bandit / exploration variants       |
| Uniform Random | Stochastic    | Pure exploration baseline                |
|                |               |                                          |

---

## Reference

- Sutton & Barto: Chapters 5.2–5.7, 6.4–6.5
- CS234 Lectures 3–4

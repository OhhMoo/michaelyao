> What if you **don't know** $P(s' | s, a)$? Learn value functions from experience instead.
---
## 1. The Core Question
**Prediction:** Given a policy $\pi$, estimate $V^\pi(s)$ or $Q^\pi(s,a)$ — without knowing the MDP dynamics.
Two families of methods:
- **Monte Carlo (MC):** Learn from complete episodes
- **Temporal Difference (TD):** Learn from each step

---

## 2. Monte Carlo Policy Evaluation

![MC Core Idea](Pasted%20image%2020260724153027.png)

![MC Computation](Pasted%20image%2020260724153706.png)

![Every Visit MC](Pasted%20image%2020260724154246.png)

![First vs Every Visit Example](Pasted%20image%2020260724154547.png)

### Core Idea

Sample complete episodes following $\pi$, then average the returns.

$$V^\pi(s) = \mathbb{E}[G_t \text{ | } S_t = s] \approx \frac{1}{N} \sum_{i=1}^{N} G_{i,t}$$

**Key properties:**
- **Model-free:** Does not need $P(s' | s, a)$
- **Episodic:** Requires finite episodes (must reach terminal state)
- **Does not assume Markov property:** Works even if states aren't Markov
- **High variance:** Returns can vary wildly between episodes

### First-Visit vs. Every-Visit

| Method | Rule | Bias |
|--------|------|------|
| **First-Visit MC** | Use return from the **first** visit to $s$ in each episode | Unbiased |
| **Every-Visit MC** | Use returns from **all** visits to $s$ in each episode | Slightly biased (but consistent) |

![Incremental MC](Pasted%20image%2020260724160145.png)

### Incremental Update

Instead of storing all returns and averaging:

$$V(s) \leftarrow V(s) + \frac{1}{N(s)} (G_t - V(s))$$

This is mathematically equivalent to $V(s) = \frac{\sum G}{N}$ but uses constant memory.

### Constant-$\alpha$ MC

Replace $\frac{1}{N}$ with a constant step size:

$$V(s) \leftarrow V(s) + \alpha (G_t - V(s))$$

| $\alpha = 1/N$ | $\alpha$ = constant |
|----------------|---------------------|
| Exact sample mean | Exponential moving average |
| Unbiased | Biased (but tracks non-stationary dynamics) |
| Best for stationary MDPs | Best for non-stationary or function approximation |

![MC Properties](Pasted%20image%2020260724162251.png)

## 3. Temporal Difference Learning

![TD for Estimating V](Pasted%20image%2020260725113557.png)

![TD(0) Learning](Pasted%20image%2020260725114139.png)

![TD Update](Pasted%20image%2020260725114450.png)

![TD Knowledge Check](Pasted%20image%2020260725115649.png)

![TD Summary](Pasted%20image%2020260725120226.png)

### Core Idea

Combine the **sampling** of Monte Carlo with the **bootstrapping** of Dynamic Programming.

Update after **every step** — no need to wait for episode termination.

### TD(0) Update for State-Values

$$V(S_t) \leftarrow V(S_t) + \alpha \left[ \underbrace{R_{t+1} + \gamma V(S_{t+1})}_{\text{TD Target}} - V(S_t) \right]$$

**Key components:**
- **TD Target:** $R_{t+1} + \gamma V(S_{t+1})$ — a guess at the true value using one real sample + one estimate
- **TD Error:** $\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)$ — how wrong the current estimate was

**Why it works:** You immediately nudge $V(S_t)$ toward a slightly better estimate based on what just happened.

### TD vs. MC Comparison

| | Monte Carlo | TD(0) |
|---|---|---|
| **Needs episodes?** | Yes — must wait for termination | No — updates every step |
| **Bootstraps?** | No — uses actual return $G_t$ | Yes — uses $V(S_{t+1})$ estimate |
| **Variance** | High | Lower |
| **Bias** | Unbiased | Some bias (from bootstrapping) |
| **Markov required?** | No | Yes (for theoretical guarantees) |
| **Works in continuing tasks?** | No | Yes |

---

## 4. Certainty Equivalence

![Certainty Equivalence](Pasted%20image%2020260725121818.png)

![CE Benefits](Pasted%20image%2020260725122132.png) (Model-Based from Data)

An intermediate approach: **learn the model from data**, then run DP.

### The Pipeline

```
Experience: (s,a,r,s') → (s,a,r,s') → ...
           ↓
    Estimate model:
        P̂(s'|s,a) = count(s→s' via a) / count(s,a)
        R̂(s,a) = average reward for (s,a)
           ↓
    Run DP (Policy Evaluation / Value Iteration)
           ↓
    Get V^π(s) under estimated model
```

**Trade-off:**
- More data-efficient early on (uses all data via model)
- Computationally expensive (re-run DP after each update)
- Overconfident — treats estimated model as ground truth

---

![Batch MC and TD](Pasted%20image%2020260725123312.png)

![Batch Example](Pasted%20image%2020260725123335.png)

## 5. Batch MC vs. Batch TD

When you have a fixed batch of experience (not online):

- **Batch MC:** Finds $V$ that minimizes mean-squared error on the observed returns
- **Batch TD(0):** Finds $V$ that would be exactly correct if the MDP were **maximum-likelihood** estimated from the batch

**TD is often more accurate** in batch settings because it leverages the Markov structure.

---

## 6. Summary: Model-Free Prediction Methods

```
Model-Free Prediction (evaluate a fixed policy π)
├── Monte Carlo
│   ├── First-Visit MC      ← unbiased, episodic only
│   ├── Every-Visit MC      ← slightly biased
│   └── Incremental / Constant-α
│
├── Temporal Difference
│   └── TD(0)               ← online, bootstraps, every step
│
└── Certainty Equivalence   ← learn model first, then DP
```

**What you should know:**
- MC averages actual returns — unbiased but high variance, must wait for episodes
- TD bootstraps its own estimates — lower variance, online, works for continuing tasks
- Both converge to $V^\pi$ under standard conditions

---

## Reference

- Sutton & Barto: Chapters 5.1, 6.1–6.2
- CS234 Lecture 3


> When you **know** the MDP model $P(s' | s, a)$ and $R(s, a)$, you can plan directly.
---
## 1. Two Core Problems

| Problem | Goal | What we compute |
|---------|------|-----------------|
| **Prediction** | Evaluate a fixed policy $\pi$ | $V^\pi(s)$ or $Q^\pi(s,a)$ |
| **Control** | Find the optimal policy $\pi_*$ | $V_*(s)$ or $Q_*(s,a)$ and $\pi_*$ |

DP solves both when the model is known.

---

## 2. Policy Evaluation (The Prediction Problem)

![Return and Value Function](Pasted%20image%2020260722123744.png)

![MRP Value Function](Pasted%20image%2020260722123906.png)

Given a policy $\pi$, find $V^\pi(s)$.


### The Bellman Expectation Equation

$$V^\pi(s) = \sum_a \pi(a | s) \sum_{s', r} p(s', r | s, a) \left[ r + \gamma V^\pi(s') \right]$$

**Iterative solution:** Start with arbitrary $V_0$, then repeatedly apply:

$$V_{k+1}(s) = \sum_a \pi(a | s) \sum_{s', r} p(s', r | s, a) \left[ r + \gamma V_k(s') \right]$$

Repeat until $V_k$ converges to $V^\pi$.

---

## 3. MDP Structure

![MDP Process](Pasted%20image%2020260722131342.png)

![Deterministic Actions](Pasted%20image%2020260722131500.png)

![MDP Policies](Pasted%20image%2020260722131913.png)

![Policy Value Functions](Pasted%20image%2020260722133142.png)

![MDP Controls](Pasted%20image%2020260722133950.png)

![Q Functions](Pasted%20image%2020260722134520.png)

![Policy Improvement](Pasted%20image%2020260722134503.png)

![Bellman Equation](Pasted%20image%2020260722143059.png)

## 3. Policy Iteration (Full Loop)

Alternates between evaluation and improvement until optimal.

```
π₀ →[Evaluate]→ V^{π₀} →[Improve]→ π₁ →[Evaluate]→ V^{π₁} →[Improve]→ π₂ → ... → π*
```

### Step 1: Policy Evaluation

Iteratively compute $V^\pi$ for the current policy $\pi$ (using the Bellman expectation equation above).

Run until convergence (or a fixed number of sweeps).

### Step 2: Policy Improvement

Make the policy greedy with respect to current $V^\pi$:

$$\pi'(s) = \arg\max_a \sum_{s', r} p(s', r | s, a) \left[ r + \gamma V^\pi(s') \right]$$

### Step 3: Check Convergence

If $\pi' = \pi$, stop. Otherwise set $\pi \leftarrow \pi'$ and go to Step 1.

**Guaranteed to converge to $\pi_*$ for finite MDPs.**

---

## 4. Value Iteration (Faster)
**Insight:** Don't fully evaluate the policy before improving. Do both in one sweep.

### The Bellman Optimality Equation

$$V_*(s) = \max_a \sum_{s', r} p(s', r | s, a) \left[ r + \gamma V_*(s') \right]$$

Notice: **$\max_a$** instead of averaging over $\pi(a|s)$. This directly computes the optimal value.

### Algorithm

```
Initialize V(s) = 0 for all s
Repeat:
    Δ ← 0
    For each state s:
        v ← V(s)
        V(s) ← max_a Σ_{s',r} p(s',r|s,a) [r + γV(s')]
        Δ ← max(Δ, |v - V(s)|)
until Δ < θ (small threshold)

Output deterministic policy:
    π(s) = argmax_a Σ_{s',r} p(s',r|s,a) [r + γV(s')]
```

### Policy Iteration vs. Value Iteration

| | Policy Iteration | Value Iteration |
|---|---|---|
| Evaluation | Full convergence (many sweeps) | Single sweep combined with improvement |
| Number of iterations | Fewer | More |
| Cost per iteration | Higher | Lower |
| Both converge to | $\pi_*$, $V_*$ | $\pi_*$, $V_*$ |

---

## 5. Why Convergence Is Guaranteed: Contraction Mapping

![Contraction Operator](Pasted%20image%2020260722144258.png)

![Contraction Proof](Pasted%20image%2020260722144754.png)

The Bellman backup operator $B$ is a **contraction** under the max norm:

$$|BV - BV'| \leq \gamma |V - V'|$$

**What this means:** Applying the Bellman operator to two different value functions shrinks the distance between them by at least a factor of $\gamma < 1$.

By the **Banach fixed-point theorem**, repeated application of a contraction converges to a unique fixed point — which is $V_*$.

---

## 6. The Action-Value Function $Q(s,a)$

Sometimes it's more convenient to work with $Q$ instead of $V$:

$$Q^\pi(s, a) = \sum_{s', r} p(s', r | s, a) \left[ r + \gamma \sum_{a'} \pi(a' | s') Q^\pi(s', a') \right]$$

For control, $Q$ is often preferred because:
- No model needed to extract the policy: $\pi(s) = \arg\max_a Q(s,a)$
- Easier for model-free methods (no need to sum over $p(s', r | s, a)$)

---

## 7. Summary: The DP Toolkit

```
Model-Based (know p(s',r|s,a))
├── Policy Evaluation      ← iterative Bellman expectation backups
├── Policy Iteration       ← evaluate + improve loop
└── Value Iteration        ← Bellman optimality backups directly
```

**All guaranteed to converge** for finite MDPs because the Bellman operator is a contraction.

---

## Reference

- Sutton & Barto: Chapter 4
- CS234 Lecture 2

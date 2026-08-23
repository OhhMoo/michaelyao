2026-04-18, 12:00
Tags: [[GNN]] [[Deep Learning]] [[Node Classification]] [[Message Passing]]

## 5.1 Message pasisng and Node Classification

> Given a network wiht labels on some nodes, how do we assign all other nodes in the network

In other word, semi-superivised node classification

### Correlation Classification
#### 1. Correlations Exist in Networks
![[Pasted image 20260415200416.png|400]]
1. Homophily (Individual characteristics --> social conections)
2. Influence (Social connections --> Individual characteristics)
- Homophily: The tendency of individuals to associate and bond with similar others 
- Influence: Social connections can influence the individual characteristics of a person

> Principle Used: *Guilt-by-assoication*
> If i am connected to a node with label X, then I am likely to have label X as well.
- Features of $v$
- Labels of the nodes in $v$'s neighborhood
- Features of the nodes in $v$'s neighborhood
![[Pasted image 20260415201318.png|400]]
< The assumption here: there is homophily in the network>

#### 2. Overview
1. Intuition: simulanesou classification of interlinked nodes using correlations 
2. Probabilistic framework
3. Markov Assumption: the label $Y_v$ of one node v depends on the labels of it neighbors $N_v$
$$P(Y_v) = P (Y_v|N_v) $$
4. Collective classification involves 3 steps:
![[Pasted image 20260415201659.png|697]]

**Local Classifier**
Only used for initial label assignment
- Predicts label based on node attriutes/features
- Standard classification task
- *Does not use network information*

**Relational Classifier**
Capture correlations
- Learns a classifier to label on node based on the labels and attributes of its neighbors
- This is where network information is used

**Collective Inference**
Propagate the correlation
- Apply relational classifier to each node iteratively
- iterate until the inconsistency between neighboring labels is minimized
- Network strucutre affects the final prediction


#### 3. Problem Setting
![[Pasted image 20260415202209.png|550]]


## Relational and Iterative Classification

### Relational Classifier
> Basic idea: Class probability $Y_v$ of node v is a weighted average of class probabilities of its neighbors

![[Pasted image 20260415203934.png|550]]
Basically, the first part is how many nodes conencted with the current node; and use it as denominator.
The second part is the sum of all the node probability = 0 or 1 sum up.
eg. 
![[Pasted image 20260415204345.png|500]]

Then after multiple iterations:
![[Pasted image 20260415204516.png|400]]
And we find in the condition of convergence:
![[Pasted image 20260415204600.png|400]]


### Iterative classification
> Main idea: classify node $v$ based on its attribute $f_v$ as well as labels $Z_v$ of neighbor set $N_v$
- Specific Input type
![[Pasted image 20260415204946.png|500]]
- Architecture
![[Pasted image 20260415205953.png|500]]


- So building the summary vector $Z_v$ is done through a list of  $f_v, I, O$
	$f_v$ is the feture vector of node v itself. 

![[Pasted image 20260415210505.png|550]]

The key insight: you train **two classifiers** on the training set.
- **$\phi_1$** — uses only the node's own features $f_v$ (ignores neighbors)
- **$\phi_2$** — uses both the node's features $f_v$ AND the relational features $z_v = [I, O]$ (neighbor info)

#### The Three Steps (Applied to Test Set)

- Step 1: Train 
![[Pasted image 20260415211207.png|400]]
Train both $\phi_1$ and $\phi_2$ on a _separate_ training graph where all labels are known. This is just standard supervised learning — nothing iterative yet.

- Step 2: Bootstrap with $\phi_1$ 
![[Pasted image 20260415211322.png|400]]
Now move to the test set. All labels are `?` (unknown). You can't use $\phi_2$ yet because you have no neighbor labels to build $z_v$ from! So use $\phi_1$ (features-only classifier) to make an **initial guess** for every node's label based purely on $f_v$.

- Step 3: Iterate (Image 3)
![[Pasted image 20260415211417.png|400]]
**3a. Update $z_v$** — For each node, look at its neighbors' _current_ predicted labels and rebuild the $I$ and $O$ vectors. (This is what Image 3 shows — the blue boxes highlight the updated $z_v$ values.)
**3b. Update $Y_v$** — Now re-run $\phi_2$ (the richer classifier) using the freshly updated $z_v$. This produces new label predictions.

Then repeat 3a → 3b → 3a → 3b... until labels stop changing (convergence) or you hit a max iteration count.
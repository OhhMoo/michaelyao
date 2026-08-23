2026-08-19, 17:37
Tags: [[llm]] [[ML]]

### 1. One-Hot & Co-occurrence Matrix
- One-hot encoding
![[Pasted image 20260819174058.png|295]]
- Co-occurrence matrix
![[Pasted image 20260819173947.png|289]]

### 2. Word2vec
#### 2.1 Idea
![[Pasted image 20260819174831.png|327]]
>**words are still one-hot encoded**
- "cat" might be `[0, 0, 1, 0, 0, ...]`
- "dog" might be `[0, 1, 0, 0, 0, ...]`

>**what we actually want here**
	you don't actually care about the network's predictions. What you care about is the weights between the input layer and the hidden layer — the big grid of numbers labeled W (size $V×N$).

> **Why this is useful**
- The hidden layer has only **N** slots, and **N is much smaller than V**. So a word that started as a giant list of 10,000 numbers (mostly zeros, not useful) becomes a compact list)
- This is called a **Distributed Representation** — the meaning of the word is spread across all N numbers instead of sitting in one slot.
- Crucially, these compact vectors **capture relationships between words**. Words with similar meanings end up with similar vectors, so the computer can now "see" that _cat_ and _dog_ are more alike than _cat_ and _car_.

#### 2.2 the training
##### Setup
- Vocabulary of **V** words; hidden size **N** (N ≪ V).
- Two weight matrices to train:
    - **W** (V×N): input → hidden. One row per word. _These rows become the final word vectors._
    - **W'** (N×V): hidden → output.
- Training data = (center word → neighbor word) pairs, built by sliding a window over text.

##### The 6 Steps (one training pair: `cat → sat`)
**1. Input → hidden (lookup)** Input one-hot for `cat` × W just selects cat's row → `h`. `h` is the network's current vector for cat.
**2. Hidden → output (scores)** `h × W'` → one raw score for every word in the vocabulary.
**3. Softmax → probabilities** Turn scores into probabilities that sum to 1. = "given _cat_, how likely is each word to be its neighbor?"
**4. Loss = cross-entropy**
```
Loss = −log(probability given to the correct word)
```
- Correct word probability near 1 → loss ≈ 0 (nothing to fix).
- Lower probability on correct word → bigger loss.
**5. Error signal**
```
error = predicted probability − target
```
target = 1 for correct word, 0 for all others.
- Negative error on correct word → "raise it."
- Positive error on others → "lower them."

**6. Update weights (gradient descent)** Nudge W and W' a tiny bit (learning rate η) to shrink the loss.
- Only the **input word's row of W** changes.
- W' columns shift so the correct word's score rises next time.
```
for each (word, neighbor) pair in corpus:
    h      = row of W for input word        # lookup
    scores = h × W'
    probs  = softmax(scores)
    loss   = −log(prob of correct neighbor)
    error  = probs − target
    update W and W' to reduce loss
repeat over millions of pairs until loss stops improving
```

#### 2.3 两种flavor
- CBOW：通过上下文词预测中心词。其中CBOW如下图左部分所示，使用围绕目标单词的其他单词（语境）作为输入，在映射层做加权处理后输出目标单词。
- Skip-gram：通过中心词预测上下文词。**Skip-gram根据当前单词预测语境**，如下图右部分所示。
![[Pasted image 20260819175756.png|381]]


### 3. LLM words embedding
#### The core contrast with Word2Vec
**Word2Vec** (what you just learned): the embeddings were the _whole goal_. You set up a special task (predict a word's neighbors), trained a small network, then extracted matrix **W** as your word vectors. The embedding was the product.

**LLMs:** the embedding is not a separate project. It's just the **first layer** of one giant model (the Transformer in the picture), and it's trained **together with everything else, all at once.** The embedding is a byproduct of training the whole model to do its real job (predicting the next token).

- **词嵌入层（wte**）：将离散的子词ID映射到连续向量。
```Python
self.wte = nn.Embedding(config.vocab_size, self.embed_dim)
```

`nn.Embedding` here is just a **lookup table** — a big matrix with one row per token in the vocabulary, exactly like Word2Vec's **W**.
- Input: a **token id** (a number, e.g. token 4521 = "cat").
- Operation: go to **row 4521** of the table → that row is the word's vector.

### Reference

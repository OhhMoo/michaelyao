2026-08-19, 16:40
Tags: [[llm]] [[ML]]

#### 1. 定义
定义：**Tokenization是将一个整体（例如词、短语、句子、段落甚至语音、图像）分割成较小单位（被称为token）的过程。**
- 英语自然的会将空格作为分割的标准，但中文没有
- *eg，“中华人民共和国”在某些任务中会被当作一个整体词语，而在另一些任务中则被拆解为“中华”、“人民”、“共和国”三个词。不同机构、不同领域对“词”的定义不一致，造成训练数据和测试数据之间存在偏差，影响模型泛化能力。*

> OOV --> out of vocabulary: 指的是词典中未收录的新词或罕见词，例如网络热词“内卷”、“躺平”，或中英文混杂如“ChatGPT模型”。

#### 2. 视角
1. word-based tokenization 
词级Tokenizer将文本拆分为独立的词语，是最自然的语言单元。对于英语等有空格或标点符号作为天然分隔符的语言，词级分词相对容易实现。
2. character-based tokenization
字符级Tokenization将文本拆分为单个字符，是最基本的拆分单元。对于英语，每个字母或标点符号都是独立的字符；对于中文，每个汉字也是一个字符。
3. subwords tokenization （可以看作是两者之间）:
   - BPE (byte par encoding)
   - wordpiece
   - unigram

>Key: LLM使用subword tokenization

#### 3. 基于词典的规则匹配算法 （word-based)
1. Forward maximum matching, FMM
```Python
def forward_max_matching(sentence, dictionary, max_len=6):
    result = []
    i = 0
    while i < len(sentence):
        matched = False
        for j in range(max_len, 0, -1):
            if i + j > len(sentence):
                continue
            word = sentence[i:i+j]
            if word in dictionary:
                result.append(word)
                i += j
                matched = True
                break
        if not matched:
            result.append(sentence[i])
            i += 1
    return result

# 示例词典
dictionary = {'商务处', '女干事', '商务', '处女', '干事'}

# 示例句子
sentence = "商务处女干事"

# 分词
print('/'.join(forward_max_matching(sentence, dictionary)))
# 输出: 商务处/女干事
```

2. Backward max matching (BMM)
```Python
def backward_max_matching(sentence, dictionary, max_len=6):
    result = []
    i = len(sentence)
    while i > 0:
        matched = False
        for j in range(max_len, 0, -1):
            if i - j < 0:
                continue
            word = sentence[i-j:i]
            if word in dictionary:
                result.insert(0, word)
                i -= j
                matched = True
                break
        if not matched:
            result.insert(0, sentence[i-1])
            i -= 1
    return result

# 示例词典
dictionary = {'商务处', '女干事', '商务', '处女', '干事'}

# 示例句子
sentence = "商务处女干事"

# 分词
print('/'.join(backward_max_matching(sentence, dictionary)))
# 输出: 商务处/女干事
```

You can also apply these two method at the same time, and compare their result (which is bidirectional matching)

#### 4. BPE (byte-pair encoding)
![[Pasted image 20260819165945.png]]

```Python
def BPE():
    while len(vocab) < target_vocab_size:
            # 统计新词表导致的bigram频率
        bigram_frequency = get_freq(word_freq)
            # 找到频率最大的bigram
        best_bigram = argmax(bigram_frequency)
            # 新词为频率最大的bigram的连接
        new_unigram = ''.join(best_bigram)
            # 对词频表中每个词更新其切词方案(合并best bigram)
        word_freq = merge_bigram(best_bigram, new_unigram, word_freq)
            #添加合并规则、添加新词
        merge_rule.append( {best_bigram ->new_unigram})
        vocab.append(new_unigram)
        
def get_freq(word_freq):
    bigram_frequency = {}
    # 对于word_freq中每个词word和对应的频率freq
    for word, freq in word_freq.items():
        #将word按当前切词方案切开
        unigrams = word.split("/"):
        for unigram in unigrams:
            # 统计bigram频率
            bigram_frequence[(unigram, next_unigram)] += freq
    return bigram_frequency

def merge_bigram(best_bigram, new_unigram, word_freq):
    # 对于带切词信息的词频表word_freq中的每个词
    for word in word_freq:
        # 如果里面有best_bigram, 合成 new_unigram
        word.substitude(best_bigram, new_unigram)
    return word_freq
```
BPE keep merging until the vocabulary reaches a target size
**eg.** 
Suppose your corpus reduces to this word-frequency table, each word pre-split into characters:
```
l/o/w       : 5
l/o/w/e/r    : 2
n/e/w/e/s/t  : 6
w/i/d/e/s/t  : 3
```
Count bigrams weighted by frequency. The pair `(e, s)` appears in `newest` (6) and `widest` (3) → count 9. The pair `(s, t)` similarly → 9. Say `(e, s)` wins. Merge it:
```
n/e/w/es/t   : 6
w/i/d/es/t   : 3
```
New token `es` joins the vocab, and `(e,s) -> es` joins the merge rules. Next round, `(es, t)` now scores 9 and gets merged into `est`, and so on. Frequent chunks like `est`, `low`, `new` progressively coalesce into single tokens.

> Key Definition here --> Unigram and Bigram
##### Unigram = one current token
A **unigram** is a single unit in the current segmentation of a word. What counts as "one unit" changes over time:
- **At the start**, every unigram is a single character. The word `low` is `l / o / w` → three unigrams.
- **After some merges**, a unigram can be a multi-character chunk. Once `es` and `est` have been learned, `newest` might be `n / e / w / est` → four unigrams, one of which (`est`) is three characters long.
##### Bigram=two adjacent unigrams
A **bigram** is a _pair of neighboring unigrams_ in that split. For `n / e / w / est`, the bigrams are:
```
(n, e)   (e, w)   (w, est)
```
These are exactly the merge candidates. BPE counts how often each such adjacent pair occurs across the whole corpus, and the winner gets fused into a new single unigram. So the `(unigram, next_unigram)` tuple in `get_freq` is one bigram, and its value is how often that pair sits side by side.

另一个重点是BPE是通过merge_rule 进行合并
eg.
To tokenize a brand-new word, say `lowest`, you don't look anything up. You **replay the recipe** from the beginning:

```
Start (split to chars):   l o w e s t
Apply Rule 1 (e,s→es):    l o w es t
Apply Rule 2 (es,t→est):  l o w est
Apply Rule 3 (l,o→lo):    lo w est
Apply Rule 4 (lo,w→low):  low est
(no more rules apply)
Result:  low / est
```

You walked through your list of rules top to bottom, applying each one wherever it fits. The final leftover pieces are your tokens. **That** is what "BPE applies merge rules" means, it re-runs the merge history on the new word.

`GPT2 tokenizer
```Python
def bpe(self, token):
    if token in self.cache:
        return self.cache[token]
    
    word = tuple(token)                # (t, h, i, s, ...)
    pairs = get_pairs(word)            # {(t,h), (h,i), (i,s)}

    if not pairs:
        return token
    
    while True:
        # 1. 在所有当前 pairs 里，找到在 self.bpe_ranks 中 rank 最小（=优先级最高）的那对 bigram
        bigram = min(pairs, key=lambda pair: self.bpe_ranks.get(pair, float("inf")))
        
        # 如果这个 bigram (对) 不在 bpe_ranks 里，就说明后续都无法合并了，break
        if bigram not in self.bpe_ranks:
            break
        
        # 2. 在 word 里把这个 bigram 合并成一个新符号
        first, second = bigram
        new_word = []
        i = 0
        while i < len(word):
            try:
                j = word.index(first, i)
            except ValueError:
                # 找不到 first, 直接把后续都 append 到 new_word
                new_word.extend(word[i:])
                break
            else:
                new_word.extend(word[i:j])
                i = j
            
            if word[i] == first and i < len(word) - 1 and word[i+1] == second:
                # 发现相邻 (first, second), 合并为 first+second
                new_word.append(first + second)
                i += 2
            else:
                new_word.append(word[i])
                i += 1
        
        # word 替换为合并后的 new_word
        word = tuple(new_word)
        
        # 若只剩1个符号，没法再合并了
        if len(word) == 1:
            break
        else:
            pairs = get_pairs(word)
    
    # 最终, word 可能会变成多个 subword
    word = " ".join(word)
    self.cache[token] = word
    return word
```


#### 5. WordPiece
![[Pasted image 20260819171504.png]]
PMI asks _"do A and B appear together **more than you'd expect by chance**, given how common each is on its own?"_

```Python
while len(vocab) < target_vocab_size:
        # 统计新词表导致的bigram频率
    bigram_score = get_pmi(word_freq)
        # 找到频率最大的bigram
    best_bigram = argmax(bigram_score)
        # 新词为频率最大的bigram的连接
    new_unigram = ''.join(best_bigram)
        # 对词频表中每个词应用best bigram的合并
    word_freq = merge_bigram(best_bigram, new_unigram, word_freq)
        #添加合并规则、添加新词
    merge_rule.append( {best_bigram ->new_unigram})
    vocab.append(new_unigram)
```

So for WordPiece, it is using Forward max merge instead of merge rule.
The key is that BPE and WordPiece **learn different artifacts**, even though their training loops look almost identical (both greedily merge pairs).
- **BPE** learns an **ordered list of merge rules**: `(a,b)→ab`, `(c,d)→cd`, ... in the exact sequence they were discovered.
- **WordPiece** learns essentially just a **vocabulary** of subwords. It throws away the ordering; what it keeps is the _set_ of valid tokens.

#### 6. Unigram
![[Pasted image 20260819173032.png]]
**`-log P(s)`** — the sentence's cost is the negative log-probability of the whole sentence. Lower probability → higher cost.

So a token that's common (high `P(xᵢ)`) is "cheap," and rare tokens are "expensive." A good segmentation is one that explains the sentence using cheap, high-probability tokens.



### Reference
https://ucn8vyyo6tb0.feishu.cn/wiki/Vnb7w1AGuiE126kOKnLcfTLznWg

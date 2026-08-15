import Image from "next/image";

import { FadeIn } from "../FadeIn";
import styles from "./AboutImpact.module.css";

type ImpactItem = {
  index: string;
  project: string;
  title: string;
  context: string;
  comparison: string;
  result: string;
  percent: string;
  barClass: string;
};

const IMPACT_ITEMS: readonly ImpactItem[] = [
  {
    index: "01",
    project: "Alkera AI",
    title: "Data-agent task success",
    context: "GRPO policy optimization across verifiable spreadsheet workflows",
    comparison: "10.5% → 46.2%",
    result: "4.4× higher",
    percent: "+340% improvement",
    barClass: styles.barAlkera,
  },
  {
    index: "02",
    project: "LangAlpha",
    title: "Agent context overhead",
    context: "Tool schemas compacted per LLM call; interaction latency also fell 140 ms → 40 ms",
    comparison: "10k tokens → ~300 tokens",
    result: "33× less",
    percent: "97% reduction",
    barClass: styles.barLangAlpha,
  },
  {
    index: "03",
    project: "SPEQTRO",
    title: "Chemical-space exploration speed",
    context: "Cross-modal candidate search across NMR, IR, and MS evidence",
    comparison: "2.6 min → 40 sec",
    result: "3.9× faster",
    percent: "74.4% less time",
    barClass: styles.barSpeqtro,
  },
  {
    index: "04",
    project: "Water · unsupervised ML",
    title: "Ambiguous structural noise removed",
    context: "Density denoising before the two-component mixture classifier",
    comparison: "raw population → denoised population",
    result: "23% removed",
    percent: "23% noise reduction",
    barClass: styles.barWater,
  },
  {
    index: "05",
    project: "Chem-ICL · Ersilia",
    title: "TabPFN performance over Random Forest",
    context: "Molecular-property prediction from a small labelled context",
    comparison: "TabPFN → RF baseline",
    result: "+9.8%",
    percent: "9.8% improvement",
    barClass: styles.barErsilia,
  },
] as const;

export function AboutImpact() {
  return (
    <section className={styles.section} aria-labelledby="impact-heading">
      <FadeIn className={styles.reveal}>
        <header className="section-header">
          <h2 className="section-header-label" id="impact-heading">Impact</h2>
        </header>
      </FadeIn>

      <div className={styles.content}>
        <div className={styles.chart}>
          <div className={styles.scale} aria-hidden="true">
            <span>0%</span>
            <span>85%</span>
            <span>170%</span>
            <span>255%</span>
            <span>340%</span>
          </div>

          {IMPACT_ITEMS.map((item) => (
            <FadeIn className={styles.rowReveal} key={item.index}>
              <article className={styles.row}>
                <span className={styles.index}>{item.index}</span>
                <div className={styles.copy}>
                  <p className={styles.project}>{item.project}</p>
                  <h3>{item.title}</h3>
                  <p className={styles.context}>{item.context}</p>
                </div>

                <div
                  className={styles.plot}
                  role="img"
                  aria-label={`${item.project}: ${item.percent}`}
                >
                  <div className={styles.track}>
                    <span className={`${styles.bar} ${item.barClass}`} />
                  </div>
                  <span className={styles.percent}>{item.percent}</span>
                </div>

                <div className={styles.outcome}>
                  <strong>{item.result}</strong>
                  <span>{item.comparison}</span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className={styles.figureReveal}>
          <figure className={styles.figure}>
            <Image
              src="/images/illustrations/impact-walker.png"
              alt="Illustration of Michael walking forward beside the impact chart"
              width={569}
              height={759}
              sizes="(max-width: 700px) 120px, 180px"
            />
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}

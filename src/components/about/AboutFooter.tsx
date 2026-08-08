import Link from "next/link";

export function AboutFooter() {
  return (
    <section className="foot" id="foot">
      <div className="foot-center">
        <Link href="/">Academic</Link>
        <Link href="/about">About</Link>
      </div>
    </section>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <section className="foot" id="foot">
      <div className="foot-center">
        <Link href="/works">Work</Link>
        <Link href="/about">About</Link>
      </div>
    </section>
  );
}

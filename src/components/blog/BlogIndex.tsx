import Link from "next/link";

import { posts } from "@/data/blog";

import { Divider, Memo } from "./Memo";
import { pad } from "./format";

export function BlogIndex() {
  return (
    <Memo labelledBy="blog-title">
      <div className="l notice">
        <h1 className="hero-title" id="blog-title">
          Blog
        </h1>
      </div>
      <div className="l" />
      <div className="l notice">
        <span>Research notes, with live exhibits that run in your browser.</span>
      </div>
      <div className="l" />
      <div className="l" />
      <div className="l c gap">
        <span>INDEX</span>
      </div>
      <div className="l tx narrow">
        <span>POST</span>
        <span className="dt">DATE</span>
      </div>
      {posts.map((post, i) => (
        <div className="l tx narrow idx" key={post.slug}>
          <span>
            {pad(i + 1, 2)}{" "}
            <Link href={`/blog/${post.slug}`}>
              {post.title}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </Link>
            <span className="dt-m">{post.date}</span>
          </span>
          <span className="dt">{post.date}</span>
        </div>
      ))}
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c">
        <span>*** END OF INDEX ***</span>
      </div>
    </Memo>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <h1>Strapi Media Site</h1>
        <nav>
          <Link href="/blog">Blog</Link> | <Link href="/case-studies">Case Studies</Link> | <Link href="/resources">Resources</Link>
        </nav>
      </header>
      {children}
      <footer>Footer</footer>
    </div>
  );
}

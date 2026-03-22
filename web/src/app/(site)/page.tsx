import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <ul>
        <li><Link href="/blog">ブログ</Link></li>
        <li><Link href="/case-studies">導入事例</Link></li>
        <li><Link href="/resources">資料</Link></li>
      </ul>
    </main>
  );
}

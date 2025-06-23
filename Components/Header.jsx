// Components/Header.jsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 shadow-md flex gap-4">
      <Link href="/galerij">Galerij</Link>
      <Link href="/vind-ik-leuk">Vind ik leuk</Link>
    </header>
  );
}

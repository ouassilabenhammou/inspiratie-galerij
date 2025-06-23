import React from "react";
import Link from "next/link";
import next from "next";

export default function Header() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/galerij">Galerij</Link>
      <Link href="/login">Login</Link>
      <Link href="/vind-ik-leuk">Vind ik leuk</Link>
    </div>
  );
}

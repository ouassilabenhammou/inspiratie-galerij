// app/login/page.jsx
"use client";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [fout, setFout] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, wachtwoord);
      router.push("/galerij");
    } catch (err) {
      setFout("Login mislukt. Controleer je gegevens.");
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔐 Inloggen</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={wachtwoord}
          onChange={(e) => setWachtwoord(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        {fout && <p className="text-red-500">{fout}</p>}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Inloggen
        </button>
      </form>
    </main>
  );
}

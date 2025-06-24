"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Sluit dropdown bij klikken buiten menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("likedPhotos"); // Likes verwijderen
      window.dispatchEvent(new Event("likedPhotosChanged")); // Event dispatchen
      setDropdownOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Uitloggen mislukt:", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold">
        📸 Inspiratie Galerij
      </Link>

      <nav className="flex items-center gap-4 relative">
        <Link href="/galerij" className="hover:underline">
          Galerij
        </Link>
        <Link href="/vind-ik-leuk" className="hover:underline">
          Vind ik leuk
        </Link>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title={user.email}
              type="button"
            >
              {/* Simpel profiel icoon als SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A7.002 7.002 0 0112 15a7.002 7.002 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                <div className="px-4 py-2 text-gray-700 break-words text-sm">
                  {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  type="button"
                >
                  Uitloggen
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
          >
            Inloggen
          </Link>
        )}
      </nav>
    </header>
  );
}

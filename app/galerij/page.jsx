"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { getLikedPhotos, saveLikedPhotos } from "@/utils/localStorage";

export default function GalerijPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [likedPhotoIds, setLikedPhotoIds] = useState([]);
  const [query, setQuery] = useState("nature");
  const [search, setSearch] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        // Als uitgelogd, clear gelikete foto-IDs in state
        setLikedPhotoIds([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Likes laden uit localStorage via util
    setLikedPhotoIds(getLikedPhotos());
  }, []);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=30`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
          }
        );
        const data = await response.json();
        setPhotos(data.results);
      } catch (error) {
        console.error("Fout bij het ophalen van foto's:", error);
      }
    }
    fetchPhotos();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setQuery(search.trim());
    }
  };

  const toggleLike = (id) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    let updated;
    if (likedPhotoIds.includes(id)) {
      updated = likedPhotoIds.filter((pid) => pid !== id);
    } else {
      updated = [...likedPhotoIds, id];
    }
    setLikedPhotoIds(updated);
    saveLikedPhotos(updated);

    // Dispatch event voor synchronisatie in andere componenten/pagina's
    window.dispatchEvent(new Event("likedPhotosChanged"));
  };

  return (
    <>
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📸 Fotogalerij</h1>

        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op onderwerp (bijv. zonsondergang, bergen...)"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Zoek
          </button>
        </form>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative break-inside-avoid mb-4 rounded overflow-hidden bg-white shadow"
            >
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Foto"}
                className="w-full h-auto rounded object-cover"
              />
              <button
                onClick={() => toggleLike(photo.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer"
                aria-label={
                  likedPhotoIds.includes(photo.id)
                    ? "Verwijder uit favorieten"
                    : "Voeg toe aan favorieten"
                }
              >
                {likedPhotoIds.includes(photo.id) ? "❤️" : "🤍"}
              </button>
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm text-center shadow-lg">
            <p className="mb-4 text-lg font-semibold">
              Je moet ingelogd zijn om foto’s op te slaan.
            </p>
            <button
              onClick={() => {
                setShowLoginModal(false);
                router.push("/login");
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Inloggen
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 px-4 py-2 border rounded"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}
    </>
  );
}

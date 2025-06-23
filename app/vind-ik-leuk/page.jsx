// app/vind-ik-leuk/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function VindIkLeukPage() {
  const [photos, setPhotos] = useState([]);
  const [likedPhotoIds, setLikedPhotoIds] = useState([]);

  // Laad opgeslagen likes bij eerste render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    setLikedPhotoIds(stored);
  }, []);

  // Haal de foto-objecten op van de Unsplash API
  useEffect(() => {
    const fetchLikedPhotos = async () => {
      if (likedPhotoIds.length === 0) {
        setPhotos([]);
        return;
      }

      try {
        const fetches = likedPhotoIds.map((id) =>
          fetch(`https://api.unsplash.com/photos/${id}`, {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
          }).then((res) => res.json())
        );

        const results = await Promise.all(fetches);
        setPhotos(results);
      } catch (error) {
        console.error("Fout bij het ophalen van gelikete foto's:", error);
      }
    };

    fetchLikedPhotos();
  }, [likedPhotoIds]);

  // Verwijder foto uit lijst
  const removeLike = (id) => {
    const updated = likedPhotoIds.filter((pid) => pid !== id);
    setLikedPhotoIds(updated);
    localStorage.setItem("likedPhotos", JSON.stringify(updated));
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">❤️ Vind ik leuk</h1>

      {photos.length === 0 ? (
        <p>Je hebt nog geen foto's geliket.</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative break-inside-avoid">
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className="w-full h-auto rounded object-cover"
              />
              <button
                onClick={() => removeLike(photo.id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

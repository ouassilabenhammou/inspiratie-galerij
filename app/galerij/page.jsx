"use client";
import { useEffect, useState } from "react";

export default function GalerijPage() {
  const [photos, setPhotos] = useState([]);
  const [likedPhotoIds, setLikedPhotoIds] = useState([]);
  const [query, setQuery] = useState("nature");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    setLikedPhotoIds(stored);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
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
    };

    fetchPhotos();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setQuery(search.trim());
    }
  };

  const toggleLike = (id) => {
    let updated;
    if (likedPhotoIds.includes(id)) {
      updated = likedPhotoIds.filter((pid) => pid !== id);
    } else {
      updated = [...likedPhotoIds, id];
    }
    setLikedPhotoIds(updated);
    localStorage.setItem("likedPhotos", JSON.stringify(updated));
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📸 Fotogalerij</h1>

      {/* Zoekbalk */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Zoek op onderwerp (bijv. zonsondergang, bergen...)"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Zoek
        </button>
      </form>

      {/* Fotorooster */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative break-inside-avoid">
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className="w-full h-auto rounded object-cover"
            />
            <button
              onClick={() => toggleLike(photo.id)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
            >
              {likedPhotoIds.includes(photo.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

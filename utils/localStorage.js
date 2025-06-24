const STORAGE_KEY = "likedPhotos";

export function getLikedPhotos() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveLikedPhotos(photos) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function clearLikedPhotos() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

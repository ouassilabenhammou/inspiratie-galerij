# Inspiration Gallery

**Inspiration Gallery** is a modern web application built with Next.js that allows users to browse high-quality images, filter them by themes, and save their favorites to a personal "Liked" page. The application includes user authentication to provide a personalized experience.

## Features

- Theme-based filtering (e.g., nature, people, city)
- Like functionality to save favorite images
- Dedicated "Liked" page for stored selections
- User authentication via email, Google, or Apple
- Image content fetched dynamically from the Unsplash API
- Clean, responsive user interface styled with Tailwind CSS

## Technologies Used

- Next.js (App Router structure)
- React
- Tailwind CSS
- Unsplash API
- Firebase or Supabase for authentication
- LocalStorage for saving likes locally

## Folder Structure

```
app/
├─ api/                  // API routes for Unsplash or authentication
├─ liked/                // Page displaying liked images
├─ login/                // Login page
├─ gallery/              // Main gallery view
├─ layout.tsx            // Global app layout
├─ globals.css           // Global styles
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ouassilabenhammou/inspiratie-galerij.git
   cd inspiratie-galerij
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your environment variables:

   ```env
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Possible Improvements

- Add image upload functionality for users
- Store liked images in Firebase instead of LocalStorage
- Enhance responsive design for various devices
- Implement support for multiple languages

## License

This project is licensed under the MIT License. You are free to use and adapt it for educational or personal use.

---

Laat me weten als je nog iets wilt toevoegen zoals een afbeelding van de interface of een "About Me"-stukje onderaan.

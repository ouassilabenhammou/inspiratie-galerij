// app/api/fotos/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "nature";

  const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data.results), {
    headers: { "Content-Type": "application/json" },
  });
}

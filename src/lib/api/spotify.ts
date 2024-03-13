import { SearchResult } from "@/interfaces/searchResult";

export async function getTracks(query: string) {
  const token = localStorage.getItem("spotifyToken") ?? ""

  const response = await fetch(`https://api.spotify.com/v1/search?q=${query.toLowerCase()}&type=track&limit=10&include_external=audio`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao obter detalhes da música: ${response.statusText}`);
  }

  const data = await response.json()

  const result: SearchResult[] = data.tracks.items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      image: item.album?.images[2].url ?? "",
      description: item.album?.artists[0].name ?? ""
    }
  })

  return result
}
import { SearchResultSchemaType } from "@/schemas/searchResult";
import { TokenProps } from "@/interfaces/spotify";

export async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
      client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter token de acesso: ${response.statusText}`);
  }

  const token: TokenProps = await response.json();

  localStorage.setItem("spotifyToken", token.access_token)

  return token
};

export async function getTracks(query: string) {
  const token = localStorage.getItem("spotifyToken") ?? await getToken()

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

  const results: SearchResultSchemaType[] = data.tracks.items.map((item: any) => {
    return {
      name: item.name,
      image: item.album?.images[0].url ?? "",
      description: item.album?.artists[0].name ?? ""
    }
  })

  return results
}
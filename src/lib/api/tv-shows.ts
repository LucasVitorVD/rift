import { SearchResultSchemaType } from "@/schemas/searchResult"

export async function getShows(title: string) {
  const read_access_token = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN

  const mediaTypeMap = {
    movie: "Filme",
    tv: "Série"
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&language=pt-BR`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${read_access_token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao obter filmes/séries.`);
    }

    const data = await response.json()

    const results: SearchResultSchemaType[] = data.results.map((show: any) => {
      return {
        name: show.original_title,
        image: `https://image.tmdb.org/t/p/w780${show.poster_path}` ?? "",
        description: mediaTypeMap[show.media_type as keyof typeof mediaTypeMap] ?? ""
      }
    })

    return results
  } catch (error) {
    throw new Error("Erro ao obter filmes/séries.")
  }
}
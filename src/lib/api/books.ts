import { SearchResultSchemaType } from "@/schemas/searchResult"

export async function getBooks(title: string) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${title}&limit=10&fields=title_suggest,cover_edition_key,author_name`)

    if (!response.ok) {
      throw new Error(`Erro ao obter livros.`);
    }
    
    const data = await response.json()

    const results: SearchResultSchemaType[] = data.docs.map((book: any) => {
      return {
        name: book.title_suggest,
        image: `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` ?? "",
        description: book.author_name[0] ?? ""
      }
    })

    return results
  } catch (error) {
    throw new Error("Erro ao obter livros.")
  }
}
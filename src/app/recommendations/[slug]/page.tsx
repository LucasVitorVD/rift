import AllRecommendationsList from "@/components/recommendation-list/AllRecommendationsList"
import { Category } from "@/schemas/form"

interface Props {
  params: { slug: string}
}

const slugMap: { [slug: string]: string } = {
  "books": "livro",
  "songs": "música",
  "tv": "filme/série"
}

export default function AllRecommendations({ params }: Props) {
  const { slug } = params
  
  const category = slugMap[slug] as Category

  return (
    <section className="flex items-center justify-center flex-1 container py-6">
      <AllRecommendationsList category={category} />
    </section>
  )
}
import AllRecommendationsList from "@/components/recommendation-list/AllRecommendationsList"
import { Category } from "@/schemas/form"

interface Props {
  params: { slug: string}
}

const slugMap = {
  "books": "livro",
  "songs": "música",
  "tv": "filme/série"
}

export default function AllRecommendations({ params }: Props) {
  const { slug } = params
  
  const category = slugMap[slug as keyof typeof slugMap] as Category

  return (
    <section className="container py-6">
      <AllRecommendationsList category={category} />
    </section>
  )
}
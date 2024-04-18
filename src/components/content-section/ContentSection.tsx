import { Category } from "@/schemas/form";
import InitialRecommendationsList from "../recommendation-list/InitialRecommendationsList";

interface ContentSectionProps extends React.ComponentProps<"section"> {
  title: string;
  description: string;
  category: Category;
}

export default async function ContentSection({
  title,
  description,
  category,
  ...props
}: ContentSectionProps) {
  return (
    <section
      className="container py-20 space-y-10 border-b-2 border-b-slate-200"
      {...props}
    >
      <div className="space-y-6">
        <div className="w-14 h-1 bg-primary" />
        <h2 className="text-2xl font-bold md:text-5xl">{title}</h2>
        <p className="text-sm font-medium">{description}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:justify-normal">
        <InitialRecommendationsList category={category} sectionId={props.id ?? ""} />
      </div>
    </section>
  );
}

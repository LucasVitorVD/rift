import ProfileHeader from "@/components/profile-header/ProfileHeader";
import RecommendationDialog from "@/components/recomendation-dialog/RecomendationDialog";
import Filters from "@/components/filters/Filters";
import UserRecommendationsList from "@/components/recommendation-list/UserRecommendationsList";

export default function ProfilePage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  return (
    <section className="container pt-6 pb-12 space-y-10">
      <ProfileHeader />

      <div className="flex justify-center md:justify-end">
        {/* <Filters /> */}
        <RecommendationDialog />
      </div>

      <hr />

      <UserRecommendationsList filter={searchParams?.search} />
    </section>
  );
}
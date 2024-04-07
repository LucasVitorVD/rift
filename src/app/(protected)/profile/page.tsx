import ProfileHeader from "@/components/profile-header/ProfileHeader";
import RecommendationDialog from "@/components/recomendation-dialog/RecomendationDialog";
import Filters from "@/components/filters/Filters";
import UserRecommendationsList from "@/components/recommendation-list/UserRecommendationsList";

export default function ProfilePage() {
  return (
    <section className="container pt-6 space-y-10">
      <ProfileHeader />

      <div className="flex items-center justify-between flex-wrap gap-8">
        <Filters />
        <RecommendationDialog />
      </div>

      <hr />

      <UserRecommendationsList />
    </section>
  );
}
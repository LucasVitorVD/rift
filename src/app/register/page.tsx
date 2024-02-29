import FormTabs from "@/components/form-tabs/FormTabs";
import Loader from "@/components/loader/Loader";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <section className="flex items-center justify-center h-screen bg-primary">
      <div className="flex justify-center absolute w-5/6 pb-10 bg-white rounded-md shadow-md z-10 overflow-hidden md:w-[530px]">
        <Suspense fallback={<Loader />}>
          <FormTabs />
        </Suspense>
      </div>

      <video
        autoPlay
        muted
        loop
        preload="none"
        className="w-full h-full object-cover"
        src="/backgroundVideo.mp4"
        role="video"
      >
        <source src="/backgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

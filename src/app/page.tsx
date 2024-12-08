import bg from "@/../../public/bg.jpg";
import dynamic from "next/dynamic";
import NextBgImage from "next-bg-image";
import Deals, { DealsPreloader } from "./Deals";
import { Suspense } from "react";
import { MainPageFormLoader } from "@/app/MainPageForm";

// so that browser api like window can be safely used https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
const MainPageForm = dynamic(() => import("@/app/MainPageForm"), {
  ssr: false,
  loading: () => <MainPageFormLoader />,
});

export default function Home() {
  return (
    <NextBgImage
      src={[
        "linear-gradient(to bottom, rgba(255,255,255,1) 0, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 100%)",
        bg,
      ]}
      height={bg.height}
      width={bg.width}
      lazyLoad
      size={{
        base: "cover",
      }}
      position={{
        base: "center bottom",
      }}
    >
      <div className="min-h-[calc(100vh-90px)] flex flex-col py-16 px-60">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Find your apartment with ease
        </h2>
        <article className="leading-7 mt-2 mb-8">
          Carefully selected SEO-wise commentary. This text is available for robots
        </article>
        <MainPageForm />
        <h4 className="scroll-m-20 text-xl font-bold my-4">Recommended:</h4>
        <Suspense fallback={<DealsPreloader take={3}/>}>
          <Deals delay={500} take={3}/>
        </Suspense>
      </div>
    </NextBgImage>
  );
}

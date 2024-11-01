import bg from "@/../../public/bg.jpg";
import dynamic from "next/dynamic";
import NextBgImage from "next-bg-image";

// so that browser api like window can be safely used https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
const MainPageForm = dynamic(() => import("@/app/MainPageForm"), {
  ssr: false,
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
      <div className="w-screen min-h-[calc(100vh-90px)] flex flex-col py-16 px-60">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Find your apartment with ease
        </h2>
        <article className="leading-7 mt-2 mb-8">
          Carefully selected SEO-wise commentary. This text is available for robots
        </article>
        <MainPageForm />
        <div className="flex flex-row w-full mt-8 justify-between">
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              10+
            </h3>
            <p>Years of experience</p>
          </div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              12+
            </h3>
            <p>Awards gained</p>
          </div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              7000+
            </h3>
            <p>Property ready</p>
          </div>
        </div>
      </div>
    </NextBgImage>
  );
}

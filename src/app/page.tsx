import bg from "../../public/bg.jpeg";
import MainPageForm from "@/components/MainPageForm/MainPageForm";

const bgStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,1) 0, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 100%), url(${bg.src})`,
  width: "100%",
  height: "100%",
  backgroundPosition: "center top",
  backgroundRepeat: "repeat-x",
  minHeight: "700px",
};

export default function Home() {
  return (
    <div
      className="w-screen min-h-[400px] flex flex-col py-16 px-60"
      style={bgStyle}
    >
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Find your apartment with ease
      </h2>
      <article className="leading-7 mt-2 mb-8">
        Carefully selected SEO-wise commentary
      </article>
      <MainPageForm />
      <div className="flex flex-row w-full mt-8 justify-between">
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">10+</h3>
          <p>Years of experience</p>
        </div>
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">12+</h3>
          <p>Awards gained</p>
        </div>
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">7000+</h3>
          <p>Property ready</p>
        </div>
      </div>
    </div>
  );
}

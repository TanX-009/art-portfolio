import Gallery from "@/components/Gallery";
import GradientTXT from "@/components/Heading/GradientTXT.component";

export default function Home() {
  return (
    <main className="mx-auto px-8 pt-10 max-w-screen-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {/* left container */}
        <div></div>

        {/* right container */}
        <div className="text-xl">
          <p>Hello, I&apos;m Tanmay.</p>
          <p>
            I&apos;m an <GradientTXT>artist.</GradientTXT>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* left container */}
        <div className="text-xl">
          <p>This is my personal</p>
          {/* gradient highlight */}
          <span className="text-3xl sm:text-5xl">
            <GradientTXT>art portfolio</GradientTXT>
          </span>
        </div>
        {/* right container */}
        <div></div>
      </div>

      <Gallery />
    </main>
  );
}

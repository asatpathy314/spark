import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-20 md:py-40 text-center">
      <div className="max-w-lg">
        <h1 className={title()}>
          Find a mentor at
		  <br/>
          <span className={title({ color: "cyan" })}>your dream college&nbsp;</span>
        </h1>
      </div>
      <p className={subtitle()+" max-w-md"}>
        "At Spark, we believe in the power of mentorship to transform lives. We're dedicated to bridging the gap between underprivileged students and the opportunities they deserve. Through personalized mentorship programs, we're sparking a brighter future for every young mind."
      </p>
      <div className="flex justify-center">
        <Button
          href="/register"
          as={Link}
          color="primary"
          size="lg"
          variant="solid"
        >
          Join Us
        </Button>
      </div>
    </section>
  );
}

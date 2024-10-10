import { getPost } from "@/lib/get-posts";
import getLinks from "@/lib/get-links";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import HomeAccordion from "@/app/components/home-accordion";
import CustomImage from "./components/custom-image";
import cover from "./opengraph-image.jpg";

export const dynamic = "force-static";

export default async function Home() {
  const links = getLinks();
  const post = await getPost();

  return (
    <div className="max-w-screen-sm mx-auto space-y-6">
      {post && (
        <Card fullWidth>
          <CardBody className="px-5">
            <p className="text-pretty">
              <span className="inline-block w-2 h-2 m-1 bg-primary rounded-full"></span>
              New writing:{" "}
              <Link href={post.slug.toString()} className="inline">
                <span className="font-greatVibes">{post.title.charAt(0)}</span>
                {post.title.slice(1)}
              </Link>
            </p>
          </CardBody>
        </Card>
      )}

      <Card>
        <CustomImage
          src={cover}
          alt="Beautiful view at Glacier national park that I took on my camera."
          className="absolute inset-0 object-cover w-full h-full"
          priority
          width={cover.width / 12}
          height={cover.height / 12}
        />
        <CardBody className="prose dark:prose-invert text-pretty backdrop-blur-md bg-background/50 rounded-lg px-3 py-8 sm:px-8 mx-2 my-6 sm:mx-6 w-auto">
          <p>
            Dearest web surfer, you&apos;ve come knocking on my digital door.
            Welcome. I built this website for you to enjoy if you will, and for
            myself to play with the latest web technologies. You can continue
            down to my links or see my writing archive by clicking{" "}
            <Link href="/writing">here</Link>.
          </p>
          <p>
            These days, my time is spent contirubting to the growth of Mach
            Industries, a defense tech company. However, I deeply appreciate
            time taken to think, create, and invite serendipity. It&apos;s why I
            built this site by hand, and painstakingly optimized it. So, spend
            as long as you wish on here, and if I may, I suggest you view my
            thoughts through a few lenses:
          </p>
          <ol>
            <li>
              My primary motivation is to work on things that are uncomfortably
              hard for my skillset.
            </li>
            <li>I view the world through rationality.</li>
            <li>
              Technology is engraved in who I am, I appreciate beautiful
              technology for its existence.
            </li>
          </ol>
        </CardBody>
      </Card>

      <HomeAccordion links={links} />
    </div>
  );
}

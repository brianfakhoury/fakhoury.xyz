import { getLinks, getPosts } from "@/lib";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import HomeAccordion from "@/components/HomeAccordion";

async function getLatestPost() {
  const posts = await getPosts();
  return posts.reduce((latest, post) =>
    new Date(post.date) > new Date(latest.date) ? post : latest
  );
}

export default async function Home() {
  const links = getLinks();
  const latestPost = await getLatestPost();

  return (
    <div className="max-w-screen-sm mx-auto space-y-6">
      {latestPost && (
        <Card isHoverable isPressable disableAnimation fullWidth>
          <CardBody className="px-5">
            <p className="text-pretty">
              <span className="inline-block w-2 h-2 m-1 bg-primary rounded-full"></span>
              New writing:{" "}
              <Link href={latestPost.slug.toString()} className="inline">
                <span className="font-greatVibes">
                  {latestPost.title.charAt(0)}
                </span>
                {latestPost.title.slice(1)}
              </Link>
            </p>
          </CardBody>
        </Card>
      )}

      <Card className="p-0 bg-primary">
        <CardBody className="py-6 px-4">
          <div className="prose dark:prose-invert text-pretty bg-background rounded-lg p-6">
            <p>
              👋🏼 Hey, thanks for coming here. Hopefully you can find something
              useful!
            </p>
            <p>
              You can continue down to my links or see my writing archive{" "}
              <Link href="/writing">here</Link>.
            </p>
            <p>My days are currently occupied working at Mach Industries.</p>
            <p>
              My primary motivation is a strong will to work with hard problems
              and use new technology. I&apos;m a student of first principles and
              rationality.
            </p>
          </div>
        </CardBody>
      </Card>

      <HomeAccordion links={links} />
    </div>
  );
}

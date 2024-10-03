// app/writing/[tag]/metadata.ts
export async function generateMetadata({ params }) {
    const tag = params.tag;
  
    return {
      title: `Writing - ${tag}`,
      description: `Essays tagged with ${tag}`,
      openGraph: {
        title: `Writing - ${tag}`,
        description: `Catalog of essays tagged with ${tag}`,
      },
    };
  }
  
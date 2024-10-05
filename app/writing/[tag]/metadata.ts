interface MetadataProps {
  params: { tag: string };
} 

export async function generateMetadata({ params }: MetadataProps) {
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
  
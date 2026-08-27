import { builder } from '@builder.io/sdk';
import { MortgageBankerContent } from '@/components/MortgageBankerContent';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BankerPageParams {
  params: Promise<{ slug: string[] }>;
}

function getSlugFromParams(slug: string[] | undefined) {
  return slug?.[slug.length - 1] || '';
}

export async function generateMetadata({ params }: BankerPageParams) {
  const { slug } = await params;
  const bankerSlug = getSlugFromParams(slug);

  const content = await builder
    .get('mortgage-banker-data', {
      query: { 'data.slug': bankerSlug },
    })
    .promise();

  if (!content) {
    return {};
  }

  const fullName: string = content.data?.fullName || '';

  return {
    title: fullName ? `${fullName} | Mortgage Banker | Atlantic Bay` : 'Mortgage Banker | Atlantic Bay',
  };
}

export default async function MortgageBankerPage({ params }: BankerPageParams) {
  const { slug } = await params;
  const bankerSlug = getSlugFromParams(slug);

  return <MortgageBankerContent slug={bankerSlug} />;
}

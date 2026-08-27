import { builder } from '@builder.io/sdk';
import { BlankPageContent } from '@/components/BlankPageContent';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const MODEL = 'mortgage-banker';

interface BlankPageParams {
  params: Promise<{ slug: string[] }>;
}

function getUrlPath(slug: string[] | undefined) {
  return `/pages/${(slug || []).join('/')}`;
}

export async function generateMetadata({ params }: BlankPageParams) {
  const { slug } = await params;
  const urlPath = getUrlPath(slug);

  const content = await builder
    .get(MODEL, {
      userAttributes: { urlPath },
    })
    .promise();

  if (!content) {
    return {};
  }

  return {
    title: content.data?.seoTitle || undefined,
    description: content.data?.seoDescription || undefined,
  };
}

export default async function BlankPage({ params }: BlankPageParams) {
  const { slug } = await params;
  const urlPath = getUrlPath(slug);

  return <BlankPageContent model={MODEL} urlPath={urlPath} />;
}

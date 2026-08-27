'use client';
import { ComponentProps, useEffect, useState } from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';

// Initialize Builder with your API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type BuilderProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderProps) {
  const isPreviewing = useIsPreviewing();

  if (!props.content && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <BuilderComponent {...props} />;
}

interface BuilderPageContentProps {
  urlPath: string;
}

export function BuilderPageContent({ urlPath }: BuilderPageContentProps) {
  const [builderContent, setBuilderContent] = useState(null);

  useEffect(() => {
    builder
      .get('page', {
        userAttributes: {
          urlPath,
        },
      })
      .promise()
      .then(setBuilderContent);
  }, [urlPath]);

  return builderContent ? <RenderBuilderContent content={builderContent} model="page" /> : null;
}

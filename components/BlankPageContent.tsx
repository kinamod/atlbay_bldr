'use client';
import '@/builder-registry';
import { useEffect, useState } from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlankPageContentProps {
  model: string;
  urlPath: string;
}

export function BlankPageContent({ model, urlPath }: BlankPageContentProps) {
  const [content, setContent] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    setLoaded(false);
    builder
      .get(model, {
        userAttributes: { urlPath },
      })
      .promise()
      .then((result) => {
        setContent(result);
        setLoaded(true);
      });
  }, [model, urlPath]);

  if (!loaded) {
    return null;
  }

  if (!content && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <BuilderComponent content={content} model={model} />;
}

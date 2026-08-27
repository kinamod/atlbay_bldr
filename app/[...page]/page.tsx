'use client';

import { BuilderPageContent } from '@/components/builder';
import '@/builder-registry';
import { useEffect, useState } from 'react';

interface PageParams {
  params: Promise<{
    page: string[];
  }>;
}

export default function Page({ params }: PageParams) {
  const [urlPath, setUrlPath] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      const path = resolvedParams?.page?.join('/') || '';
      setUrlPath('/' + path);
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-white">
      {urlPath && <BuilderPageContent urlPath={urlPath} />}
    </div>
  );
}

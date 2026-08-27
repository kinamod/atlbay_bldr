'use client';
import '@/builder-registry';
import { useEffect, useState } from 'react';
import { builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import MortgageBankerTemplate from '@/components/MortgageBankerTemplate';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface MortgageBankerContentProps {
  urlPath: string;
}

export function MortgageBankerContent({ urlPath }: MortgageBankerContentProps) {
  const [content, setContent] = useState<{ data?: Record<string, any> } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    setLoaded(false);
    builder
      .get('mortgage-banker', {
        userAttributes: { urlPath },
      })
      .promise()
      .then((result) => {
        setContent(result);
        setLoaded(true);
      });
  }, [urlPath]);

  if (!loaded) {
    return null;
  }

  if (!content && !isPreviewing) {
    return (
      <>
        <NavBar />
        <DefaultErrorPage statusCode={404} />
        <Footer />
      </>
    );
  }

  const data = content?.data || {};
  const licensedStates: string[] = (data.licensedStates || [])
    .map((entry: { state?: string }) => entry?.state)
    .filter(Boolean);
  const specialisms: string[] = (data.specialisms || [])
    .map((entry: { specialism?: string }) => entry?.specialism)
    .filter(Boolean);

  return (
    <>
      <NavBar />
      <MortgageBankerTemplate
        fullName={data.fullName}
        headshot={data.headshot}
        jobTitle={data.jobTitle}
        city={data.city}
        state={data.state}
        licensedStates={licensedStates}
        specialisms={specialisms}
        phone={data.phone}
        email={data.email}
        nmlsNumber={data.nmlsNumber}
        applyNowUrl={data.applyNowUrl}
        hablaEspanol={data.hablaEspanol}
        testimonialQuote={data.testimonialQuote}
        testimonialAuthor={data.testimonialAuthor}
        bio={data.bio}
      />
      <Footer />
    </>
  );
}

'use client';
import '@/builder-registry';
import { BuilderPageContent } from '@/components/builder';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <BuilderPageContent urlPath="/" />
      <Footer />
    </>
  );
}

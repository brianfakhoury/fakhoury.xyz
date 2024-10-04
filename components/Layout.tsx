import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="max-w-3xl mx-auto p-0">
        {children}
      </div>
      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import AIAssistantModal from '@/components/ai-assistant/AIAssistantModal';
import TerminalModal from '@/components/terminal/TerminalModal';
import CustomCursor from '@/components/animations/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amay Mishra | AI/ML Engineer · Full-Stack Developer · AI Agent Builder',
  description:
    'Interactive personal portfolio and engineering lab of Amay Mishra. Building production-grade AI agents, high-concurrency backend systems, RAG pipelines, and full-stack software products.',
  keywords: [
    'Amay Mishra',
    'AI Engineer',
    'ML Engineer',
    'Full-Stack Developer',
    'AI Agent Builder',
    'FastAPI',
    'Next.js',
    'Python',
    'RAG',
    'Computer Vision',
    'Indore'
  ],
  authors: [{ name: 'Amay Mishra', url: 'https://github.com/amaymishra1104' }],
  creator: 'Amay Mishra',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amaymishra.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amaymishra.dev',
    title: 'Amay Mishra | AI/ML Engineer · Full-Stack Developer · AI Agent Builder',
    description:
      'Explore production systems, interactive engineering labs, live GitHub metrics, and the AMAY AI assistant.',
    siteName: 'Amay Mishra Portfolio OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amay Mishra | AI/ML Engineer · Full-Stack Developer',
    description: 'Building intelligent systems that actually ship.',
    creator: '@amaymishra1104',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amay Mishra',
    jobTitle: 'AI/ML Engineer & Full-Stack Developer',
    url: 'https://amaymishra.dev',
    sameAs: ['https://github.com/amaymishra1104'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'India',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Acropolis Institute of Technology and Research (RGPV)',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Autonomous Agents',
      'Machine Learning',
      'FastAPI',
      'Next.js',
      'Computer Vision',
      'RAG',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <AIAssistantModal />
        <TerminalModal />
      </body>
    </html>
  );
}

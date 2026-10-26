import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amay Mishra | AI/ML Engineer · Software Engineer · RAG & Agentic AI Builder',
  description:
    'Portfolio of Amay Mishra. Final-year B.Tech CSIT student focused on end-to-end AI engineering, building retrieval-augmented and agentic AI systems from backend API design through model integration, evaluation and deployment.',
  keywords: [
    'Amay Mishra',
    'AI Engineer',
    'ML Engineer',
    'Software Engineer',
    'Agentic AI',
    'RAG',
    'LangGraph',
    'Next.js',
    'FastAPI',
    'Python',
    'pgvector',
    'Bengaluru',
  ],
  authors: [{ name: 'Amay Mishra', url: 'https://github.com/amaymishra1104' }],
  creator: 'Amay Mishra',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amaymishra.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amaymishra.dev',
    title: 'Amay Mishra | AI/ML Engineer · Software Engineer · RAG & Agentic AI Builder',
    description:
      'Explore production AI systems, agentic architectures, RAG pipelines, and full-stack software built by Amay Mishra.',
    siteName: 'Amay Mishra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amay Mishra | AI/ML Engineer · Software Engineer',
    description:
      'Building retrieval-augmented and agentic AI systems from backend API design through model integration, evaluation and deployment.',
  },
  icons: {
    icon: '/icon.svg',
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
    jobTitle: 'AI/ML Engineer & Software Engineer',
    url: 'https://amaymishra.dev',
    email: 'amaymishra1104@gmail.com',
    sameAs: [
      'https://github.com/amaymishra1104',
      'https://linkedin.com/in/amay-mishra-419766331',
      'https://kaggle.com/amaymishra11',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'India',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Acropolis Institute of Technology and Research',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhopal',
        addressCountry: 'India',
      },
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Agentic AI',
      'Retrieval-Augmented Generation (RAG)',
      'Machine Learning',
      'Large Language Models (LLMs)',
      'FastAPI',
      'Next.js',
      'Node.js',
      'pgvector',
      'Python',
      'TypeScript',
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans bg-page text-textMain antialiased flex flex-col selection:bg-sage/20 selection:text-textMain">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Victor Mulinge - Full Stack Developer | Flutter, Angular & React Expert",
  description: "Full Stack Developer with 4+ years crafting responsive mobile & web apps with Flutter, Angular, React & Spring Boot. Expert in full-stack development, UI/UX optimization, and RESTful APIs.",
  keywords: ["Full Stack Developer", "Flutter", "Spring Boot", "Angular", "React", "Dart", "TypeScript", "Mobile Development", "Web Development", "Kenya", "Cross-platform"],
  authors: [{ name: "Victor Mulinge" }],
  creator: "Victor Mulinge",
  publisher: "Victor Mulinge",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.vmulinge.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Victor Mulinge - Full Stack Developer",
    description: "Full Stack Developer with 4+ years crafting responsive mobile & web apps with Flutter, Angular, React & Spring Boot. Expert in full-stack development.",
    url: 'https://www.vmulinge.dev',
    siteName: 'Victor Mulinge Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Victor Mulinge - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Victor Mulinge - Full Stack Developer",
    description: "Full Stack Developer with 4+ years crafting responsive mobile & web apps with Flutter, Angular, React & Spring Boot.",
    creator: '@MunYeahOh',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Victor Mulinge',
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer with 4+ years crafting responsive mobile & web apps with Flutter, Angular, React & Spring Boot.',
    url: 'https://www.vmulinge.dev',
    email: 'munyaomulinge@protonmail.com',
    telephone: '+254722253660',
    sameAs: [
      'https://github.com/MunyaoMulinge',
      'https://linkedin.com/in/victormulinge',
      'https://twitter.com/MunYeahOh'
    ],
    knowsAbout: [
      'Flutter',
      'Dart',
      'Spring Boot',
      'Angular',
      'React',
      'TypeScript',
      'JavaScript',
      'PostgreSQL',
      'Firebase',
      'REST APIs',
      'Mobile Development',
      'Web Development'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Multimedia University of Kenya'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Tangazoletu Limited'
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('darkMode');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = savedTheme !== null ? savedTheme === 'true' : systemPrefersDark;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

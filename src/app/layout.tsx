import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Victor Mulinge - Full Stack Developer | Spring Boot & Angular Expert",
  description: "Experienced Full Stack Developer specializing in Spring Boot, Angular, React, PHP, and Flutter. 2+ years building modern web applications with MySQL databases. Available for hire.",
  keywords: ["Full Stack Developer", "Spring Boot", "Angular", "React", "PHP", "Flutter", "MySQL", "TypeScript", "Web Development", "Kenya"],
  authors: [{ name: "Victor Mulinge" }],
  creator: "Victor Mulinge",
  publisher: "Victor Mulinge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://victormulinge.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Victor Mulinge - Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in Spring Boot, Angular, React, PHP, and Flutter. Available for hire.",
    url: 'https://victormulinge.dev',
    siteName: 'Victor Mulinge Portfolio',
    images: [
      {
        url: '/og-image.jpg',
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
    description: "Experienced Full Stack Developer specializing in Spring Boot, Angular, React, PHP, and Flutter. Available for hire.",
    creator: '@MunYeahOh',
    images: ['/og-image.jpg'],
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
    description: 'Experienced Full Stack Developer specializing in Spring Boot, Angular, React, PHP, and Flutter.',
    url: 'https://victormulinge.dev',
    email: 'munyaomulinge@protonmail.com',
    telephone: '+254722253660',
    sameAs: [
      'https://github.com/MunyaoMulinge',
      'https://linkedin.com/in/victormulinge',
      'https://twitter.com/MunYeahOh'
    ],
    knowsAbout: [
      'Spring Boot',
      'Angular',
      'React',
      'PHP',
      'Flutter',
      'MySQL',
      'TypeScript',
      'JavaScript',
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}

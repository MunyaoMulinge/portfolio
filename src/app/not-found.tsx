export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="btn-primary inline-flex items-center gap-2">
        ← Go Home
      </a>
    </div>
  );
} 
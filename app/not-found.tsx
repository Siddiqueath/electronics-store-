import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
        <Zap size={36} className="text-blue-400" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white/80 mb-3">Page Not Found</h2>
      <p className="text-white/40 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-glow transition-all"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>
    </div>
  );
}

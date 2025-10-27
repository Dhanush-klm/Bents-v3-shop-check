import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="flex flex-col items-center gap-8 relative z-10 bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
          alt="Loft Logo"
          width={150}
          height={120}
          className="rounded-2xl shadow-lg"
        />
        <h1 className="text-6xl font-bold text-black text-center">
          Welcome to Email Backend
        </h1>
        
        <Link href="/send-email">
          <button className="mt-6 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            <Mail className="h-6 w-6" />
            Send Email
          </button>
        </Link>
      </div>
    </div>
  );
}

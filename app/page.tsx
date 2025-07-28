import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        <main className="flex flex-col gap-8 items-center w-full max-w-4xl">
          <div className="flex flex-col items-center gap-6 mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-NYLEum0BjNr1QNxE1HCgTvaqV84l0b.png"
              alt="Loft Logo"
              width={120}
              height={96}
              className="mb-4 rounded-2xl"
            />
            <h1 className="text-5xl font-bold text-black text-center">Loft Email Manager</h1>
            <p className="text-xl text-black text-center max-w-2xl">
              Powerful email automation platform. Send targeted campaigns, manage audiences, and engage with your users effectively.
            </p>
          </div>

          {/* Email Manager Card */}
          <Link href="/email-manager" className="w-full max-w-md">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-xl group-hover:bg-blue-700 transition-colors">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Email Manager</h2>
              </div>
              <p className="text-blue-700 leading-relaxed mb-4">
                Create and send email campaigns to your audiences. Choose from 17 pre-built templates and target specific user segments.
              </p>
              <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                Start Campaign →
              </div>
            </div>
          </Link>

          {/* Quick Stats */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Email Campaign Platform</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span>✅ 17 Email Templates</span>
              <span>✅ Audience Management</span>
              <span>✅ Campaign Analytics</span>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Loft • Streamline your email communications</p>
        </footer>
      </div>
    </div>
  );
}

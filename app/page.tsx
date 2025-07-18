import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <main className="flex flex-col gap-8 items-center w-full max-w-xl">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/file.svg"
            alt="App logo"
            width={64}
            height={64}
            className="mb-2"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">Welcome to Resend Clerk</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-md">
            Manage your users, emails, and authentication with ease.
          </p>
        </div>
      </main>
      <footer className="mt-16 text-gray-400 text-sm text-center w-full">
        &copy; {new Date().getFullYear()} Resend Clerk. All rights reserved.
      </footer>
    </div>
  );
}

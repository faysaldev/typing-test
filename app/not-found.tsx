import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#A8BBA3] to-[#BDE8F5] p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-[#A8BBA3] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, we couldn{`'`}t find the page you{`'`}re looking for.
        </p>
        <Link href="/" passHref>
          <Button className="bg-[#A8BBA3] hover:bg-[#8DA587] text-white cursor-pointer">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

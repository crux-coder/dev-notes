import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        AI Notetaker for Developers
      </p>
      <a
        href="/sign-up"
        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Get Started
      </a>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}

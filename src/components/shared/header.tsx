import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto px-8 h-16 flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="Rick and Morty Explorer - Home"
            height={40}
            className="w-auto h-10"
            priority
          />
        </Link>
      </div>
    </header>
  );
}

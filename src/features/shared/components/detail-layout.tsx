import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface DetailLayoutProps {
  children: ReactNode;
}

interface HeroProps {
  icon: ReactNode;
  gradient: string;
  children: ReactNode;
}

interface ContentProps {
  children: ReactNode;
}

export function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <div className="w-full max-w-4xl mx-auto min-h-[50vh] pb-4 relative">
      <div className="absolute left-0 top-6 z-10">
        <Link
          href="/"
          className="flex items-center text-black font-bold tracking-wider text-base hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          GO BACK
        </Link>
      </div>
      {children}
    </div>
  );
}

DetailLayout.Hero = function Hero({ icon, gradient, children }: HeroProps) {
  return (
    <div className="pt-20 pb-8">
      <div className="flex flex-col items-center mb-12">
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
        >
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
};

DetailLayout.Content = function Content({ children }: ContentProps) {
  return <div className="space-y-10 px-2 md:px-0">{children}</div>;
};

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-gray-500 font-semibold mb-6 text-sm uppercase tracking-wider">
      {children}
    </h2>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface InfoRowProps {
  label: string;
  value: string;
  subtitle?: string;
  href?: string;
}

function InfoRowContent({ label, value, subtitle }: Omit<InfoRowProps, "href">) {
  return (
    <div>
      <p className="font-bold text-gray-900 text-sm">{label}</p>
      <p className="text-sm text-gray-500 mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export function InfoRow({ label, value, subtitle, href }: InfoRowProps) {
  const baseClasses = "py-4 border-b border-gray-100 last:border-0 -mx-2 px-4";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} flex justify-between items-center group rounded hover:bg-gray-50 transition-colors`}
      >
        <InfoRowContent label={label} value={value} subtitle={subtitle} />
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand-blue" />
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      <InfoRowContent label={label} value={value} subtitle={subtitle} />
    </div>
  );
}

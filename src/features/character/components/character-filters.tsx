"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";

const speciesOptions = [
  { value: "", label: "All Species" },
  { value: "Human", label: "Human" },
  { value: "Alien", label: "Alien" },
] as const;

const genderOptions = [
  { value: "", label: "All Genders" },
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
] as const;

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "Alive", label: "Alive" },
  { value: "Dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
] as const;

export function CharacterFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-section w-full max-w-grid mx-auto">
      <div className="relative col-span-1">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
        <Input
          placeholder="Filter by name..."
          className="w-full pl-10 h-10 rounded text-sm border-gray-300 shadow-sm focus-visible:ring-1 focus-visible:ring-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilter("name", name);
            }
          }}
        />
      </div>

      <CustomSelect
        value={searchParams.get("species") || ""}
        onChange={(val) => updateFilter("species", val)}
        options={speciesOptions}
        placeholder="Species"
      />

      <CustomSelect
        value={searchParams.get("gender") || ""}
        onChange={(val) => updateFilter("gender", val)}
        options={genderOptions}
        placeholder="Gender"
      />

      <CustomSelect
        value={searchParams.get("status") || ""}
        onChange={(val) => updateFilter("status", val)}
        options={statusOptions}
        placeholder="Status"
      />
    </div>
  );

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }
}

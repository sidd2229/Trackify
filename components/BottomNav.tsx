"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  ChartColumn,
  Wallet,
  Settings,
  HandCoins
} from "lucide-react";

export default function BottomNav() {

  const pathname = usePathname();

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 h-20 flex items-center justify-around px-4">

      <Link
        href="/"
        className={`flex flex-col items-center ${pathname === "/"
            ? "text-violet-400"
            : "text-zinc-500"
          }`}
      >
        <House size={22} />

        <span className="text-xs mt-1">
          Home
        </span>
      </Link>

      <Link
        href="/analytics"
        className={`flex flex-col items-center ${pathname === "/analytics"
            ? "text-violet-400"
            : "text-zinc-500"
          }`}
      >
        <ChartColumn size={22} />

        <span className="text-xs mt-1">
          Analytics
        </span>
      </Link>

      <Link
        href="/dues"
        className={`flex flex-col items-center ${pathname === "/dues"
            ? "text-violet-400"
            : "text-zinc-500"
          }`}
      >
        <HandCoins size={22} />

        <span className="text-xs mt-1">
          Dues
        </span>
      </Link>
      <Link
        href="/budget"
        className={`flex flex-col items-center ${pathname === "/budget"
            ? "text-violet-400"
            : "text-zinc-500"
          }`}
      >
        <Wallet size={22} />

        <span className="text-xs mt-1">
          Budget
        </span>
      </Link>

      <Link
        href="/settings"
        className={`flex flex-col items-center ${pathname === "/settings"
            ? "text-violet-400"
            : "text-zinc-500"
          }`}
      >
        <Settings size={22} />

        <span className="text-xs mt-1">
          Settings
        </span>
      </Link>

    </div>

  );
}
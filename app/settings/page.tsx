"use client";

import { useRouter } from "next/navigation";

import BottomNav from "@/components/BottomNav";

export default function SettingsPage() {

  const router = useRouter();

  // Reset all app data
  const handleReset = () => {

    const confirmReset =
      confirm("Are you sure you want to delete all data?");

    if(!confirmReset) return;

    localStorage.removeItem("trackify-expenses");
    localStorage.removeItem("trackify-budget");

    alert("Data cleared successfully");

    window.location.reload();
  };

  // Remove PIN
  const handleLogout = () => {

    localStorage.removeItem("trackify-pin");

    router.push("/pin");
  };

  return (

    <main className="min-h-screen text-white flex justify-center">

  <div className="w-full max-w-md px-5 py-6 pb-28 min-h-screen">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* App Info */}
      <div className="glass-card rounded-3xl p-6 mt-8">

        <p className="text-zinc-400">
          App Name
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Trackify
        </h2>

        <p className="text-zinc-500 mt-4">
          Personal Expense Tracker
        </p>

      </div>

      {/* Actions */}
      <div className="space-y-4 mt-6">

        <button
          onClick={handleReset}
          className="w-full bg-red-500/20 text-red-400 py-4 rounded-2xl font-medium"
        >
          Clear All Expenses
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-zinc-800 py-4 rounded-2xl font-medium"
        >
          Remove PIN & Logout
        </button>

      </div>

      {/* About */}
      <div className="glass-card rounded-3xl p-6 mt-6">

        <h2 className="text-xl font-semibold">
          About
        </h2>

        <p className="text-zinc-400 mt-4 leading-7">
          Trackify helps you manage your personal finances,
          track expenses, monitor budgets, and analyze spending
          patterns in a clean modern interface.
        </p>

      </div>

      <BottomNav />

</div>

</main>
  );
}
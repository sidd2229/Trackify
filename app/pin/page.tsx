"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PinPage() {

  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleSavePin = () => {

    if(pin.length !== 4){
      alert("PIN must be 4 digits");
      return;
    }

    localStorage.setItem("trackify-pin", pin);

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-5">

      <div className="glass-card w-full max-w-sm rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Create PIN
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          Secure your Trackify app
        </p>

        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e)=>setPin(e.target.value)}
          placeholder="Enter 4 digit PIN"
          className="w-full mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={handleSavePin}
          className="w-full mt-6 bg-violet-600 py-4 rounded-2xl font-medium"
        >
          Save PIN
        </button>

      </div>

    </main>
  );
}
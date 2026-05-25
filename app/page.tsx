"use client";

import BottomNav from "@/components/BottomNav";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [expenses, setExpenses] = useState<any[]>([]);
  const getCategoryIcon = (category: string) => {

    switch (category) {

      case "Food":
        return "🍔";

      case "Travel":
        return "🚕";

      case "Shopping":
        return "🛒";

      case "Bills":
        return "💡";

      case "Entertainment":
        return "🎬";

      case "Recharge":
        return "📱";

      case "Health":
        return "❤️";

      default:
        return "📦";
    }

  };

  // Check PIN
  useEffect(() => {

    const savedPin = localStorage.getItem("trackify-pin");

    if (!savedPin) {
      router.push("/pin");
    }

  }, []);

  // Load Expenses
  useEffect(() => {

    const savedExpenses = localStorage.getItem("trackify-expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

  }, []);

  // Add Expense
  const handleAddExpense = () => {

    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount,
      category,
      note,

      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    };

    const updatedExpenses = [newExpense, ...expenses];

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "trackify-expenses",
      JSON.stringify(updatedExpenses)
    );

    setAmount("");
    setCategory("");
    setNote("");

    setOpen(false);
  };

  return (

    <main className="min-h-screen text-white flex justify-center">

      <div className="w-full max-w-md px-5 py-6 pb-28 relative">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-zinc-400 text-sm">
              Welcome Back
            </p>

            <h1 className="text-3xl font-bold mt-1">
              Trackify
            </h1>
          </div>

          <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center">
            🪙
          </div>

        </div>

        {/* Balance Card */}
        <div className="glass-card rounded-3xl p-6 mt-8">

          <p className="text-zinc-400">
            Total Expenses
          </p>

          <h2 className="text-5xl font-bold mt-3">

            ₹
            {
              expenses.reduce(
                (total, expense) =>
                  total + Number(expense.amount),
                0
              )
            }

          </h2>

          <div className="flex gap-3 mt-6">

            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">
              Track Spending
            </div>

            <div className="bg-violet-500/20 text-violet-400 px-4 py-2 rounded-xl text-sm">
              Smart Budget
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-5">

          <div className="glass-card rounded-2xl p-5">

            <p className="text-zinc-400 text-sm">
              Total Transactions
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {expenses.length}
            </h3>

          </div>

          <div className="glass-card rounded-2xl p-5">

            <p className="text-zinc-400 text-sm">
              Categories
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {
                new Set(
                  expenses.map(
                    (expense) => expense.category
                  )
                ).size
              }
            </h3>

          </div>

        </div>

        {/* Recent Transactions */}
        <div className="mt-8">

          <h2 className="text-xl font-semibold">
            Recent Transactions
          </h2>

          <div className="space-y-4 mt-5">

            {
              expenses.length === 0 ? (

                <div className="glass-card rounded-2xl p-6 text-center text-zinc-500">
                  No expenses added yet
                </div>

              ) : (

                expenses.map((expense) => (

                  <div
                    key={expense.id}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="font-medium flex items-center gap-2">

                        <span>
                          {getCategoryIcon(expense.category)}
                        </span>

                        {expense.category}

                      </h3>

                      <div className="flex flex-col">

                        <p className="text-zinc-500 text-sm">
                          {expense.note || "No note"}
                        </p>

                        <p className="text-zinc-600 text-xs mt-1">
                          {expense.date}
                        </p>

                      </div>

                    </div>

                    <p className="text-red-400 font-semibold">
                      - ₹{expense.amount}
                    </p>

                  </div>

                ))

              )
            }

          </div>

        </div>

        {/* Floating Button */}
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-10 w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center shadow-2xl z-50"
        >
          <Plus size={30} />
        </button>

        {/* Add Expense Modal */}
        {
          open && (

            <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">

              <div className="bg-zinc-950 w-full max-w-md rounded-t-3xl p-6">

                <h2 className="text-2xl font-bold">
                  Add Expense
                </h2>

                <div className="space-y-4 mt-6">

                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
                  />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none text-white"
                  >

                    <option value="" className="bg-black text-white">
                      Select Category
                    </option>

                    <option value="Food" className="bg-black text-white">
                      🍔 Food
                    </option>

                    <option value="Travel" className="bg-black text-white">
                      🚕 Travel
                    </option>

                    <option value="Shopping" className="bg-black text-white">
                      🛒 Shopping
                    </option>

                    <option value="Bills" className="bg-black text-white">
                      💡 Bills
                    </option>

                    <option value="Entertainment" className="bg-black text-white">
                      🎬 Entertainment
                    </option>

                    <option value="Recharge" className="bg-black text-white">
                      📱 Recharge
                    </option>

                    <option value="Health" className="bg-black text-white">
                      ❤️ Health
                    </option>

                    <option value="Other" className="bg-black text-white">
                      📦 Other
                    </option>

                  </select>

                  <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
                  />

                  <button
                    onClick={handleAddExpense}
                    className="w-full bg-violet-600 py-4 rounded-2xl font-medium"
                  >
                    Save Expense
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full bg-zinc-800 py-4 rounded-2xl"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>

          )
        }
        <BottomNav />

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

export default function BudgetPage() {

    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(0);

    const [expenses, setExpenses] = useState<any[]>([]);

    // Load budget
    useEffect(() => {

        const storedBudget =
            localStorage.getItem("trackify-budget");

        if (storedBudget) {
            setSavedBudget(Number(storedBudget));
        }

        const savedExpenses =
            localStorage.getItem("trackify-expenses");

        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }

    }, []);

    // Save Budget
    const handleSaveBudget = () => {

        if (!budget) {
            alert("Please enter budget");
            return;
        }

        localStorage.setItem(
            "trackify-budget",
            budget
        );

        setSavedBudget(Number(budget));

        setBudget("");
    };

    // Total spent
    const totalSpent = expenses.reduce(
        (total, expense) =>
            total + Number(expense.amount),
        0
    );

    // Remaining
    const remaining = savedBudget - totalSpent;

    // Progress %
    const progress =
        savedBudget > 0
            ? (totalSpent / savedBudget) * 100
            : 0;

    return (

        <main className="min-h-screen text-white flex justify-center">

            <div className="w-full max-w-md px-5 py-6 pb-28 min-h-screen">

                <h1 className="text-3xl font-bold">
                    Budget
                </h1>

                {/* Budget Input */}
                <div className="glass-card rounded-3xl p-6 mt-8">

                    <p className="text-zinc-400">
                        Monthly Budget
                    </p>

                    <input
                        type="number"
                        placeholder="Enter budget amount"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none mt-5"
                    />

                    <button
                        onClick={handleSaveBudget}
                        className="w-full bg-violet-600 py-4 rounded-2xl font-medium mt-5"
                    >
                        Save Budget
                    </button>

                </div>

                {/* Budget Overview */}
                <div className="glass-card rounded-3xl p-6 mt-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-zinc-400">
                                Total Budget
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹{savedBudget}
                            </h2>
                        </div>

                        <div>
                            <p className="text-zinc-400">
                                Remaining
                            </p>

                            <h2 className={`text-3xl font-bold mt-2 ${remaining < 0
                                    ? "text-red-400"
                                    : "text-green-400"
                                }`}>
                                ₹{remaining}
                            </h2>
                        </div>

                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8">

                        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">

                            <div
                                className={`h-full ${progress > 100
                                        ? "bg-red-500"
                                        : "bg-violet-600"
                                    }`}
                                style={{
                                    width: `${Math.min(progress, 100)}%`
                                }}
                            />

                        </div>

                        <p className="text-zinc-400 mt-3 text-sm">
                            {progress.toFixed(0)}% used
                        </p>

                    </div>

                </div>

                {/* Insights */}
                <div className="glass-card rounded-3xl p-6 mt-6">

                    <h2 className="text-xl font-semibold">
                        Budget Insights
                    </h2>

                    <div className="space-y-4 mt-5">

                        <div className="flex items-center justify-between">
                            <p className="text-zinc-400">
                                Total Spent
                            </p>

                            <p className="font-semibold text-red-400">
                                ₹{totalSpent}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-zinc-400">
                                Budget Status
                            </p>

                            <p className={`font-semibold ${remaining < 0
                                    ? "text-red-400"
                                    : "text-green-400"
                                }`}>
                                {
                                    remaining < 0
                                        ? "Over Budget"
                                        : "Within Budget"
                                }
                            </p>
                        </div>

                    </div>

                </div>

                <BottomNav />

            </div>

        </main>
    );
}
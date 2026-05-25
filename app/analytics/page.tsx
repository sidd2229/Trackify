"use client";

import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import BottomNav from "@/components/BottomNav";

export default function AnalyticsPage() {

    const [expenses, setExpenses] = useState<any[]>([]);

    useEffect(() => {

        const savedExpenses =
            localStorage.getItem("trackify-expenses");

        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }

    }, []);

    // Group expenses by category
    const categoryData = expenses.reduce((acc: any, expense: any) => {

        const existing = acc.find(
            (item: any) => item.name === expense.category
        );

        if (existing) {
            existing.value += Number(expense.amount);
        } else {
            acc.push({
                name: expense.category,
                value: Number(expense.amount)
            });
        }

        return acc;

    }, []);

    const COLORS = [
        "#7c3aed",
        "#22c55e",
        "#ef4444",
        "#3b82f6",
        "#f59e0b",
        "#ec4899"
    ];

    const totalSpent = expenses.reduce(
        (total, expense) =>
            total + Number(expense.amount),
        0
    );

    return (

        <main className="min-h-screen text-white flex justify-center">

            <div className="w-full max-w-md px-5 py-6 pb-28 min-h-screen">

                <h1 className="text-3xl font-bold">
                    Analytics
                </h1>

                {/* Total Card */}
                <div className="glass-card rounded-3xl p-6 mt-8">

                    <p className="text-zinc-400">
                        Total Spending
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                        ₹{totalSpent}
                    </h2>

                </div>

                {/* Pie Chart */}
                <div className="glass-card rounded-3xl p-6 mt-6 h-[350px]">

                    <h2 className="text-xl font-semibold mb-6">
                        Category Breakdown
                    </h2>

                    {
                        expenses.length === 0 ? (

                            <div className="h-full flex items-center justify-center text-zinc-500">
                                No expense data available
                            </div>

                        ) : (

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label
                                    >

                                        {
                                            categoryData.map((entry: any, index: number) => (
                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))
                                        }

                                    </Pie>

                                    <Tooltip />

                                </PieChart>

                            </ResponsiveContainer>

                        )
                    }

                </div>

                {/* Category List */}
                <div className="mt-6 space-y-4">

                    {
                        categoryData.map((item: any, index: number) => (

                            <div
                                key={index}
                                className="glass-card rounded-2xl p-4 flex items-center justify-between"
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length]
                                        }}
                                    />

                                    <p>
                                        {item.name}
                                    </p>

                                </div>

                                <p className="font-semibold">
                                    ₹{item.value}
                                </p>

                            </div>

                        ))
                    }

                </div>

                <BottomNav />

            </div>

        </main>
    );
}
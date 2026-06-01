"use client";

import { useState, useEffect } from "react";

import {
    Plus,
    CheckCircle,
    Trash2
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function DuesPage() {

    const [open, setOpen] = useState(false);

    const [person, setPerson] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("lent");
    const [note, setNote] = useState("");

    const [dues, setDues] = useState<any[]>([]);

    useEffect(() => {

        const savedDues =
            localStorage.getItem("trackify-dues");

        if (savedDues) {
            setDues(JSON.parse(savedDues));
        }

    }, []);

    const handleAddDue = () => {

        if (!person || !amount) {
            alert("Please fill all fields");
            return;
        }

        const newDue = {

            id: Date.now(),

            person,
            amount,

            type,

            note,

            settled: false,

            date: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            })
        };

        const updatedDues = [newDue, ...dues];

        setDues(updatedDues);

        localStorage.setItem(
            "trackify-dues",
            JSON.stringify(updatedDues)
        );

        setPerson("");
        setAmount("");
        setType("lent");
        setNote("");

        setOpen(false);
    };

    const totalReceive = dues
        .filter(
            (due) =>
                due.type === "lent" &&
                !due.settled
        )
        .reduce(
            (total, due) =>
                total + Number(due.amount),
            0
        );

    const totalPay = dues
        .filter(
            (due) =>
                due.type === "borrowed" &&
                !due.settled
        )
        .reduce(
            (total, due) =>
                total + Number(due.amount),
            0
        );

    const netBalance =
        totalReceive - totalPay;

    const handleSettleDue = (id: number) => {

        const updatedDues = dues.map((due) =>

            due.id === id
                ? { ...due, settled: true }
                : due
        );

        setDues(updatedDues);

        localStorage.setItem(
            "trackify-dues",
            JSON.stringify(updatedDues)
        );
    };

    const handleDeleteDue = (id: number) => {

        const updatedDues = dues.filter(
            (due) => due.id !== id
        );

        setDues(updatedDues);

        localStorage.setItem(
            "trackify-dues",
            JSON.stringify(updatedDues)
        );
    };

    return (
        <main className="min-h-screen text-white flex justify-center">

            <div className="w-full max-w-md px-5 py-6 pb-28 min-h-screen">

                <h1 className="text-3xl font-bold">
                    Dues
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-3 mt-6">

                    <div className="glass-card rounded-2xl p-4 text-center">
                        <p className="text-sm">📥 You Will Receive</p>
                        <h2 className="font-bold mt-2">
                            ₹{totalReceive}
                        </h2>
                    </div>

                    <div className="glass-card rounded-2xl p-4 text-center">
                        <p className="text-sm">📤 You Need To Pay</p>
                        <h2 className="font-bold mt-2">
                            ₹{totalPay}
                        </h2>
                    </div>

                    <div className="glass-card rounded-2xl p-4 text-center">
                        <p className="text-sm">📊 Net Balance</p>
                        <h2
                            className={`font-bold mt-2 ${netBalance >= 0
                                ? "text-green-400"
                                : "text-red-400"
                                }`}
                        >
                            ₹{netBalance}
                        </h2>
                    </div>

                </div>

                {/* Active Dues */}
                <div className="mt-8">

                    <h2 className="text-xl font-semibold">
                        🟢 Active Dues
                    </h2>

                    <div className="space-y-4 mt-4">

                        {
                            dues.filter((due) => !due.settled).length === 0 ? (

                                <div className="glass-card rounded-2xl p-5 text-center text-zinc-500">
                                    No active dues
                                </div>

                            ) : (

                                dues
                                    .filter((due) => !due.settled)
                                    .map((due) => (

                                        <div
                                            key={due.id}
                                            className="glass-card rounded-2xl p-4"
                                        >

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h3 className="font-semibold text-lg">
                                                        {due.person}
                                                    </h3>

                                                    <p className="text-zinc-400 text-sm mt-1">
                                                        {due.type === "lent"
                                                            ? "📤 Lent Money"
                                                            : "📥 Borrowed Money"}
                                                    </p>

                                                    <p className="text-zinc-500 text-sm mt-2">
                                                        {due.note || "No note"}
                                                    </p>

                                                    <p className="text-zinc-600 text-xs mt-2">
                                                        📅 {due.date}
                                                    </p>

                                                </div>

                                                <div className="text-right">

                                                    <p className="font-bold text-xl">
                                                        ₹{due.amount}
                                                    </p>

                                                    <div className="flex gap-2 mt-3">

                                                        <button
                                                            onClick={() => handleSettleDue(due.id)}
                                                            className="bg-green-600 px-3 py-2 rounded-lg"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeleteDue(due.id)}
                                                            className="bg-red-600 px-3 py-2 rounded-lg"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))
                            )
                        }

                    </div>

                </div>

                {/* Settled Dues */}
                <div className="mt-8">

                    <h2 className="text-xl font-semibold">
                        ✅ Settled Dues
                    </h2>

                    <div className="space-y-4 mt-4">

                        {
                            dues
                                .filter((due) => due.settled)
                                .map((due) => (

                                    <div
                                        key={due.id}
                                        className="glass-card rounded-2xl p-4 border border-green-500/30"
                                    >

                                        <div className="flex justify-between">

                                            <div>

                                                <h3 className="font-semibold">
                                                    {due.person}
                                                </h3>

                                                <p className="text-sm text-zinc-400 mt-1">

                                                    {
                                                        due.type === "lent"
                                                            ? "📤 Lent Money"
                                                            : "📥 Borrowed Money"
                                                    }

                                                </p>

                                                <p className="text-zinc-500 text-sm mt-2">
                                                    {due.note || "No note"}
                                                </p>

                                                <p className="text-zinc-600 text-xs mt-2">
                                                    📅 {due.date}
                                                </p>

                                                <p className="text-green-400 text-sm mt-2">
                                                    ✔ Settled
                                                </p>

                                            </div>

                                            <p className="font-bold">
                                                ₹{due.amount}
                                            </p>

                                        </div>

                                    </div>

                                ))
                        }

                    </div>

                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-24 right-10 w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center shadow-2xl z-50"
                >
                    <Plus size={30} />
                </button>

                {
                    open && (

                        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">

                            <div className="bg-zinc-950 w-full max-w-md rounded-t-3xl p-6">

                                <h2 className="text-2xl font-bold">
                                    Add Due
                                </h2>

                                <div className="space-y-4 mt-6">

                                    <input
                                        type="text"
                                        placeholder="Person Name"
                                        value={person}
                                        onChange={(e) => setPerson(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
                                    />

                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
                                    >
                                        <option value="lent">
                                            📤 Lent Money
                                        </option>

                                        <option value="borrowed">
                                            📥 Borrowed Money
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
                                        onClick={handleAddDue}
                                        className="w-full bg-violet-600 py-4 rounded-2xl font-medium"
                                    >
                                        Save Due
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
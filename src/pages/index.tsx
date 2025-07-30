import { useState } from "react";
import { useWithdrawalSimulation } from "@/hooks/useWithdrawalSimulation";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "@/utils/formatters";

export default function HomePage() {
    const [initialBTC, setInitialBTC] = useState(0.3);
    const [withdrawal, setWithdrawal] = useState(500000);
    const [mode, setMode] = useState<"fixed" | "percentage" | "decay">("fixed");
    const [decayRate, setDecayRate] = useState(0.05);

    const { results, simulate } = useWithdrawalSimulation();

    const handleSimulate = () => {
        simulate({
            initialBTC,
            withdrawal: mode === "fixed" ? withdrawal : withdrawal / 100,
            withdrawalMode: mode,
            taxRate: 0.2,
            exchangeRate: 7000000,
            inflationRate: 0.02,
            decayRate: mode === "decay" ? decayRate : undefined,
        });
    };

    const chartData = results.map((r) => ({
        year: r.year,
        valueJPY: r.totalValueJPY,
        btcHeld: r.btcHeld,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">0.3 BTC、10年後いくらになる？</h1>
                <p className="text-lg text-gray-600 mb-8">
                    あなたの未来を、ちょっとシミュレーションしてみよう。
                </p>

                <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4 mb-10">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex-1">
                            初期BTC保有量
                            <input
                                type="number"
                                step="0.01"
                                value={initialBTC}
                                onChange={(e) => setInitialBTC(parseFloat(e.target.value))}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </label>

                        <label className="flex-1">
                            年間取り崩し {mode === "fixed" ? "(円)" : mode === "percentage" ? "(%)" : "(初期%)"}
                            <input
                                type="number"
                                step="10000"
                                value={withdrawal}
                                onChange={(e) => setWithdrawal(parseFloat(e.target.value))}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </label>
                    </div>

                    {mode === "decay" && (
                        <div>
                            <label>
                                毎年の取り崩し低減率（例：0.05 = 5%）
                                <input
                                    type="number"
                                    step="0.01"
                                    value={decayRate}
                                    onChange={(e) => setDecayRate(parseFloat(e.target.value))}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                />
                            </label>
                        </div>
                    )}

                    <div className="flex gap-4 items-center justify-center">
                        <button
                            onClick={() => setMode("fixed")}
                            className={`px-4 py-2 rounded-full ${mode === "fixed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            固定額
                        </button>
                        <button
                            onClick={() => setMode("percentage")}
                            className={`px-4 py-2 rounded-full ${mode === "percentage" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            割合で取り崩し
                        </button>
                        <button
                            onClick={() => setMode("decay")}
                            className={`px-4 py-2 rounded-full ${mode === "decay" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            毎年低減型
                        </button>
                    </div>

                    <button
                        onClick={handleSimulate}
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        シミュレーションする
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">シミュレーション結果</h2>

                    <button
                        onClick={() => {
                            const csvHeader = [
                                "年",
                                "BTC価格",
                                "取り崩し率",
                                "取り崩し額",
                                "取り崩しBTC",
                                "残りBTC",
                                "評価額",
                            ];
                            const csvRows = results.map((r) => [
                                2025 + r.year - 1,
                                r.btcPrice,
                                r.withdrawalRate ? (r.withdrawalRate * 100).toFixed(2) + "%" : "",
                                r.withdrawalAmountJPY ? Math.round(r.withdrawalAmountJPY) : "",
                                r.withdrawalBTC ? r.withdrawalBTC.toFixed(4) : "",
                                r.btcHeld.toFixed(4),
                                Math.round(r.totalValueJPY),
                            ]);
                            const csvContent = [csvHeader, ...csvRows]
                                .map((e) => e.join(","))
                                .join("\n");
                            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.setAttribute("href", url);
                            link.setAttribute("download", "btc_simulation.csv");
                            link.click();
                        }}
                        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        CSVダウンロード
                    </button>

                    <div className="flex gap-4 justify-center mb-6">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                `BTC取り崩しシミュレーションしてみた！将来こうなるかも？\n\n`
                            )}&url=${encodeURIComponent("https://btcplan.jp/try")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Xで共有
                        </a>
                        <a
                            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                                "https://btcplan.jp/try"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            LINEで共有
                        </a>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Line type="monotone" dataKey="valueJPY" stroke="#2563EB" name="評価額（円）" />
                            <Line type="monotone" dataKey="btcHeld" stroke="#8884d8" name="BTC残高" />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="overflow-x-auto mt-10 text-sm">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-3 py-2">年</th>
                                    <th className="px-3 py-2">BTC価格</th>
                                    <th className="px-3 py-2">取り崩し率</th>
                                    <th className="px-3 py-2">取り崩し額</th>
                                    <th className="px-3 py-2">取り崩しBTC</th>
                                    <th className="px-3 py-2">残りBTC</th>
                                    <th className="px-3 py-2">評価額</th>
                                </tr>
                            </thead>
                            <tbody className="text-right">
                                {results.map((r) => (
                                    <tr
                                        key={r.year}
                                        className={`border-b transition ${r.year > 20
                                                ? "bg-blue-50"
                                                : r.year % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            } hover:bg-gray-100`}
                                    >
                                        <td className="px-3 py-1 text-left">{2025 + r.year - 1}</td>
                                        <td className="px-3 py-1">{formatCurrency(r.btcPrice)}</td>
                                        <td className="px-3 py-1">{r.withdrawalRate ? `+${(r.withdrawalRate * 100).toFixed(2)}%` : "-"}</td>
                                        <td className="px-3 py-1">{r.withdrawalAmountJPY ? formatCurrency(r.withdrawalAmountJPY) : "-"}</td>
                                        <td className="px-3 py-1">{r.withdrawalBTC ? r.withdrawalBTC.toFixed(4) + " BTC" : "-"}</td>
                                        <td className="px-3 py-1">{r.btcHeld.toFixed(4)} BTC</td>
                                        <td className="px-3 py-1">{formatCurrency(r.totalValueJPY)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
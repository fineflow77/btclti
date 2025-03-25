// src/pages/BitcoinBasics.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp, Wallet, Key } from 'lucide-react';

const typography: Record<string, string> = {
    h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    subtitle: 'text-base sm:text-lg font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
};

const colors: Record<string, string> = {
    primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
    secondary: 'bg-[#F59E0B] hover:bg-[#d97706] text-black',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
};

const BitcoinBasics: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {/* イントロダクション */}
                <div className="text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-4`}>ビットコイン投資の基礎</h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコイン投資を始める前に知っておきたい基本的な知識と実践的なステップをわかりやすく解説します。
                    </p>
                </div>

                {/* セクション1：ビットコインとは */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3 flex items-center`}>
                        <Info className="h-5 w-5 mr-2 text-[#3B82F6]" />
                        ビットコインとは
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは、中央銀行を介さずに取引できるデジタル通貨です。ブロックチェーン技術により、透明性と安全性が確保されています。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        2009年に誕生して以来、ビットコインは長期的な成長を続けており、インフレヘッジや分散投資の手段として注目されています。
                    </p>
                    <div className="mt-4 text-right">
                        <Link
                            to="/power-law-explanation"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            ビットコインの長期成長パターンを知る{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* セクション2：メリットとリスク */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2 text-[#3B82F6]" />
                        ビットコイン投資のメリットとリスク
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                            <h3 className={`${typography.subtitle} text-[#10B981]`}>メリット</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li>長期的な価格成長（過去10年で大幅な上昇）</li>
                                <li>インフレヘッジとしての価値</li>
                                <li>分散投資の一環として活用可能</li>
                            </ul>
                        </div>
                        <div className="space-y-2 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                            <h3 className={`${typography.subtitle} text-[#F87171]`}>リスク</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li>価格の高いボラティリティ</li>
                                <li>規制リスク（政府の規制変更）</li>
                                <li>セキュリティリスク（ハッキングなど）</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* セクション3：準備 */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2 text-[#3B82F6]" />
                        準備
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資を始める前に、以下の準備を整えましょう。
                    </p>
                    <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                        <li>ウォレット：ビットコインを保管するためのデジタル財布が必要です（例：MetaMask、Ledger）。</li>
                        <li>取引所アカウント：信頼できる取引所でアカウントを作成します（例：Coinbase、Binance）。</li>
                        <li>セキュリティ対策：2段階認証を設定し、秘密鍵を安全に管理しましょう。</li>
                    </ul>
                </div>

                {/* セクション4：取引所の選び方 */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3 flex items-center`}>
                        <Wallet className="h-5 w-5 mr-2 text-[#3B82F6]" />
                        取引所の選び方
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        以下のポイントを参考に、信頼できる取引所を選びましょう。
                    </p>
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`${typography.subtitle} ${colors.textPrimary} border-b border-gray-700`}>
                                <th className="py-2">取引所</th>
                                <th className="py-2">手数料</th>
                                <th className="py-2">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${typography.body} ${colors.textSecondary} border-b border-gray-700`}>
                                <td className="py-2">Coinbase</td>
                                <td className="py-2">1.5%</td>
                                <td className="py-2">初心者向け、使いやすい</td>
                            </tr>
                            <tr className={`${typography.body} ${colors.textSecondary} border-b border-gray-700`}>
                                <td className="py-2">Binance</td>
                                <td className="py-2">0.1%</td>
                                <td className="py-2">低手数料、豊富な機能</td>
                            </tr>
                            <tr className={`${typography.body} ${colors.textSecondary}`}>
                                <td className="py-2">Kraken</td>
                                <td className="py-2">0.2%</td>
                                <td className="py-2">高い安全性、日本語対応</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* セクション5：少額投資から始める */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3 flex items-center`}>
                        <Key className="h-5 w-5 mr-2 text-[#3B82F6]" />
                        少額投資から始める
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        リスクを抑えるために、少額（例：1,000円分）から投資を始めましょう。
                    </p>
                    <ol className={`${typography.body} ${colors.textSecondary} list-decimal list-inside space-y-2`}>
                        <li>取引所にログインし、ビットコインの購入画面に進む。</li>
                        <li>購入金額（例：1,000円）を入力し、購入手続きを完了する。</li>
                        <li>購入したビットコインをウォレットに移動して安全に保管する。</li>
                    </ol>
                </div>

                {/* セクション6：次のステップ */}
                <div className={`${colors.cardBg} p-5 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-3`}>次のステップ</h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        投資を始めたら、以下のステップでさらに学びを深めましょう。
                    </p>
                    <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                        <li>シミュレーターを使って、長期的な投資戦略を試してみる。</li>
                        <li>価格の短期変動に惑わされず、長期的な視点を持つ。</li>
                    </ul>
                    <div className="mt-4 text-right">
                        <Link
                            to="/simulators/investment"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            シミュレーションで投資戦略を試す{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* CTA：シミュレーターへの導線 */}
                <div className="text-center">
                    <Link
                        to="/simulators/investment"
                        className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                    >
                        シミュレーションで投資を試してみる
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
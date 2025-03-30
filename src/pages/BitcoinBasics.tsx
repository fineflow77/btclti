import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp, Key, PiggyBank } from 'lucide-react';

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
    accent: 'text-[#D4AF37]',
    success: 'text-[#10B981]',
    warning: 'text-[#F87171]',
};

const BitcoinBasics: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
                {/* Introduction */}
                <div className="text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-4`}>ビットコイン投資の第一歩</h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコインに興味はあるけれど、どう始めればいいかわからない。そんなあなたのために、基本から実践までをわかりやすく解説します。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        30代のあなたにぴったりの、賢く始めるビットコイン投資の世界へようこそ。
                    </p>
                </div>

                {/* Section 1: What is Bitcoin? */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        ビットコインとは何か？
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは、中央銀行や政府が介在しない分散型デジタル通貨です。インターネットを介して、世界中どこでも直接送金が可能。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        発行上限が2100万BTCと決まっているため、希少性が高く、インフレに強い資産として注目されています。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        2009年の誕生以来、価格は長期的に上昇傾向にあり、投資ポートフォリオの新たな選択肢として魅力的です。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/power-law-explanation"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            長期成長の秘密を知る{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* Section 2: Benefits and Risks */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        投資のメリットとリスク
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> メリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">成長性:</strong> 過去10年で急上昇し、将来への期待も高い。</li>
                                <li><strong className="font-semibold">インフレ対策:</strong> 発行上限により法定通貨の価値下落に強い。</li>
                                <li><strong className="font-semibold">分散投資:</strong> 株式や債券と異なる動きでリスクを分散。</li>
                                <li><strong className="font-semibold">少額投資:</strong> 1円からでも始められ、気軽に参入可能。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> リスク
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">ボラティリティ:</strong> 価格変動が大きく、短期間での損失リスクも。</li>
                                <li><strong className="font-semibold">規制:</strong> 政府の規制変更で価格や取引が影響を受ける可能性。</li>
                                <li><strong className="font-semibold">セキュリティ:</strong> ハッキングリスクがあり、自己管理が重要。</li>
                                <li><strong className="font-semibold">税金:</strong> 利益は課税対象で、確定申告が必要な場合も。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 3: Preparation */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2" />
                        投資を始める準備
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資を安全に始めるには、いくつかのステップが必要です。
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>取引所アカウントの開設</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                まずは金融庁登録済みの国内取引所でアカウントを作成しましょう。本人確認書類とマイナンバーが必要です。
                            </p>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>おすすめ取引所:</p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li>
                                    <Link to="https://coin.z.com/jp/" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group">
                                        <strong className="font-semibold">GMOコイン</strong>
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>: 手数料が安く、積み立てサービスも充実。
                                </li>
                                <li>
                                    <Link to="https://bitbank.cc/" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group">
                                        <strong className="font-semibold">bitbank</strong>
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>: 取引量が多く、本格的な取引に最適。
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>ウォレットの理解</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                取引所でビットコインを買ったら、それを保管する「ウォレット」があります。取引所提供のものを使うのが初心者には簡単ですが、自己管理型（例: Ledger）はセキュリティが高い選択肢です。
                            </p>
                            <p className={`${typography.body} ${colors.textMuted}`}>
                                まずは取引所のウォレットから始めて、慣れてきたら自己管理を検討しましょう。
                            </p>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>セキュリティ対策</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">2FA:</strong> 二段階認証でログインを保護。</li>
                                <li><strong className="font-semibold">パスワード:</strong> 複雑で推測されにくいものを。</li>
                                <li><strong className="font-semibold">フィッシング対策:</strong> 公式サイト以外からのアクセスを避ける。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 4: Accumulation Services */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <PiggyBank className="h-5 w-5 mr-2" />
                        積み立て投資の活用
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        初心者におすすめなのが、取引所の積み立てサービス。毎月一定額を自動購入し、手間なく長期投資が可能です。
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> メリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">ドルコスト平均法:</strong> 価格変動リスクを抑え、安定投資。</li>
                                <li><strong className="font-semibold">手軽さ:</strong> 設定後は自動で積み立て。</li>
                                <li><strong className="font-semibold">長期視点:</strong> 短期変動に惑わされない戦略。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> 注意点
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">手数料:</strong> 取引所よりやや高めの場合も。</li>
                                <li><strong className="font-semibold">短期利益:</strong> 急騰時の利益は限定的。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 5: Starting Small */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Key className="h-5 w-5 mr-2" />
                        少額から始める
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        リスクを抑えるなら、月5,000円や毎日500円といった少額から。積み立てサービスで手軽に始め、自分のペースで増やしていきましょう。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            シミュレーションを試す{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        賢くビットコイン投資を始めましょう。
                    </p>
                    <Link
                        to="/simulators/investment"
                        className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                    >
                        積み立てシミュレーションを試す
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
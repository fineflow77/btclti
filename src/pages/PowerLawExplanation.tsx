import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

// Props interface: chartComponentは任意で柔軟性を持たせる
interface PowerLawExplanationProps {
    chartComponent?: React.ReactNode;
}

// スタイル設定は変更なし
const typography = {
    h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
};

const colors = {
    primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    info: 'text-[#3B82F6]',
    warning: 'text-yellow-400',
};

const PowerLawExplanation: React.FC<PowerLawExplanationProps> = ({ chartComponent }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ヘッダー */}
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} ${colors.info} mb-4`}>
                        ビットコインの長期トレンドを読み解く「パワーロー」とは
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコインの価格は日々変動しますが、実は長期間で見ると一定のパターンが見えてきます。
                        このページでは「パワーロー」という考え方を紹介し、将来の価格を考える手がかりにします。
                        確実な予測ではありませんが、長期投資の視点として参考になるはずです。
                    </p>
                    <Link to="/" className="inline-flex items-center mt-4 text-[#3B82F6] hover:text-[#2b6cb0] transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                {/* パワーローとは */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        パワーローとは何か？
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは、ある値が別の値の「何乗」に比例して変化する関係を表す法則です。
                            自然界や社会現象でよく見られ、シンプルながら強力なパターンを示します。
                        </p>
                        <p>たとえば、こんな場面で現れます：</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>都市の人口：大都市は少なく、小さな町は多い</li>
                            <li>地震の規模：大きな地震ほど発生頻度が極端に減る</li>
                            <li>ウェブサイトの訪問数：人気サイトは少数で、あとは小規模なサイトが大多数</li>
                        </ul>
                        <p>
                            実は、ビットコインの価格もこのパワーローに似た動きをしている可能性があるのです。
                            その理由を次で詳しく見ていきましょう。
                        </p>
                    </div>
                </section>

                {/* ビットコインとパワーロー */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        なぜビットコインにパワーローが関係するのか
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            過去10年以上のデータを見ると、ビットコインの価格は時間とともに独特の成長パターンを描いています。
                            研究者のGiovanni Santostasi氏は、これが「時間の約6乗」に比例すると指摘しています。
                        </p>
                        <p>
                            つまり、時間が経つにつれて価格の上昇スピードは緩やかになりますが、長い目で見ると安定した成長が続くというわけです。
                            この背景には、次の3つの要素が絡み合っていると考えられます：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🌐</span> ネットワーク効果
                                </h3>
                                <p className="text-sm">
                                    使う人が増えるほど価値が上がる仕組み。電話と同じで、参加者が多いほど便利になります。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">⛏️</span> 供給の安定性
                                </h3>
                                <p className="text-sm">
                                    ビットコインの発行量は決まっていて増えすぎません。価格が上がっても希少性が保たれます。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🔐</span> セキュリティ向上
                                </h3>
                                <p className="text-sm">
                                    ネットワークが大きくなると安全性も高まり、信頼感からさらに人が集まる好循環が生まれます。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* チャートの見方 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローチャートの見方
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            このチャートはビットコインの価格を「対数スケール」で表しています。
                            普通のグラフと違って、10倍も100倍も同じ感覚で見られるので、長期のトレンドがわかりやすいんです。
                        </p>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-yellow-300 font-semibold mb-2">ポイント解説</h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    <span className="font-semibold text-green-400">緑の線（中央線）</span>：長期的な「目安価格」
                                </li>
                                <li>
                                    <span className="font-semibold text-red-400">赤の線（下限線）</span>：過去にあまり下がらなかった「底値目安」
                                </li>
                                <li>
                                    <span className="font-semibold text-blue-300">現在の価格</span>：今がトレンドのどこにいるかを示す
                                </li>
                            </ul>
                        </div>
                        <p>
                            たとえば、価格が赤い線に近づくと「買い時」、緑の線から大きく離れると「過熱気味」と考える目安になります。
                            NISAの積み立てタイミングを考える感覚に近いかもしれません。
                        </p>
                        {chartComponent}
                    </div>
                </section>

                {/* 投資への活用 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        投資にどう活かすか
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">🛒</span> 1. 安い時に少しずつ買う
                            </h3>
                            <p>
                                価格が赤い下限線に近づいたら、長期目線での買い増しを検討するチャンス。
                                たとえば、2022年末の安値は後から見ると絶好のタイミングでした。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-orange-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">💰</span> 2. 高騰時に少し調整
                            </h3>
                            <p>
                                価格が緑の線から大きく上に離れたら、一部を売って利益を確保するのも手。
                                2017年末のような急騰後に調整が入った例を思い出してください。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                <span className="mr-2">⏱️</span> 3. 毎月コツコツ積み立て
                            </h3>
                            <p>
                                タイミングを完璧に狙うのは難しい。だからこそ、NISAみたいに毎月一定額を積み立てるのが現実的。
                                価格が下がっても焦らず続けられるプランが大事です。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 注意点 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <AlertTriangle className="h-5 w-5 mr-2 ${colors.warning}" />
                        注意しておきたいこと
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは便利な目安ですが、完璧ではありません。こんな点に気をつけてください：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">短期は苦手</h3>
                                <p className="text-xs">
                                    数ヶ月先の動きを予測するのは難しい。あくまで数年単位の目安です。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">過去頼み</h3>
                                <p className="text-xs">
                                    過去のデータがベースだから、未来も同じとは限りません。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">外部の影響</h3>
                                <p className="text-xs">
                                    規制や経済の大きな変化で、予想外の動きになる可能性もあります。
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">
                            ボラティリティが怖いなら、少額から始めて様子を見るのが賢明。
                            NISAと組み合わせつつ、少しずつ慣れていくのがおすすめです。
                        </p>
                    </div>
                </section>

                {/* 参考情報 */}
                <section className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <BookOpen className="h-5 w-5 mr-2" /> もっと知りたいときは
                    </h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4 ${colors.cardBorder}`}>
                        <p>さらに詳しく知りたいなら、こちらをチェック：</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 text-blue-400" />
                                <div>
                                    <a
                                        href="https://giovannisantostasi.medium.com/the-bitcoin-power-law-theory-962dfaf99ee9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors font-medium"
                                    >
                                        "The Bitcoin Power Law Theory" - Giovanni Santostasi (2024)
                                    </a>
                                    <p className={`${typography.small} ${colors.textMuted} mt-1`}>
                                        パワーローの詳しい解説（英語）
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-6 text-center">
                            <Link
                                to="/simulators/investment"
                                className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                            >
                                積み立てを試してみる
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* フッター */}
                <footer className="text-center text-gray-400 mt-12 py-4 border-t border-gray-700">
                    <p>
                        © {new Date().getFullYear()} ビットコイン長期投資研究所{' '}
                        <a href="https://x.com/DrPowerLaw" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0]">
                            @DrPowerLaw
                        </a>
                    </p>
                    <p className={`${typography.small} mt-2`}>
                        ※投資は自己責任で。価格変動リスクを理解した上で判断してください。
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default PowerLawExplanation;
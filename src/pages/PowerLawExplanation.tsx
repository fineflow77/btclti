// PowerLawExplanation.tsx 改善案 (型エラー修正版)

import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Info, TrendingUp, AlertTriangle,
    BookOpen, ExternalLink, ArrowRight
} from 'lucide-react';

interface PowerLawExplanationProps {
    chartComponent?: React.ReactNode; // optional にしておく
}

// タイポグラフィとカラー設定は変更なし (前回の修正を維持)
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
    info: 'text-[#3B82F6]',
    veryHighRisk: 'text-orange-400',
};

const PowerLawExplanation: React.FC<PowerLawExplanationProps> = ({ chartComponent }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* ヘッダー部分の改善 - より親しみやすいタイトルと説明 */}
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} ${colors.info} mb-4`}>
                        ビットコインの"未来地図"：価格予測チャートの読み方
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコインの価格は複雑に変動しますが、実は長期的には意外と規則性があるんです。
                        このページでは「パワーローモデル」という予測方法を使って、ビットコインの未来について考えてみましょう。
                        将来を100%保証するものではありませんが、長期投資の道しるべになる考え方をお伝えします。
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center mt-4 text-[#3B82F6] hover:text-[#2b6cb0] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                {/* パワーロー説明部分の改善 - 複雑な概念をシンプルに */}
                <section id="what-is-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        パワーロー（べき乗則）って何？ - 自然界に潜む法則
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーロー（べき乗則）とは、自然界や社会に広く見られる数学的な法則です。簡単に言うと、
                            「ある要素が別の要素の累乗（べき乗）で変化する関係」のことです。
                        </p>
                        <p>
                            身近な例を挙げると：
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>都市の人口分布（少数の大都市と多数の小さな町）</li>
                            <li>地震の規模と頻度（大きな地震ほど発生頻度が急激に減少）</li>
                            <li>インターネットサイトのアクセス数（少数の超人気サイトと多数の小規模サイト）</li>
                        </ul>
                        <p>
                            これらはすべて「極端に大きいものは少なく、小さいものは非常に多い」という特徴的なパターンを示します。
                            そして驚くべきことに、ビットコインの価格成長もこの法則に従っている可能性があるのです！
                        </p>
                    </div>
                </section>

                {/* ビットコインとパワーローの関係説明 - より具体的に */}
                <section id="bitcoin-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        なぜビットコインはパワーローに従うの？
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            「ビットコインの価格は過去10年以上、時間経過とともに特定のパターンで成長してきた」と
                            複数の研究者が指摘しています。特に物理学者のGiovanni Santostasi氏の研究によれば、
                            ビットコインの価格は「時間の約6乗に比例」するという傾向があるそうです。
                        </p>
                        <p>
                            簡単に言えば、「時間が経つにつれて価格の上昇ペースは緩やかになるけれど、
                            長い目で見ると安定した上昇傾向を維持している」ということです。
                        </p>
                        <p>
                            この現象が起きる理由として、次の3つの要素が互いに強め合っているとされています：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🌐</span> ネットワーク効果
                                </h3>
                                <p className="text-sm">利用者が増えるほど、その価値が指数関数的に高まる現象。例えば電話は1台だけでは価値がないが、皆が持てば持つほど有用性が急増します。</p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">⛏️</span> 供給の安定性
                                </h3>
                                <p className="text-sm">ビットコインは発行ペースが一定で、総量も決まっています。これにより価格が上がっても供給過多にならず、希少性が保たれます。</p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🔐</span> セキュリティの向上
                                </h3>
                                <p className="text-sm">ネットワークが大きくなるほど安全性が高まり、それが信頼を生み、さらに多くの人が参加するという好循環が生まれます。</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* チャートの見方解説 - より実用的に */}
                <section id="power-law-chart" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローチャートの読み方：長期トレンドを見極める
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            このチャートはビットコインの価格履歴を「対数グラフ」で表示しています。通常のグラフと違い、
                            10倍の値上がりも100倍の値上がりも同じ距離で表されるため、長期間の値動きパターンがわかりやすくなります。
                        </p>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-yellow-300 font-semibold mb-2">💡 チャートの見方ポイント</h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    <span className="font-semibold text-green-400">緑の線（中央価格線）</span>：長期的な理論上の「適正価格」
                                </li>
                                <li>
                                    <span className="font-semibold text-red-400">赤の線（下限価格線）</span>：歴史的に価格が下回りにくかった「底値ライン」
                                </li>
                                <li>
                                    <span className="font-semibold text-blue-300">現在の価格位置</span>：今の価格が長期トレンドに対してどの位置にあるか
                                </li>
                            </ul>
                        </div>
                        <p>
                            このチャートを見ることで、「今のビットコインは割高なのか割安なのか」を判断する参考になります。
                            例えば価格が赤い線（下限価格線）に近づいた時は歴史的に見て「買い場」の可能性が高く、
                            逆に緑の線から大きく上に離れてしまった時は「一時的な過熱」状態かもしれません。
                        </p>
                        {/* チャートコンポーネントがここに挿入されます */}
                        {chartComponent}
                    </div>
                </section>

                {/* 投資戦略への応用 - より具体的なシナリオを示す */}
                <section id="investment-application" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        長期投資に役立てるための3つの使い方
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">🛒</span> 1. 「割安」時に買い増し検討
                            </h3>
                            <p>
                                価格が赤い下限線に近づいたり、「非常に割安」というラベルが表示されたりしたとき、
                                長期保有目的での買い増しを検討するタイミングと言えるでしょう。
                            </p>
                            <p className="mt-2 text-sm text-gray-400 border-l-2 border-green-400 pl-2">
                                例：2022年11月〜2023年1月や、2018年12月〜2019年3月などは
                                下限線付近まで価格が下落し、後から見れば良い買い場でした。
                            </p>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-orange-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">💰</span> 2. 「非常に割高」時の調整
                            </h3>
                            <p>
                                価格が緑の中央線から大きく上にかい離し、「非常に割高」というラベルが表示された場合、
                                リスク管理の観点から保有ポジションの一部を利確することを検討してもよいでしょう。
                            </p>
                            <p className="mt-2 text-sm text-gray-400 border-l-2 border-orange-400 pl-2">
                                例：2013年末、2017年末、2021年春などは短期的に「非常に割高」な水準まで
                                上昇した後、大幅な調整が入りました。
                            </p>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
                                <span className="mr-2">⏱️</span> 3. 定期積立の実践
                            </h3>
                            <p>
                                市場のタイミングを完璧に当てるのは困難です。そこで「ドルコスト平均法」を活用し、
                                毎月一定額を定期的に購入する方法が効果的です。これにより感情に左右されず、
                                長期的な上昇トレンドの恩恵を受けられる可能性が高まります。
                            </p>
                            <p className="mt-2 text-sm text-gray-400 border-l-2 border-blue-300 pl-2">
                                例：つみたてNISAのように、毎月3万円程度を自動積立に設定すれば、
                                価格変動に一喜一憂せず長期的な資産形成が可能に。
                            </p>
                        </div>

                        <div className="bg-gray-700 bg-opacity-20 p-4 rounded-lg mt-6">
                            <p className="text-center font-medium text-yellow-300">
                                💡 NISAで株式インデックスファンドを積み立てている方へ
                            </p>
                            <p className="text-sm text-center">
                                ビットコインも同様に長期視点で見ることで、
                                ポートフォリオの分散と成長性を高める選択肢になります。
                                月々の積立をNISAとビットコインで分散するアプローチも検討してみましょう。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 限界と留意事項 - より読みやすく */}
                <section id="limitations" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                        モデルの限界：過信は禁物です
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローモデルは便利なツールですが、万能ではありません。以下の点に注意しましょう：
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1 flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-2"></span>
                                    短期予測には不向き
                                </h3>
                                <p className="text-xs">
                                    数週間〜数ヶ月の短期的な価格予測には適していません。
                                    あくまで数年単位の長期的な視点で活用しましょう。
                                </p>
                            </div>

                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1 flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-2"></span>
                                    過去データに基づく限界
                                </h3>
                                <p className="text-xs">
                                    「過去のパターンが将来も続く」という前提に基づいています。
                                    これは必ずしも保証されていません。
                                </p>
                            </div>

                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1 flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-2"></span>
                                    外部要因の影響
                                </h3>
                                <p className="text-xs">
                                    大規模な規制変更、技術革新、経済危機などの
                                    外部要因によって価格が大きく変動する可能性があります。
                                </p>
                            </div>

                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1 flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-2"></span>
                                    成長の限界
                                </h3>
                                <p className="text-xs">
                                    いずれ市場の成熟に伴い、パワーロー的な成長が
                                    鈍化または変化する可能性も考慮すべきです。
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-900 bg-opacity-20 p-4 rounded-lg mt-4 border border-yellow-700">
                            <p className="text-center text-yellow-300 font-medium">
                                ⚠️ 重要な注意点
                            </p>
                            <p className="text-sm text-center">
                                パワーローモデルは投資判断における「唯一の根拠」にすべきではありません。
                                他の情報源や分析手法と組み合わせて、総合的に判断しましょう。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 参考文献部分 - より親しみやすく */}
                <section id="references" className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <BookOpen className="h-5 w-5 mr-2" /> もっと詳しく知りたい方へ
                    </h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4 ${colors.cardBorder}`}>
                        <p className="mb-4">
                            パワーローモデルについてさらに深く学びたい方は、以下の記事や資料がおすすめです：
                        </p>
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
                                        物理学者によるビットコインのパワーロー理論の詳細解説（英語）
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 text-blue-400" />
                                <div>
                                    <a
                                        href="https://hcburger.com/blog/powerlaw/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors font-medium"
                                    >
                                        "Bitcoin's Growth Corridor" - HC Burger (2019)
                                    </a>
                                    <p className={`${typography.small} ${colors.textMuted} mt-1`}>
                                        パワーローモデルの初期研究と投資戦略への応用（英語）
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-6 text-center">
                            <Link
                                to="/simulators/investment"
                                className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                            >
                                積立シミュレーターで自分の戦略を試す
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* フッター部分 */}
                <footer className="text-center text-gray-400 mt-12 py-4 border-t border-gray-700">
                    <p>
                        © {new Date().getFullYear()} ビットコイン長期投資研究所{' '}
                        <a
                            href="https://x.com/DrPowerLaw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors"
                        >
                            @DrPowerLaw
                        </a>
                        . All rights reserved.
                    </p>
                    <p className={`${typography.small} mt-2`}>
                        免責事項：本ページの内容は情報提供のみを目的としており、投資助言ではありません。投資に関する決定はご自身の判断と責任で行ってください。
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default PowerLawExplanation;
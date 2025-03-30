// src/pages/PowerLawExplanation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle } from 'lucide-react';

interface PowerLawExplanationProps {
    chartComponent: React.ReactNode;
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
    // 「非常に割高」を示す色を追加（例：オレンジ系）
    veryHighRisk: 'text-orange-400',
};

const PowerLawExplanation: React.FC<PowerLawExplanationProps> = ({ chartComponent }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header and other sections remain the same as the previous revision */}
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} ${colors.info} mb-4`}>
                        ビットコイン価格の長期的傾向：パワーローモデルによる分析
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        複雑に見えるビットコインの価格変動の背後にある、長期的な成長パターンを捉える「パワーローモデル」について解説します。
                        これは将来の価格を保証するものではありませんが、過去の価格推移を理解し、長期投資戦略を考察する上での一つの視点を提供します。
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center mt-4 text-[#3B82F6] hover:text-[#2b6cb0] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                {/* Section: What is Power Law (No changes needed from previous revision) */}
                <section id="what-is-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        パワーロー（べき乗則）とは？ - スケール不変な関係性
                    </h2>
                    {/* Content remains the same */}
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーロー（Power Law）、またはべき乗則とは、一方の量が他方の量の「べき乗」に比例する関係を示す数理モデルです。
                            式で表すと <code className="text-sm bg-gray-700 px-1 rounded">Y = c * X^k</code> のような形になります（YとXが変数、cとkが定数）。
                            特徴的なのは、スケール（規模）が変わっても同じ法則性が保たれる「スケール不変性」を持つ点です。
                        </p>
                        <p>
                            身近な例では、都市の人口分布（少数の大都市と多数の小都市）、地震の規模と発生頻度（マグニチュードが大きいほど頻度が指数関数的に減少）、ウェブサイトの被リンク数など、自然界や社会現象の中に広く観察されます。
                            多くの場合、「大きいものは少なく、小さいものは非常に多い」という分布を示します。
                        </p>
                        <p>
                            対数-対数グラフ（両軸を対数スケールにしたグラフ)上でプロットすると、パワーローの関係は直線として現れるため、データの背後にある法則性を見出しやすくなります。
                        </p>
                        <p className={`${typography.small} ${colors.textMuted}`}>
                            要点：パワーローは、特定の要素が他の要素のべき乗に比例して変化する関係性を示し、多くの場合、極端な値が少なく、平均的な値が多い正規分布とは異なる分布パターン（裾の重い分布）を示します。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/bitcoin-basics"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            ビットコイン投資の基礎を再確認する{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                {/* Section: Bitcoin and Power Law Model (No changes needed from previous revision) */}
                <section id="bitcoin-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        ビットコイン価格とパワーローモデル
                    </h2>
                    {/* Content remains the same */}
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            ビットコインの長期的な価格推移が、経過時間を変数とするパワーローモデルによく適合するという分析結果が複数の研究者によって報告されています。
                            特に物理学者のGiovanni Santostasi氏は、ビットコインの価格が時間の約6乗 <code className="text-sm bg-gray-700 px-1 rounded">(t^5.8)</code> に比例する傾向があると指摘しました（2024年時点）。
                        </p>
                        <p>
                            このモデルは、時間が経過するにつれて価格の上昇ペースは（指数関数的に）鈍化しつつも、対数スケール上では安定した上昇トレンドを描くことを示唆します。
                            Santostasi氏はこの背景として、以下の3つの要因が相互作用するポジティブフィードバックループを考察しています。
                        </p>
                        <ul className="list-disc list-inside space-y-3 pl-4">
                            <li>
                                <strong className="font-semibold text-gray-100">ネットワーク効果 (Metcalfe's Law):</strong> ネットワークの価値は利用者の2乗に比例するという法則。ビットコインの利用者が増えることで、その有用性と価値が指数関数的に向上する可能性を示唆します。
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-100">供給の安定性 (Difficulty Adjustment):</strong> ビットコインの新規発行（マイニング）は、約10分に1ブロックというペースが維持されるよう難易度が自動調整されます。これにより、価格急騰時にも供給量が急増せず、希少性が保たれます。
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-100">セキュリティと信頼性:</strong> 分散型ネットワークによる改ざん耐性や運用実績が信頼性を高め、さらなる利用者の参加を促進する要因となります。
                            </li>
                        </ul>
                        <p>
                            これらの要因が複合的に作用し、ビットコインの価値と採用が自己強化的に拡大していくプロセスが、長期的なパワーロー成長パターンを生み出している可能性がある、というのがこのモデルの理論的根拠の一つです。
                        </p>
                        <p className={`${typography.small} ${colors.textMuted}`}>
                            要点：ビットコインの価格成長は、ネットワーク効果、供給メカニズム、信頼性といった要因が相互に作用し、パワーローの関係に従って長期的に進展している、という仮説モデルが存在します。
                        </p>
                    </div>
                </section>

                {/* Section: Power Law Chart Interpretation (MODIFIED) */}
                <section id="power-law-chart" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローチャートの解釈：長期トレンドの可視化
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            以下のチャートは、ビットコインの価格履歴を両対数グラフ（時間軸、価格軸ともに対数スケール）上にプロットし、パワーローモデルの回帰線（中央線）と、その下方に統計的な変動範囲を示すバンド（下限線）を描画したものです。
                            {/* 上限線に関する言及を削除 */}
                        </p>
                        <p>
                            対数スケールを用いることで、価格の絶対額ではなく「変化率」に着目しやすくなり、指数関数的な成長も明確なトレンドとして捉えることができます。これにより、長期的な価格動向のパターン分析が可能になります。
                        </p>
                        <p>
                            このチャートにおける各ラインやラベルの一般的な解釈は以下の通りです。
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <strong className="font-semibold text-green-400">中央価格線（緑）:</strong> パワーローモデルに基づく、長期的な理論価格の中心的な推移を示します。
                            </li>
                            <li>
                                <strong className="font-semibold text-red-400">下限価格線（赤）:</strong> 過去の価格が統計的に下回ることが少なかったとされる水準。長期的なサポートラインとして捉えられることがあります。
                            </li>
                            {/* 上限価格線の項目を削除 */}
                            {/* 必要であれば「非常に割高」ラベル等の説明を追加 */}
                            {/* 例:
                            <li>
                                <strong className="font-semibold ${colors.veryHighRisk}">「非常に割高」ラベル:</strong> 価格がモデルに対して統計的に著しく高い水準に達していることを示唆します。（※チャートの実装に応じて表現を調整）
                            </li>
                             */}
                        </ul>
                        {/* チャートコンポーネントがここに挿入されます */}
                        {chartComponent}
                        <p className={`${typography.small} ${colors.textMuted} mt-4`}>
                            注：このチャートは過去のデータに基づいて描画されており、将来の価格を保証するものではありません。あくまで長期的な傾向を把握するための参考情報としてご利用ください。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/analysis-news" // このリンク先は適切か確認してください
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            最新の市場分析情報へ{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                {/* Section: Investment Application (MODIFIED) */}
                <section id="investment-application" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローモデルの投資戦略への応用可能性
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローモデルは、ビットコインの長期的な価値評価や投資タイミングを検討する上での一つの判断材料となり得ます。
                            例えば、チャート上の価格の位置やラベル（例：「非常に割安」「適正」「非常に割高」など、チャートに表示される場合）を利用した戦略が考えられます。
                        </p>
                        <p>
                            過去のデータに基づけば、以下のようなアプローチが示唆されます。
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <strong className="font-semibold text-green-400">下限価格線付近または「非常に割安」水準での買い増し検討:</strong> 価格が長期的なサポートラインや統計的に見て低い水準（例：「非常に割安」ラベル）に近づいた場合、長期保有目的での買い増しを検討する戦略。
                            </li>
                            <li>
                                {/* 上限価格線の項目を修正 */}
                                <strong className={`font-semibold ${colors.veryHighRisk}`}>「非常に割高」水準での一部利益確定検討:</strong> 価格がパワーローモデルに対して統計的に見て著しく高い水準（例：「非常に割高」ラベルが表示される場合など）に達した際には、リスク管理の観点から保有ポジションの一部を利益確定することを検討する戦略。
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-100">中央価格線を目安としたドルコスト平均法:</strong> 短期的な価格変動に左右されず、長期的な成長トレンドに沿って定期的に一定額を投資する（積み立てる）戦略。
                            </li>
                        </ul>
                        <p>
                            例えば、インデックスファンド（S&P500など）をNISA等で長期積み立て投資している方であれば、ビットコインについても同様に、ポートフォリオの一部として長期的な視点で捉え、パワーローモデルを時間分散のタイミング検討に役立てることも考えられます。
                        </p>
                        <p className={`${typography.small} ${colors.textMuted}`}>
                            要点：パワーローモデルはエントリーやエグジットの絶対的なシグナルではありませんが、長期的な価格水準の目安を提供し、感情に左右されない規律ある投資判断の一助となる可能性があります。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/simulators/investment" // このリンク先は適切か確認してください
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            投資シミュレーションで戦略を検証する{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                {/* Section: Limitations (No changes needed from previous revision) */}
                <section id="limitations" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                        パワーローモデルの限界と留意事項
                    </h2>
                    {/* Content remains the same */}
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローモデルは有用な分析ツールですが、その限界と利用上の注意点を理解しておくことが極めて重要です。
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <strong className="font-semibold text-yellow-300">長期トレンド分析用モデル:</strong> 短期的な価格予測には適していません。あくまで数年単位の長期的な視点での分析に用いるべきです。
                            </li>
                            <li>
                                <strong className="font-semibold text-yellow-300">過去データへの依存:</strong> モデルは過去の価格データに基づいて構築されており、将来も同様のパターンが継続する保証はありません。「過去のパフォーマンスは将来の結果を示すものではない」という原則を念頭に置く必要があります。
                            </li>
                            <li>
                                <strong className="font-semibold text-yellow-300">外部要因の影響:</strong> 大規模な規制変更、技術的なブレークスルー、マクロ経済環境の激変など、モデルが想定していない外部要因によって、価格がモデルから乖離する可能性があります。
                            </li>
                            <li>
                                <strong className="font-semibold text-yellow-300">成長の飽和可能性:</strong> あらゆる成長には限界があり、ビットコインの普及率や市場規模がある段階に達すれば、パワーロー的な成長が鈍化または終焉する可能性も考慮すべきです（Sカーブへの移行など）。
                            </li>
                            <li>
                                <strong className="font-semibold text-yellow-300">モデルの妥当性と更新:</strong> パワーローモデル自体の妥当性やパラメータ（べき指数など）は、研究者によって見解が異なる場合があり、また新しいデータに基づいて更新される可能性があります。
                            </li>
                        </ul>
                        <p>
                            したがって、パワーローモデルは投資判断における唯一の根拠とすべきではなく、ファンダメンタルズ分析、市場センチメント、その他のテクニカル指標など、複数の情報を組み合わせて総合的に判断することが賢明です。
                        </p>
                        <p className={`${typography.small} ${colors.textMuted}`}>
                            要点：パワーローモデルは未来を確定的に予測するものではなく、あくまで過去のデータに基づく確率的な傾向を示す分析ツールの一つです。その限界を認識し、他の情報源と併用することが重要です。
                        </p>
                    </div>
                </section>

                {/* References and Footer remain the same as the previous revision */}
                <section id="references" className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} ${colors.info} mb-4`}>参考文献・関連情報</h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4 ${colors.cardBorder}`}>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://giovannisantostasi.medium.com/the-bitcoin-power-law-theory-962dfaf99ee9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors font-medium"
                                >
                                    "The Bitcoin Power Law Theory" - Giovanni Santostasi (2024)
                                </a>
                                <p className={`${typography.small} ${colors.textMuted} mt-1 pl-4`}>
                                    ビットコイン価格とパワーローの関係性に関する物理学的な考察。
                                </p>
                            </li>
                            <li>
                                <a
                                    href="https://hcburger.com/blog/powerlaw/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors font-medium"
                                >
                                    "Bitcoin's Natural Long-Term Power-Law Corridor of Growth" - HC Burger (2019)
                                </a>
                                <p className={`${typography.small} ${colors.textMuted} mt-1 pl-4`}>
                                    パワーローモデルに基づく成長回廊と投資戦略への応用に関する初期の研究。
                                </p>
                            </li>
                            <li>
                                <a
                                    href="https://www.investopedia.com/metcalfe-s-law-5202864"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3B82F6] hover:text-[#2b6cb0] transition-colors font-medium"
                                >
                                    "Metcalfe's Law" - Investopedia
                                </a>
                                <p className={`${typography.small} ${colors.textMuted} mt-1 pl-4`}>
                                    ネットワーク効果の基本概念に関する解説。
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>

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
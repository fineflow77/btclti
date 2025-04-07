import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle, BookOpen, ArrowRight } from 'lucide-react';

// Props interface: chartComponentは任意で柔軟性を持たせる
interface PowerLawExplanationProps {
    chartComponent?: React.ReactNode;
}

// スタイル設定
const typography = {
    h1: 'text-3xl sm:text-4xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
};

const colors = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    cardBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    accent: 'text-cyan-300',
    accentHover: 'hover:text-cyan-400',
    warning: 'text-yellow-400',
};

const PowerLawExplanation = ({ chartComponent }: PowerLawExplanationProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ヘッダー */}
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} ${colors.accent} mb-4`}>
                        ビットコインの長期トレンドを読み解く：パワーローで見る成長パターン
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        私は元トレーダーのリュウです。2017年、ビットコイン投資を始めた当初、私は株式投資と同じ短期トレードの手法で挑みました。しかし、1週間で価格が30%下落し、資金の半分を失うという苦い失敗を経験しました。「このままではいけない」と、値動きを徹底的に研究した結果、パワーロー（Power Law）という長期的な成長パターンにたどり着きました。パワーローは、データに基づく科学的なアプローチで、価格のトレンドを読み解く強力なツールです。暴落局面でも焦る必要はありません。私の経験とデータ分析を通じて、未来を見据えた投資戦略を一緒に考えましょう。まずはシミュレーターで、あなたの投資プランを試してみませんか？
                    </p>
                    <div className="mt-5">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-transform hover:scale-105 shadow-lg`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                    <Link to="/" className={`inline-flex items-center mt-4 ${colors.accent} ${colors.accentHover} transition-colors`}>
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                {/* パワーローとは */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-6 w-6 mr-2 text-cyan-300" />
                        パワーローとは？長期投資を支える科学的な法則
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローとは、ある値が別の値の「何乗」に比例して変化する関係を表す数学的な法則です。自然界や社会現象で広く見られるパターンであり、シンプルながら強力な予測力を発揮します。
                        </p>
                        <p>たとえば、こんな場面でパワーローが現れます：</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>SNSのフォロワー数：人気アカウントは少数ですが、その影響力は圧倒的</li>
                            <li>都市の人口：大都市は少なく、小さな町は多い</li>
                            <li>地震の規模：大きな地震ほど発生頻度が極端に減る</li>
                        </ul>
                        <p>
                            私がビットコインの値動きを研究する中でたどり着いたのが、このパワーローです。過去のデータから導き出される成長パターンを理解することで、長期投資の戦略を立てる手がかりが得られます。パワーローの決定係数（R²）は0.95と非常に高く、過去の価格データとの高い適合性を示しています。これは、パワーローがビットコインの長期トレンドを説明する信頼性の高いモデルであることを意味します。
                        </p>
                    </div>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* ビットコインとパワーロー */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-6 w-6 mr-2 text-cyan-300" />
                        なぜビットコインにパワーローが関係するのか
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            過去10年以上のデータ分析から、ビットコインの価格は時間とともに独特の成長パターンを描いていることがわかっています。研究者のGiovanni Santostasi氏は、このパターンが「時間の約6乗」に比例すると指摘しています。つまり、時間が経つにつれて価格の上昇スピードは緩やかになりますが、長期的に見れば安定した成長が期待できるのです。
                        </p>
                        <p>
                            私がデータ分析を通じて導き出したシナリオでは、パワーロー予測に基づけば、2035年には1BTCが3億円に到達する可能性があります。1990年代にインターネットが社会を変革したように、ビットコインも長期的な普及が進み、ビットコインスタンダードとして社会に根付く可能性が議論されています。この成長パターンの背景には、次の3つの要素が関係しています：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-cyan-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🌐</span> ネットワーク効果
                                </h3>
                                <p className="text-sm">
                                    利用者が増えるほど価値が上昇する仕組み。電話網と同じく、参加者が多いほど有用性が高まります。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-cyan-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">⛏️</span> 供給の安定性
                                </h3>
                                <p className="text-sm">
                                    ビットコインの発行量は最大2,100万枚に制限されており、過剰な供給による価値の希薄化が起こりにくい構造です。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-cyan-300 font-semibold mb-2 flex items-center">
                                    <span className="mr-2">🔐</span> セキュリティの向上
                                </h3>
                                <p className="text-sm">
                                    ネットワークが拡大するにつれて安全性が高まり、信頼性が向上する好循環が生まれます。
                                </p>
                            </div>
                        </div>
                        <p>
                            パワーローは、これらの要素が絡み合った結果として、ビットコインの長期的な成長パターンを説明するツールとなります。シミュレーターで、この成長パターンを基にした投資プランを試してみましょう。
                        </p>
                    </div>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* チャートの見方 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-6 w-6 mr-2 text-cyan-300" />
                        パワーローチャートの見方：長期トレンドを把握
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローチャートは、ビットコインの価格を対数スケールで表したものです。対数スケールでは、10倍や100倍の価格差が同じ感覚で視覚化されるため、長期的なトレンドを把握しやすくなります。
                        </p>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-yellow-300 font-semibold mb-2">ポイント解説</h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    <span className="font-semibold text-green-400">緑の線（中央線）</span>：長期的な「目安価格」を示します。
                                </li>
                                <li>
                                    <span className="font-semibold text-red-400">赤の線（下限線）</span>：過去のデータであまり下がらなかった「底値目安」を示します。
                                </li>
                                <li>
                                    <span className="font-semibold text-amber-300">現在の価格</span>：価格がトレンドのどの位置にあるかを示します。
                                </li>
                            </ul>
                        </div>
                        <p>
                            リュウからのアドバイス：私が2017年の失敗から学んだのは、短期的な変動に惑わされず、長期的な視点を持つことの重要性です。価格が赤い下限線に近づいた場合、長期投資家にとって買い増しのチャンスと考えることができます。一方、緑の線から大きく乖離した場合は、過熱している可能性があり、利益確定のタイミングを検討する目安となります。パワーローチャートを活用すれば、価格の変動に一喜一憂せず、長期的な視点で投資戦略を立てることが可能です。シミュレーターで、あなたの投資プランを試してみましょう。
                        </p>
                        {/* chartComponentが渡されていれば表示、なければ何も表示しない */}
                        {chartComponent && <div className="mt-4">{chartComponent}</div>}
                    </div>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* 投資への活用 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-6 w-6 mr-2 text-cyan-300" />
                        投資にどう活かすか：長期的な視点で戦略を
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            私がトレーダー時代に学んだのは、価格の変動に一喜一憂せず、長期的な視点で続けることの重要性です。パワーローを活用した投資戦略を以下にまとめました。
                        </p>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">🛒</span> 1. 安い時に少しずつ買う
                            </h3>
                            <p>
                                価格が赤い下限線に近づいたタイミングは、長期的な視点での買い増しを検討するチャンスです。たとえば、2017年に下限値付近でビットコインを購入した投資家は、2021年の高騰時に大きな利益を得ました。私自身、2018年の下落局面でパワーローを参考に買い増しを続け、2021年に資産を大きく増やすことができました。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-orange-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">💰</span> 2. 高騰時に一部を調整
                            </h3>
                            <p>
                                価格が緑の中央線から大きく乖離した場合、一部を売却して利益を確保するのも一つの戦略です。2017年末のような急騰後に調整が入った事例を参考に、冷静な判断が求められます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-cyan-300 font-semibold mb-2 flex items-center">
                                <span className="mr-2">⏱️</span> 3. 毎月コツコツ積み立て
                            </h3>
                            <p>
                                価格のタイミングを完璧に予測することは困難です。NISAのように毎月一定額を積み立てることで、価格の変動リスクを抑えつつ、長期的な成長に備えることができます。まずは0.1 BTCを目指して積み立てを始めてみましょう。0.1 BTCを達成した後、取り崩しシミュレーターで未来の生活を試算してみてください。たとえば、2035年に0.1 BTCが3,000万円相当になった場合、30年間で均等に取り崩せば月額約8.3万円。生活の質を向上させる夢の第一歩が、ここから始まります。
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            取り崩しシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* 注意点 */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <AlertTriangle className="h-6 w-6 mr-2 ${colors.warning}" />
                        注意しておきたいこと：リスクを理解する
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは長期投資の有用な目安ですが、万能ではありません。以下の点に留意してください：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">短期予測の難しさ</h3>
                                <p className="text-xs">
                                    数ヶ月先の価格変動を予測するのは困難です。あくまで数年単位のトレンドを参考にしてください。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">過去データへの依存</h3>
                                <p className="text-xs">
                                    パワーローは過去のデータに基づいています。未来も同じパターンをたどるとは限りません。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">外部要因の影響</h3>
                                <p className="text-xs">
                                    規制や経済環境の変化が価格に影響を与える可能性があります。
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">
                            価格の変動が気になる場合は、少額から始めて様子を見ることが賢明です。長期的な視点で、少しずつ慣れていくことをおすすめします。
                        </p>
                    </div>
                </section>

                {/* 参考情報 */}
                <section className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <BookOpen className="h-6 w-6 mr-2 text-cyan-300" /> もっと知りたいときは：学びを深めるリソース
                    </h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4 ${colors.cardBorder}`}>
                        <p>リュウです。さらに詳しく知りたい方は、以下のリソースを参考にしてください：</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <BookOpen className="h-5 w-5 mr-2 flex-shrink-0 text-cyan-300" />
                                <div>
                                    <a
                                        href="https://giovannisantostasi.medium.com/the-bitcoin-power-law-theory-962dfaf99ee9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${colors.accent} ${colors.accentHover} transition-colors font-medium`}
                                    >
                                        "The Bitcoin Power Law Theory" - Giovanni Santostasi (2024)
                                    </a>
                                    <p className={`${typography.small} ${colors.textMuted} mt-1`}>
                                        パワーローの詳細な解説（英語）
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <p>
                            NISAの次を考えるあなたへ。私の運営するビットコイン長期投資ラボで、FIREシミュレーションを試してみませんか？
                        </p>
                        <div className="mt-6 text-center">
                            <Link
                                to="/simulators/investment"
                                className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-transform hover:scale-105 shadow-lg`}
                            >
                                積み立てを試してみる <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PowerLawExplanation;
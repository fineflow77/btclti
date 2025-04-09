import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle, BookOpen, ArrowRight, CloudLightning } from 'lucide-react'; // Added CloudLightning icon for bubbles

// Props interface: chartComponentは任意で柔軟性を持たせる
interface PowerLawExplanationProps {
    chartComponent?: React.ReactNode;
}

// スタイル設定 - Updated Color Palette and Typography
const typography = {
    h1: 'text-3xl sm:text-4xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
};

const colors = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white', // Softer primary color
    cardBg: 'bg-gray-800', // Solid dark background for cards
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400', // Softer secondary text
    textMuted: 'text-gray-500',
    accent: 'text-blue-400', // Softer accent color
    accentHover: 'hover:text-blue-300',
    warning: 'text-yellow-400',
};


const PowerLawExplanation = ({ chartComponent }: PowerLawExplanationProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100"> {/* Darker background */}
            <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-8 py-12"> {/* Reduced max-width for better readability and removed sm:px-6 */}
                {/* ヘッダー */}
                <header className="mb-12"> {/* Removed text-center from header */}
                    <h1 className={`${typography.h1} ${colors.accent} mb-4`}>
                        ビットコインの長期トレンド：パワーロー理論で成長パターンを解説
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        2017年にビットコイン投資を始めた当初、短期トレードで失敗しました。しかし、徹底的な研究の結果、パワーロー（Power Law）という長期的な成長パターンにたどり着きました。パワーローは、データに基づいた科学的なアプローチで、価格のトレンドを読み解く強力なツールです。暴落局面でも冷静さを保ち、長期的な視点で投資戦略を立てるために、パワーロー理論を一緒に見ていきましょう。まずはシミュレーターで、あなたの投資プランを試してみませんか？
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
                        <Info className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        パワーローとは？長期投資を支える科学的な法則
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローとは、ある値が別の値の「何乗」に比例して変化する関係を示す数学的な法則です。自然界や社会現象で広く見られるパターンであり、シンプルながら強力な予測力を持っています。
                        </p>
                        <p>たとえば、以下のような現象にパワーローが見られます：</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>SNSのフォロワー数：人気アカウントは少数ですが、影響力は大きい</li>
                            <li>都市の人口：大都市は少なく、小さな町は多い</li>
                            <li>地震の規模：大きな地震ほど発生頻度が低い</li>
                        </ul>
                        <p>
                            ビットコインの値動きを研究する中で、このパワーローに着目しました。過去のデータから導き出される成長パターンを理解することで、長期投資戦略を立てる手がかりが得られます。パワーローの決定係数（R²）は0.95と高く、過去の価格データとの高い適合性を示しています。これは、パワーローがビットコインの長期トレンドを説明する上で信頼性の高いモデルであることを意味します。
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
                        <TrendingUp className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        なぜビットコインにパワーローが関係するのか
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            過去10年以上のデータ分析から、ビットコインの価格は時間とともに特有の成長パターンを描いていることがわかっています。研究者のGiovanni Santostasi氏は、このパターンが「時間の約6乗」に比例すると指摘しています。時間が経過するにつれて価格の上昇速度は緩やかになりますが、長期的に見れば安定した成長が期待できます。
                        </p>
                        <p>
                            データ分析に基づいたシナリオでは、パワーロー予測により、2035年には1BTCが3億円に達する可能性があります。1990年代にインターネットが社会を変革したように、ビットコインも長期的な普及が進み、ビットコインスタンダードとして社会に根付く可能性が議論されています。この成長パターンの背景には、以下の3つの要素があります：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center"> {/* Updated accent color */}
                                    <span className="mr-2">🌐</span> ネットワーク効果
                                </h3>
                                <p className="text-sm">
                                    利用者が増えるほど価値が向上する仕組み。電話網と同様に、参加者が多いほど有用性が高まります。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center"> {/* Updated accent color */}
                                    <span className="mr-2">⛏️</span> 供給の安定性
                                </h3>
                                <p className="text-sm">
                                    ビットコインの発行量は最大2,100万枚に制限されており、過剰な供給による価値の希薄化が起こりにくい構造です。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                                <h3 className="text-blue-300 font-semibold mb-2 flex items-center"> {/* Updated accent color */}
                                    <span className="mr-2">🔐</span> セキュリティの向上
                                </h3>
                                <p className="text-sm">
                                    ネットワークが拡大するにつれて安全性が高まり、信頼性が向上する好循環が生まれます。
                                </p>
                            </div>
                        </div>
                        <p>
                            パワーローは、これらの要素が複合的に作用し、ビットコインの長期的な成長パターンを説明するのに役立ちます。シミュレーターで、この成長パターンに基づいた投資プランを試してみましょう。
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

                {/* バブル発生と収束のメカニズム */}
                <section className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <CloudLightning className="h-6 w-6 mr-2 text-blue-300" /> {/* CloudLightning icon for bubble */}
                        バブル発生、収束のメカニズム：マイニング報酬と市場心理
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            ビットコインの価格は、過去に何度か大きなバブルとその崩壊を経験しています。この背景には、ビットコイン特有の供給メカニズムと市場心理が深く関わっています。特に、マイニング報酬の半減期（半減期）は、バブル発生の重要なトリガーとなることがあります。
                        </p>
                        <h3 className={`${typography.h2} ${colors.accent} mb-2`}>バブル発生のメカニズム</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>
                                <span className="font-semibold text-blue-300">マイニング報酬の半減期（半減期）：</span>
                                ビットコインは約4年に一度、新規発行量が半減する半減期を迎えます。これは供給量を絞り込む要因となり、希少性を高める効果があります。
                            </li>
                            <li>
                                <span className="font-semibold text-blue-300">供給ショックと価格上昇期待：</span>
                                半減期によって供給量が減少すると、市場は供給ショックを感じ、価格上昇への期待が高まります。
                            </li>
                            <li>
                                <span className="font-semibold text-blue-300">メディア報道と新規参入：</span>
                                価格上昇が始まると、メディアで大きく報道され、これまでビットコインを知らなかった層も「乗り遅れ不安（FOMO）」から市場に参入し始めます。
                            </li>
                            <li>
                                <span className="font-semibold text-blue-300">価格の急騰とバブルの形成：</span>
                                新規参入者の増加と更なる価格上昇期待が連鎖的に作用し、価格は短期間で急騰、バブルが形成されます。
                            </li>
                        </ul>

                        <h3 className={`${typography.h2} ${colors.accent} mt-4 mb-2`}>バブル収束のメカニズム</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>
                                <span className="font-semibold text-red-400">利益確定の動き：</span>
                                価格が過度に上昇すると、初期から保有している投資家や短期トレーダーが利益確定のために売り始めます。
                            </li>
                            <li>
                                <span className="font-semibold text-red-400">市場心理の悪化：</span>
                                価格上昇の勢いが鈍化したり、下落に転じると、市場心理は急速に悪化します。「まだ上がる」という楽観的な見方が薄れ、「下落するかもしれない」という不安が広がります。
                            </li>
                            <li>
                                <span className="font-semibold text-red-400">投げ売りと価格の暴落：</span>
                                不安が先行すると、さらなる価格下落を恐れた投資家が一斉に売り始め、投げ売り状態となり、価格は暴落します。
                            </li>
                            <li>
                                <span className="font-semibold text-red-400">長期的な成長トレンドへの回帰：</span>
                                バブル崩壊後、価格は大きく調整されますが、ビットコインの長期的な成長トレンドは依然として存在します。パワーロー理論が示すように、時間をかけて再び成長軌道に戻ることが期待されます。
                            </li>
                        </ul>
                        <p className="mt-4">
                            バブルの発生と収束は、短期的な価格変動の激しさを生み出しますが、長期投資の視点で見れば、一時的な現象と捉えることができます。パワーローチャートを活用し、冷静に市場を観察することが重要です。
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
                        <TrendingUp className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        パワーローチャートの見方：長期トレンドを把握
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローチャートは、ビットコインの価格を対数スケールで表示したものです。対数スケールでは、10倍や100倍の価格差が同じ間隔で視覚化されるため、長期的なトレンドを把握しやすくなります。
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
                            短期的な価格変動に惑わされず、長期的な視点を持つことが重要です。価格が赤い下限線に近づいた場合、長期投資家にとっては買い増しの好機と考えられます。一方、緑の線から大きく上方に乖離した場合は、過熱している可能性があり、利益確定を検討する目安となります。パワーローチャートを活用することで、価格変動に一喜一憂せず、長期的な視点で投資戦略を立てることが可能です。シミュレーターで、あなたの投資プランを試してみましょう。
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
                        <TrendingUp className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        投資への応用：長期的な視点で戦略を立てる
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            価格の短期的な変動に惑わされず、長期的な視点を持ち続けることが重要です。パワーローを活用した投資戦略を以下にまとめました。
                        </p>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">🛒</span> 1. 安値圏で買い増し
                            </h3>
                            <p>
                                価格が赤い下限線に近づいた際は、長期的な視点での買い増しを検討するチャンスです。例えば、2017年に下限値付近でビットコインを購入した投資家は、2021年の価格高騰時に大きな利益を得ました。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-orange-400 font-semibold mb-2 flex items-center">
                                <span className="mr-2">💰</span> 2. 高値圏で一部利益確定を検討
                            </h3>
                            <p>
                                価格が緑の中央線から大きく上方に乖離した場合は、一部を売却して利益を確保することも戦略の一つです。2017年末のような急騰後の価格調整事例を参考に、冷静な判断を行いましょう。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                            <h3 className="text-blue-300 font-semibold mb-2 flex items-center"> {/* Updated accent color */}
                                <span className="mr-2">⏱️</span> 3. 毎月着実に積み立てる
                            </h3>
                            <p>
                                価格のタイミングを完璧に予測することは困難です。NISAのように毎月一定額を積み立てることで、価格変動のリスクを抑えながら、長期的な成長に備えることができます。まずは0.1 BTCを目標に積み立てを始めてみましょう。0.1 BTC達成後は、取り崩しシミュレーターで将来の生活を試算してみてください。例えば、2035年に0.1 BTCが3,000万円相当になった場合、30年間で均等に取り崩せば月額約8.3万円となります。
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 text-right">
                        {/* Corrected link to withdrawal simulator */}
                        <Link
                            to="/simulators/withdrawal"
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
                        注意点：リスクを理解する
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは長期投資の参考になりますが、絶対的なものではありません。以下の点に留意が必要です：
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">短期予測は困難</h3>
                                <p className="text-xs">
                                    数ヶ月先の価格変動を予測することは難しく、数年単位のトレンドを参考にしてください。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">過去データに基づくモデル</h3>
                                <p className="text-xs">
                                    パワーローは過去のデータに基づいています。将来も同じパターンに従うとは限りません。
                                </p>
                            </div>
                            <div className="bg-gray-700 bg-opacity-30 p-3 rounded-lg">
                                <h3 className="text-yellow-300 font-semibold text-sm mb-1">外部要因に注意</h3>
                                <p className="text-xs">
                                    規制や経済環境の変化が価格に影響を与える可能性があります。
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">
                            価格変動が気になる場合は、少額から始めて様子を見るのが賢明です。長期的な視点で、徐々に慣れていくことをお勧めします。
                        </p>
                    </div>
                </section>

                {/* 参考情報 */}
                <section className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <BookOpen className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        さらに詳しく知りたい方へ：参考情報
                    </h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4 ${colors.cardBorder}`}>
                        <p>さらに詳しく知りたい方は、以下の情報源も参考にしてください：</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <BookOpen className="h-5 w-5 mr-2 flex-shrink-0 text-blue-300" /> {/* Updated accent color */}
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
                                        パワーローに関する詳細な解説（英語）
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <p>
                            NISAの次を検討されている方へ。ビットコイン長期投資について、さらに理解を深めてみませんか？
                        </p>
                        <div className="mt-6 text-center">
                            <Link
                                to="/simulators/investment"
                                className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-transform hover:scale-105 shadow-lg`}
                            >
                                積み立てシミュレーションを試してみる <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PowerLawExplanation;
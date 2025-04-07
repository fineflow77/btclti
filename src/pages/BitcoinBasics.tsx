import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp } from 'lucide-react';

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
    success: 'text-emerald-400',
    warning: 'text-amber-400',
};

const BitcoinBasics = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                {/* タイトルと導入 */}
                <div className="text-center">
                    <h1 className={`${typography.h1} ${colors.accent} mb-5`}>
                        ビットコイン投資の基本ガイド：NISAの次を見据えた資産形成
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary} max-w-3xl mx-auto`}>
                        私は元トレーダーのリュウです。NISAやiDeCoで投資を始め、さらなる資産形成を目指したいと考えているあなたへ。ビットコインは、長期的な視点で成長が期待されるデジタル資産として注目されています。しかし、価格の変動に不安を感じる方も多いのではないでしょうか。私自身、2017年にビットコイン投資を始めた当初、株式投資と同じ短期トレードの手法で挑み、1週間で価格が30%下落して資金の半分を失うという苦い失敗を経験しました。その後、値動きを徹底的に研究し、長期投資の知恵を身につけた私が、初心者でも安心して始められる方法をお伝えします。まずはシミュレーターで、あなたの資産形成プランを試してみませんか？
                    </p>
                    <div className="mt-5">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-transform hover:scale-105 shadow-lg`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* ビットコインとは */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-6 w-6 mr-2 text-cyan-300" />
                        ビットコインとは？未来を変えるデジタル資産
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは2009年に誕生したデジタル資産であり、中央銀行や政府を介さずにインターネット上で直接取引できる点が特徴です。1990年代にインターネットが社会を変革したように、ビットコインも新たな価値基準（ビットコインスタンダード）として普及する可能性が議論されています。ビットコインスタンダードとは、ビットコインが法定通貨に代わる経済システムの基盤となり、価値の保存手段として広く受け入れられるという考え方です。
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-cyan-300 font-semibold mb-2">決まった量しかない</h3>
                            <p className="text-sm">
                                最大2,100万枚しか発行されません。円やドルと違い増えすぎないので、希少性があります。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-cyan-300 font-semibold mb-2">どこでも使える</h3>
                            <p className="text-sm">
                                ネットがあれば世界中どこでも送金可能。手数料も安く、数分で済みます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-cyan-300 font-semibold mb-2">価値が減りにくい</h3>
                            <p className="text-sm">
                                発行量が限られているため、インフレで価値が落ちにくい。「デジタルゴールド」とも呼ばれます。
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                        <h3 className="text-cyan-300 font-semibold mb-2">まずは0.1 BTCを目指してみませんか？</h3>
                        <p className={`${typography.body} ${colors.textSecondary}`}>
                            ビットコインの総発行量は2,100万枚ですが、2023年時点で0.1 BTC以上を保有するアドレスは約350万のみ。世界人口80億人に対し、わずか0.04%程度しか達成していません。つまり、0.1 BTCを持つことは、世界でも非常に稀な存在になるということです。パワーロー予測（決定係数R²=0.95）に基づくシナリオでは、2035年に1 BTCが3億円に到達する可能性があります。この場合、0.1 BTCは3,000万円相当となり、日本の平均年収（約450万円）の約7年分に相当します。少額からコツコツ積み立てて、まずは0.1 BTCを目指すことで、未来の大きな可能性が広がるかもしれません。
                        </p>
                    </div>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        過去のデータを見ると、ビットコインは短期的な変動はあるものの、長期的に成長傾向を示しています。私の運営するビットコイン長期投資ラボでは、この成長パターンをシミュレーターで試算できます。まずは少額から始めて、その可能性を感じてみませんか？
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* 投資対象としてのポイント */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-6 w-6 mr-2 text-cyan-300" />
                        投資としてのメリットとリスク：バランスを理解する
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        リュウからのアドバイス：私が短期トレードで失敗した経験から学んだのは、ビットコインを投資対象として検討する際、メリットとリスクをバランスよく理解することの重要性です。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className={`${typography.h2} ${colors.success} mb-2`}>メリット</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>成長の可能性</strong>：ビットコインはまだ普及の初期段階にあり、企業や機関投資家の参入が進むことでさらなる価値向上が期待されます。
                                </li>
                                <li>
                                    <strong>インフレ対策</strong>：法定通貨と異なり、発行量が限られているため、インフレによる価値の減少リスクが低い資産です。
                                </li>
                                <li>
                                    <strong>ポートフォリオの分散</strong>：株式や債券とは異なる値動きをするため、分散投資の一環としてリスク軽減に寄与する可能性があります。
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.h2} ${colors.warning} mb-2`}>リスク</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>価格の変動性</strong>：短期間で大きく価格が上下することがあり、心理的な負担を感じる場合があります。
                                </li>
                                <li>
                                    <strong>規制リスク</strong>：各国政府の規制変更が価格や取引に影響を与える可能性があります。
                                </li>
                                <li>
                                    <strong>管理リスク</strong>：取引所のセキュリティ問題や、自己管理ミスによる資産の紛失リスクが存在します。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg mt-6 border border-blue-800">
                        <p className={`${typography.body} text-center ${colors.textPrimary}`}>
                            ビットコインの利益は総合課税の対象となり、最大55%の税率が適用される場合があります。ただし、将来的に分離課税が導入される可能性も議論されており、税制環境の変化が投資のハードルを下げるかもしれません。パワーロー（Power Law）に基づく長期的な成長パターンを知ることで、価格の変動に対する不安を軽減できます。詳しくはパワーロー解説ページをご覧ください。
                        </p>
                        <div className="mt-4 text-center">
                            <Link
                                to="/power-law-explanation"
                                className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                            >
                                パワーロー解説ページへ <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 始め方 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Shield className="h-6 w-6 mr-2 text-cyan-300" />
                        ビットコイン投資を始める3ステップ：安心してスタート
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        私がトレーダー時代に学んだのは、信頼できる基盤を築くことの重要性です。以下の3ステップで、ビットコイン投資を安心して始めましょう。
                    </p>
                    <div className="space-y-6">
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>1. 取引所で口座を開設</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                                金融庁に登録された日本の取引所を選びましょう。本人確認書類（運転免許証など）を用意すれば、数日で口座開設が可能です。
                            </p>
                            <div className="bg-gray-600 bg-opacity-40 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-cyan-300 mb-2">おすすめ取引所</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://coin.z.com/jp/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            GMOコイン
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">初心者に優しい操作性、積み立て機能あり</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://bitbank.cc/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            bitbank
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">手数料が安く、チャートが見やすい</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://bitflyer.com/ja-jp/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            bitFlyer
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">大手で安心、積み立てサービスも</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>2. 少額から積み立てを開始</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                毎月3,000円や5,000円から始めるのがおすすめです。自動積み立てを設定すれば、価格の上下に一喜一憂せず、平均的に購入できます。たとえば、毎月5,000円を積み立てたAさんは、1年後に価格が変動しても平均購入単価を抑え、長期的な成長に備えることができました。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>3. 安全に管理</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                二段階認証を設定し、パスワードは複雑なものに変更してください。価格の短期的な変動に振り回されず、長期的な視点で続けることが成功の鍵です。シミュレーターで、あなたの積み立てプランを試してみましょう。
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.accent} ${colors.accentHover} text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            積み立てシミュレーションを試してみる <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* フッターとCTA */}
                <div className="text-center mt-10 bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-3">次の投資に挑戦：未来を見据えた資産形成</h2>
                    <p className={`${typography.body} text-gray-300 mb-4 max-w-2xl mx-auto`}>
                        リュウです。NISAの次を考えるあなたへ。まずは0.1 BTCを目指して積み立てを始めてみませんか？0.1 BTCを達成した後、取り崩しシミュレーターで未来の生活を試算してみましょう。たとえば、2035年に0.1 BTCが3,000万円相当になった場合、30年間で均等に取り崩せば月額約8.3万円。生活の質を大きく向上させる夢の第一歩が、ここから始まります。私の運営するビットコイン長期投資ラボで、FIRE（経済的自由と早期リタイア）を視野に入れたシミュレーションを試してみてください。
                    </p>
                    <Link
                        to="/simulators/investment"
                        className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-transform hover:scale-105 shadow-lg`}
                    >
                        取り崩しシミュレーションを試してみる <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
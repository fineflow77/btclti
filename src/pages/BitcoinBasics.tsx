import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp } from 'lucide-react';

// スタイル設定 - Updated Color Palette and Typography
const typography = {
    h1: 'text-3xl sm:text-4xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
};

const colors = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white', // Softer primary
    cardBg: 'bg-gray-800', // Solid dark background for cards
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400', // Softer secondary text
    textMuted: 'text-gray-500',
    accent: 'text-blue-400', // Softer accent
    accentHover: 'hover:text-blue-300',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
};

const BitcoinBasics = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100"> {/* Darker background */}
            <div className="flex-grow max-w-3xl mx-auto px-6 lg:px-8 py-10 space-y-8"> {/* Reduced max-width for better readability and removed sm:px-6 */}
                {/* タイトルと導入 */}
                <div className="mb-8"> {/* Removed text-center from main title container */}
                    <h1 className={`${typography.h1} ${colors.accent} mb-5`}>
                        ビットコイン投資の基本：NISAの次を見据えた資産形成
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        NISAやiDeCoで投資を始め、さらなる資産形成を考えている方へ。ビットコインは、長期的な成長が期待されるデジタル資産として注目されています。しかし、価格変動への不安を感じる方もいるかもしれません。ここでは、長期投資の視点から、初心者でも安心して始められるビットコイン投資の基本について解説します。まずはシミュレーターで、あなたの資産形成プランを試してみませんか？
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
                        <Info className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        ビットコインとは？未来を変えるデジタル資産
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは2009年に誕生したデジタル資産で、中央銀行や政府を介さずにインターネット上で直接取引できます。1990年代のインターネットのように、ビットコインも新たな価値基準（ビットコインスタンダード）として普及する可能性が考えられています。ビットコインスタンダードとは、ビットコインが法定通貨に代わる経済システムの基盤となり、価値の保存手段として広く受け入れられるという概念です。
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">発行量限定</h3>
                            <p className="text-sm">
                                最大2,100万枚しか発行されません。法定通貨とは異なり、発行量に上限があるため希少性が高いです。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">グローバルに利用可能</h3>
                            <p className="text-sm">
                                インターネット環境があれば世界中どこへでも送金可能。手数料も比較的安く、迅速に送金できます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">価値の保存</h3>
                            <p className="text-sm">
                                発行量が限られているため、価値が下落しにくい特性を持ち、「デジタルゴールド」とも呼ばれています。
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg mb-4">
                        <h3 className="text-blue-300 font-semibold mb-2">まずは0.1 BTC を目指しませんか？</h3>
                        <p className={`${typography.body} ${colors.textSecondary}`}>
                            ビットコインの総発行量は2,100万枚ですが、2023年時点で0.1 BTC以上を保有するアドレスは約350万件です。世界人口80億人に対し、わずか0.04%程度に過ぎません。つまり、0.1 BTCを保有することは、世界的に見ても非常に希少な存在になるということです。パワーロー予測（決定係数R²=0.95）に基づけば、2035年には1 BTCが3億円に達する可能性があります。この場合、0.1 BTCは3,000万円相当となり、将来の資産形成に大きく貢献する可能性があります。少額からの積み立てで、まずは0.1 BTCを目指し、未来の可能性を広げてみましょう。
                        </p>
                    </div>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        過去のデータから、ビットコインは短期的な価格変動はあるものの、長期的に成長傾向を示しています。まずは少額から投資を始め、その可能性を体感してみてはいかがでしょうか。
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
                        <TrendingUp className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        投資としてのメリットとリスク：バランスを理解する
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインを投資対象として検討する際には、メリットとリスクをバランス良く理解することが重要です。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className={`${typography.h2} ${colors.success} mb-2`}>メリット</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>成長の潜在力</strong>：ビットコインはまだ普及の初期段階にあり、企業、機関投資家、国家の参入により、さらなる価値向上が期待されます。
                                </li>
                                <li>
                                    <strong>インフレヘッジ</strong>：発行量が限られているため、インフレによる資産価値の目減りリスクを軽減する効果が期待できます。
                                </li>
                                <li>
                                    <strong>分散投資</strong>：株式や債券とは異なる値動きをするため、ポートフォリオに組み込むことでリスク分散に貢献する可能性があります。
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.h2} ${colors.warning} mb-2`}>リスク</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>価格変動性</strong>：短期間で価格が大きく変動することがあり、精神的な負担となる場合があります。
                                </li>
                                <li>
                                    <strong>規制の不確実性</strong>：各国の規制変更が価格や取引に影響を与える可能性があります。
                                </li>
                                <li>
                                    <strong>管理の複雑さ</strong>：取引所のセキュリティ問題や、秘密鍵の紛失など、管理に関するリスクが存在します。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg mt-6 border border-blue-800">
                        <p className={`${typography.body} text-center ${colors.textPrimary}`}>
                            ビットコインの利益は総合課税の対象となり、最大55%の税率が課せられる場合があります。ただし、分離課税の導入も検討されています。パワーロー（Power Law）に基づく長期的な成長パターンを理解することで、長期的な視点での投資が可能になります。詳しくはパワーロー解説ページをご覧ください。
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
                        <Shield className="h-6 w-6 mr-2 text-blue-300" /> {/* Updated accent color */}
                        ビットコイン投資を始めるステップ：安心してスタートするために
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        ビットコイン投資を始めるための３つのステップをご紹介します。
                    </p>
                    <div className="space-y-6">
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>1. 国内取引所で口座開設</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                                金融庁に登録された国内の暗号資産取引所を選びましょう。本人確認書類を用意すれば、オンラインで簡単に口座開設が可能です。
                            </p>
                            <div className="bg-gray-600 bg-opacity-40 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-300 mb-2">おすすめ取引所</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://coin.z.com/jp/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            GMOコイン
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">初心者向け、操作が簡単、積み立て機能も充実</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://bitbank.cc/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            bitbank
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">手数料が安く、高機能チャートで取引を分析</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <a href="https://bitflyer.com/ja-jp/" target="_blank" rel="noopener noreferrer" className={`${colors.accent} ${colors.accentHover} font-medium transition-colors`}>
                                            bitFlyer
                                        </a>
                                        <p className="text-xs mt-1 text-gray-300">大手取引所、安心して利用できる、積み立てサービスも</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>2. 少額から積み立て投資</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                毎月数千円からなど、少額からの積み立て投資がおすすめです。 автоматическое 積み立て設定を利用すれば、価格変動に左右されず、平均購入単価を抑えることができます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>3. セキュリティ対策をしっかりと</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                二段階認証を設定し、パスワードを複雑なものにするなど、セキュリティ対策をしっかりと行いましょう。短期的な価格変動に惑わされず、長期的な視点で投資を続けることが重要です。シミュレーターで、積み立てプランを試してみましょう。
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
                <div className="mt-10 bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-xl text-center"> {/* Added text-center for footer CTA */}
                    <h2 className="text-xl font-semibold text-white mb-3">未来を見据えた資産形成に挑戦</h2>
                    <p className={`${typography.body} text-gray-300 mb-4 max-w-2xl mx-auto`}>
                        NISA の次を考えるなら、ビットコイン投資を検討してみてはいかがでしょうか？まずは少額から積み立てを始め、将来の資産形成に繋げていきましょう。将来の生活をシミュレーションできるツールもご用意しています。
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
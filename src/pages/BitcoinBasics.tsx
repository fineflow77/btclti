import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp } from 'lucide-react'; // PiggyBank を削除

// スタイル設定はPowerLawExplanationと統一
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
    success: 'text-[#10B981]',
    warning: 'text-[#F87171]',
};

const BitcoinBasics: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                {/* タイトルと導入 */}
                <div className="text-center">
                    <h1 className={`${typography.h1} ${colors.info} mb-5`}>
                        ビットコイン投資の基本ガイド
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary} max-w-3xl mx-auto`}>
                        NISAで投資を始めたけど、さらに資産を増やしたい。そんな方へ向けて、
                        ビットコインを次のステップとして考えるための基礎知識をまとめました。
                        価格の上下が気になる人でも、始めやすいポイントを紹介します。
                    </p>
                </div>

                {/* ビットコインとは */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        ビットコインってどんなもの？
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは2009年に登場したデジタル資産です。
                        銀行や政府を通さず、ネット上で直接やりとりできるのが特徴で、新しい資産として注目されています。
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">決まった量しかない</h3>
                            <p className="text-sm">
                                最大2100万枚しか発行されません。円やドルといった法定通貨のように増えすぎないので、希少性があります。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">どこでも使える</h3>
                            <p className="text-sm">
                                ネットがあれば世界中どこでも送金可能。手数料も安く、数分で済みます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-semibold mb-2">価値が減りにくい</h3>
                            <p className="text-sm">
                                発行量が限られているため、インフレで価値が落ちにくい。「デジタルゴールド」とも呼ばれます。
                            </p>
                        </div>
                    </div>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        これまで価格は大きく動いてきましたが、長期で見ると成長傾向にあります。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/power-law-explanation"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center"
                        >
                            価格の長期パターンを知る <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* 投資対象としてのポイント */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        投資として考えるメリットとリスク
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className={`${typography.h2} ${colors.success} mb-2`}>メリット</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>成長の可能性</strong>：まだ普及の初期段階。企業や投資家が入ってくれば、さらに伸びるかも。
                                </li>
                                <li>
                                    <strong>インフレ対策</strong>：お金の価値が下がるのを防ぐ手段として注目されています。
                                </li>
                                <li>
                                    <strong>分散効果</strong>：株や債券と動きが違うので、組み合わせによってリスクが減る可能性も。
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.h2} ${colors.warning} mb-2`}>リスク</h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong>価格の乱高下</strong>：短期間で半分以下になることも。耐えられる資金計画が必須です。
                                </li>
                                <li>
                                    <strong>規制の影響</strong>：国のルールが変わると価格や取引に影響が出る可能性があります。
                                </li>
                                <li>
                                    <strong>自己管理</strong>：取引所のハッキングやパスワード紛失で資産を失うリスクも。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg mt-6 border border-blue-800">
                        <p className={`${typography.body} text-center ${colors.textPrimary}`}>
                            税金の優遇はない点に注意。2025年現在、総合課税のため、利益には最大55%の税金がかかる場合も考慮してください。
                            ただし、2026年に分離課税が導入されるという観測もあります。これによりビットコイン投資のハードルが一気に下がります。
                        </p>
                    </div>
                </div>

                {/* 始め方 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.info} mb-4 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2" />
                        ビットコイン投資を始める3ステップ
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        ビットコイン投資の第一歩は、信頼できる取引所を選ぶことから。
                    </p>
                    <div className="space-y-6">
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>1. 取引所で口座を作る</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                                金融庁に登録された日本の取引所を選びましょう。本人確認書類（免許証など）で簡単に開設できます。
                            </p>
                            <div className="bg-gray-600 bg-opacity-40 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-300 mb-2">おすすめ取引所</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://coin.z.com/jp/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            GMOコイン
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">初心者に優しい操作性、積み立て機能あり</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://bitbank.cc/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            bitbank
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">手数料が安く、チャートが見やすい</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://bitflyer.com/ja-jp/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            bitFlyer
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">大手で安心、積み立てサービスも</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>2. 少額から積み立てを始める</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                最初は毎月3,000円や5,000円からでOK。自動でコツコツ買う設定にすれば、高い時も安い時も平均的に購入できます。
                            </p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.h2} ${colors.textPrimary} mb-2`}>3. 安全に管理する</h3>
                            <p className={`${typography.body} ${colors.textSecondary}`}>
                                二段階認証を必ず設定し、パスワードは複雑なものに。価格の上下に振り回されないよう、長期目線で続けましょう。
                            </p>
                        </div>
                    </div>
                </div>

                {/* フッターとCTA */}
                <div className="text-center mt-10 bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-3">次の投資に挑戦</h2>
                    <p className={`${typography.body} text-gray-300 mb-4 max-w-2xl mx-auto`}>
                        ビットコインはNISAと並ぶ資産形成の選択肢に。少額から始めて、その可能性を感じてみてください。
                    </p>
                    <Link
                        to="/simulators/investment"
                        className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                    >
                        積み立てをシミュレーション <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
// BitcoinBasics.tsx 改善案 (完全版)

import React from 'react';
import { Link } from 'react-router-dom';
import {
    Info, ArrowRight, Shield, TrendingUp, PiggyBank,
    BarChart2, Calculator
} from 'lucide-react';

// 既存のタイポグラフィとカラー設定を維持
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
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

                {/* タイトルと説明文をもっと親しみやすく */}
                <div className="text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-5`}>NISA卒業生のための次の一手：ビットコイン投資入門</h1>
                    <p className={`${typography.body} ${colors.textSecondary} max-w-3xl mx-auto`}>
                        「NISA枠を使い切ったけど、もっと資産を増やしたい」<br />
                        「長期的な視点で次の投資先を探している」<br />
                        そんな30代の方々へ。ビットコインを資産形成の選択肢として考えるための基礎知識をわかりやすく解説します。
                    </p>
                </div>

                {/* 「ビットコインとは何か？」セクションの改善 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        ビットコイン：デジタル時代の「新しい金」
                    </h2>

                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは、2009年に誕生した世界初のデジタル通貨です。
                        銀行や政府などの中央機関に依存せず、インターネット上で直接やりとりできる点が革新的です。
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-medium mb-2 flex items-center">
                                <span className="mr-2">🔒</span> 発行上限がある希少資産
                            </h3>
                            <p className="text-sm">
                                ビットコインは最大で約2100万枚しか発行されない「希少性」を持ちます。これは円やドルなど、
                                無制限に発行できる従来の通貨と大きく異なる点です。
                            </p>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-medium mb-2 flex items-center">
                                <span className="mr-2">🌐</span> 国境を越えて保有・送金可能
                            </h3>
                            <p className="text-sm">
                                インターネットさえあれば、世界中どこでも保有・送金が可能です。国際送金も数分で完了し、
                                高額な手数料もかかりません。
                            </p>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-blue-300 font-medium mb-2 flex items-center">
                                <span className="mr-2">📈</span> インフレに強い特性
                            </h3>
                            <p className="text-sm">
                                発行上限があるため、従来の通貨のようにお金の価値が下がりにくいという特徴があります。
                                この点で「デジタルゴールド」とも呼ばれます。
                            </p>
                        </div>
                    </div>

                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        2009年の誕生以来、価格は大きく変動しながらも長期的には上昇トレンドを描いてきました。
                        ただし、過去の上昇が将来の成果を保証するものではありません。テクノロジーの革新性や社会への普及度を
                        踏まえた上で、慎重に投資判断を行う必要があります。
                    </p>

                    <div className="mt-5 text-right">
                        <Link
                            to="/power-law-explanation"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            長期的な価格パターンを理解する{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* 「投資対象としての評価」セクションの改善 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        NISA卒業生が検討すべき理由とリスク
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> 検討する価値がある理由
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong className="font-semibold">高い成長ポテンシャル</strong><br />
                                    <span className="text-sm">先進国市場での普及はまだ初期段階。機関投資家の参入や決済手段としての採用が進めば、
                                        さらなる価値上昇の可能性があります。</span>
                                </li>
                                <li>
                                    <strong className="font-semibold">インフレヘッジとしての役割</strong><br />
                                    <span className="text-sm">発行量に上限があるため、円やドルのような通貨価値の希薄化（インフレ）から資産を守る
                                        選択肢になり得ます。</span>
                                </li>
                                <li>
                                    <strong className="font-semibold">分散投資効果の向上</strong><br />
                                    <span className="text-sm">株式や債券とは異なる値動きをするため、ポートフォリオ全体のリスク分散効果が
                                        期待できます。NISA枠の株式投資と組み合わせることで、より安定した資産形成が可能になるかもしれません。</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> 必ず理解しておくべきリスク
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                                <li>
                                    <strong className="font-semibold">大きな価格変動</strong><br />
                                    <span className="text-sm">短期間で50%以上の価格下落も珍しくありません。
                                        投資する場合は、この変動に耐えられるメンタルと資金計画が必要です。</span>
                                </li>
                                <li>
                                    <strong className="font-semibold">規制リスク</strong><br />
                                    <span className="text-sm">各国の法規制や税制の変更が市場価格や取引環境に影響を与える可能性があります。
                                        日本でも頻繁に税制や規制の議論が行われています。</span>
                                </li>
                                <li>
                                    <strong className="font-semibold">セキュリティと自己責任</strong><br />
                                    <span className="text-sm">大手の取引所でも過去にはハッキング被害が発生しています。
                                        また、秘密鍵を紛失すると資産にアクセスできなくなる可能性もあります。</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg mt-6 border border-blue-800">
                        <p className={`${typography.body} text-center ${colors.textPrimary}`}>
                            <strong>NISA運用と比較して覚えておくべき点：</strong> ビットコインは税制優遇がなく、利益に対して最大55%の
                            総合課税（累進課税）が適用されます。投資判断の際には税負担も考慮しましょう。
                        </p>
                    </div>
                </div>

                {/* 「投資開始の準備」セクションの改善 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2" />
                        初めての方でも安心！3ステップで始めるビットコイン投資
                    </h2>

                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        ビットコイン投資は、意外と簡単に始められます。NISA口座を開設した経験があれば、
                        同じくらいのステップで開始できます。
                    </p>

                    <div className="space-y-6">
                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2 flex items-center`}>
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white mr-2">1</span>
                                信頼できる取引所で口座開設
                            </h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                                まずは金融庁に登録された国内の暗号資産交換業者（取引所）を選び、口座を開設します。
                                本人確認書類（運転免許証など）の提出が必要です。NISA口座開設と同様の流れです。
                            </p>
                            <div className="bg-gray-600 bg-opacity-40 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-300 mb-2">おすすめの国内取引所</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://coin.z.com/jp/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            GMOコイン
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">初心者向け UI、自動積立機能あり</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://bitbank.cc/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            bitbank
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">手数料が安い、チャート機能充実</p>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <Link to="https://bitflyer.com/ja-jp/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] font-medium">
                                            bitFlyer
                                        </Link>
                                        <p className="text-xs mt-1 text-gray-300">大手で安心感、積立サービスあり</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2 flex items-center`}>
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white mr-2">2</span>
                                少額から始める積立投資の設定
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                        口座開設後、まずは少額から始めることをおすすめします。
                                        毎月3,000円や5,000円といった、財布に優しい金額から自動積立を設定しましょう。
                                    </p>
                                    <p className={`${typography.body} ${colors.textSecondary}`}>
                                        これにより、価格が高い時には少ない量を、安い時には多くの量を自動的に購入していく
                                        「ドルコスト平均法」が実現できます。
                                    </p>
                                </div>
                                <div className="bg-blue-900 bg-opacity-20 p-3 rounded-lg border border-blue-800">
                                    <h4 className="text-sm font-medium text-blue-300 mb-2">NISAとの併用プラン例</h4>
                                    <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
                                        <li>NISA：月18,000円でインデックスファンド積立</li>
                                        <li>暗号資産：月5,000円でビットコイン積立</li>
                                        <li>合計：月23,000円の資産形成プラン</li>
                                    </ul>
                                    <p className="text-xs mt-2 text-gray-400">
                                        ※あくまで一例です。ご自身の資金状況に合わせて計画してください。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg">
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2 flex items-center`}>
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white mr-2">3</span>
                                セキュリティ対策と長期継続のコツ
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-yellow-300 mb-1">必須のセキュリティ対策</h4>
                                    <ul className={`${typography.small} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                        <li><strong>二段階認証の設定</strong>：スマホのアプリなどで認証を追加</li>
                                        <li><strong>強固なパスワード</strong>：他サービスと共用しない複雑なもの</li>
                                        <li><strong>公式サイト・アプリの利用</strong>：偽サイトに注意</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-green-300 mb-1">長期継続のコツ</h4>
                                    <ul className={`${typography.small} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                        <li><strong>日々のチャートを見すぎない</strong>：感情的な判断を避ける</li>
                                        <li><strong>投資可能額の範囲内で</strong>：生活に支障のない金額で</li>
                                        <li><strong>長期目線を持つ</strong>：短期の変動に一喜一憂しない</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 「積み立て投資戦略」セクションの改善 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <PiggyBank className="h-5 w-5 mr-2" />
                        NISA経験者におすすめ：ビットコインの積立投資術
                    </h2>

                    <div className="bg-gray-700 bg-opacity-30 p-5 rounded-lg mb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-blue-300 mb-3">積立投資がおすすめな理由</h3>
                                <p className="text-sm text-gray-300 mb-3">
                                    ビットコインの価格は短期的に大きく変動することがありますが、
                                    「積立投資（ドルコスト平均法）」を活用することで、そのリスクを抑えることができます。
                                </p>
                                <p className="text-sm text-gray-300">
                                    NISAでの投資と同じように、「時間分散効果」により平均購入単価を平準化し、
                                    感情に左右されない規律ある投資が可能になります。
                                </p>
                            </div>
                            <div>
                                <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-800">
                                    <h4 className="text-blue-300 font-medium mb-2">NISA経験者向けの積立戦略例</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">1</span>
                                            <p className="text-sm text-gray-300">
                                                <strong>基本積立</strong>：毎月決まった日に一定金額を自動購入
                                            </p>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">2</span>
                                            <p className="text-sm text-gray-300">
                                                <strong>ボーナス分散</strong>：ボーナス投資分は3ヶ月に分けて購入
                                            </p>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs mr-2 mt-0.5">3</span>
                                            <p className="text-sm text-gray-300">
                                                <strong>大暴落時の追加投資</strong>：価格が30%以上下落した時に臨時積立
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-green-400 font-medium mb-2 text-center">💪 積立のメリット</h3>
                            <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
                                <li>価格の高値掴みリスクを低減</li>
                                <li>感情的な判断を排除できる</li>
                                <li>手間なく継続投資できる</li>
                                <li>少額から始められる</li>
                            </ul>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-yellow-400 font-medium mb-2 text-center">⚠️ 留意点</h3>
                            <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
                                <li>積立サービスの手数料確認</li>
                                <li>極端な暴落時でも継続する意志</li>
                                <li>税金は自己申告が必要</li>
                            </ul>
                        </div>

                        <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg">
                            <h3 className="text-blue-400 font-medium mb-2 text-center">🎯 目標設定のコツ</h3>
                            <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
                                <li>○年で資産○○万円などの明確な目標</li>
                                <li>ポートフォリオ全体の5-10%程度に</li>
                                <li>四半期ごとの定期的な見直し</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/simulators/investment"
                            className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            あなたの積立プランをシミュレーションする
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* 結びとCTAの改善 */}
                <div className="text-center mt-10 bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-3">NISA投資の次のステップへ</h2>
                    <p className={`${typography.body} text-gray-300 mb-4 max-w-2xl mx-auto`}>
                        ビットコイン投資は、適切な知識と戦略に基づいて始めれば、NISAと並ぶ資産形成の選択肢となります。
                        まずは少額から始めて、その可能性をぜひ体験してみてください。
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <Link
                            to="/analysis-news"
                            className={`${colors.primary} px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                        >
                            <BarChart2 className="mr-2 h-4 w-4" />
                            今日の市場状況を確認する
                        </Link>
                        <Link
                            to="/simulators/investment"
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2 rounded-full text-sm font-medium inline-flex items-center transition-colors"
                        >
                            <Calculator className="mr-2 h-4 w-4" />
                            積立シミュレーションを試す
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
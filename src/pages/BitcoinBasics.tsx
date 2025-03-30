import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp, Key, PiggyBank } from 'lucide-react';

// タイポグラフィとカラー設定は既存のものを維持
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
    accent: 'text-[#D4AF37]', // アクセントカラーを維持
    success: 'text-[#10B981]',
    warning: 'text-[#F87171]',
};

const BitcoinBasics: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"> {/* 上下のpaddingを調整 */}
                {/* 導入 */}
                <div className="text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-5`}>ビットコイン投資への戦略的アプローチ</h1>
                    <p className={`${typography.body} ${colors.textSecondary} max-w-3xl mx-auto`}> {/* 最大幅を設定 */}
                        将来の資産形成において、新たな選択肢として注目されるビットコイン。
                        その技術的背景、経済的特性、そして投資対象としての可能性とリスクを体系的に理解し、
                        30代からの賢明な投資判断を下すための基礎知識を提供します。
                    </p>
                </div>

                {/* セクション1: ビットコインの概要 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        ビットコインとは何か？ - デジタル時代の資産
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは、ブロックチェーン技術を基盤とする、世界初の分散型デジタル資産（暗号資産）です。
                        特定の国や中央銀行のような管理主体を持たず、P2P（ピアツーピア）ネットワーク上で価値の直接的な移転を可能にします。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        最大の特徴の一つは、プログラムによって発行上限が約2100万BTCに定められている点です。
                        この希少性が、インフレーションに対する価値保存手段（デジタルゴールド）としての期待を集める要因となっています。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        2009年の運用開始以来、価格は大幅な変動を伴いながらも長期的に上昇傾向を示してきました。
                        ただし、過去の実績は将来の成果を保証するものではなく、その技術革新性や社会への浸透度を踏まえた上で、投資判断を行う必要があります。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/power-law-explanation" // このリンク先は適切か確認してください
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            長期的な価値形成の理論を探る{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* セクション2: 投資対象としての評価 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        投資対象としてのメリットとリスク
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6"> {/* メリット・リスクを横並びに */}
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> 投資メリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                <li><strong className="font-semibold">成長潜在性:</strong> 技術の普及や機関投資家の参入など、将来的な価値上昇への期待。</li>
                                <li><strong className="font-semibold">インフレヘッジ:</strong> 法定通貨の価値希薄化に対するオルタナティブ資産としての可能性。</li>
                                <li><strong className="font-semibold">ポートフォリオ分散:</strong> 株式や債券など伝統的資産との相関が低い傾向にあり、リスク分散効果が期待できる場合がある。</li>
                                <li><strong className="font-semibold">アクセス容易性:</strong> インターネット経由で比較的少額から投資を開始できる。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> 考慮すべきリスク
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                <li><strong className="font-semibold">価格変動性 (Volatility):</strong> 短期間で急激な価格変動が発生する可能性があり、元本割れのリスクを伴う。</li>
                                <li><strong className="font-semibold">規制の不確実性:</strong> 各国の法規制や税制の変更が市場価格や取引環境に影響を与える可能性。</li>
                                <li><strong className="font-semibold">技術・セキュリティリスク:</strong> ハッキングによる資産盗難や、秘密鍵の紛失によるアクセス不能リスク。自己管理責任が問われる。</li>
                                <li><strong className="font-semibold">税務上の扱い:</strong> 日本国内では原則として雑所得に分類され、利益に対して総合課税（累進課税）が適用される点（税制は変更の可能性あり）。</li>
                            </ul>
                        </div>
                    </div>
                    <p className={`${typography.small} ${colors.textMuted} mt-4 text-center`}>
                        ※投資は自己責任です。メリット・リスクを十分に理解した上で判断してください。
                    </p>
                </div>

                {/* セクション3: 投資開始の準備 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2" />
                        投資を開始するための具体的なステップ
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        ビットコイン投資を安全かつ効率的に開始するためには、以下の準備が推奨されます。
                    </p>
                    <div className="space-y-5">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>1. 暗号資産交換業者（取引所）の選定と口座開設</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                金融庁に登録された国内の暗号資産交換業者を選び、口座を開設します。
                                セキュリティ体制、手数料体系、取扱通貨、流動性、提供サービスなどを比較検討することが重要です。
                                口座開設には本人確認書類（運転免許証、マイナンバーカード等）の提出が必要です。
                            </p>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>主要な国内交換業者の例:</p>
                            <ul className={`${typography.small} ${colors.textSecondary} list-none pl-4 space-y-1`}> {/* スタイル調整 */}
                                <li>
                                    <Link to="https://coin.z.com/jp/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group">
                                        <strong className="font-semibold">GMOコイン</strong>
                                        <ArrowRight className="ml-1 h-3 w-3" /> {/* アイコンサイズ調整 */}
                                    </Link> - 取引所形式の手数料（Maker/Taker）や、自動積立サービスなどが特徴。
                                </li>
                                <li>
                                    <Link to="https://bitbank.cc/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group">
                                        <strong className="font-semibold">bitbank</strong>
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link> - 高い流動性と豊富なアルトコインの取扱いが特徴。中上級者向けの機能も。
                                </li>
                                {/* 他の取引所も必要に応じて追加 */}
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>2. ウォレットの理解と管理方針の決定</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                購入したビットコインは「ウォレット」と呼ばれるデジタルな財布で保管します。
                                交換業者が提供するウォレットは利便性が高い一方、自身で秘密鍵を管理する自己管理型ウォレット（ハードウェアウォレット等）は、より高度なセキュリティを提供しますが、管理責任も伴います。
                                保有額や取引頻度に応じて適切な管理方法を選択しましょう。
                            </p>
                            <p className={`${typography.small} ${colors.textMuted}`}>
                                初心者はまず交換業者のウォレットを利用し、知識と経験に応じて自己管理型への移行を検討するのが一般的です。
                            </p>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>3. セキュリティ対策の徹底</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                不正アクセスや詐欺から資産を守るため、以下の対策は必須です。
                            </p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                <li><strong className="font-semibold">二段階認証 (2FA) の設定:</strong> アカウントログインや重要な操作に必須。</li>
                                <li><strong className="font-semibold">強固なパスワード設定と管理:</strong> 使い回しを避け、定期的な変更を推奨。</li>
                                <li><strong className="font-semibold">フィッシング詐欺への警戒:</strong> 不審なメールやSMS、偽サイトに注意。公式サイトはブックマークからアクセスする。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* セクション4: 積み立て投資戦略 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <PiggyBank className="h-5 w-5 mr-2" />
                        長期投資戦略としての「積み立て」
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        価格変動リスクを抑制し、長期的な資産形成を目指す上で有効な戦略の一つが「積み立て投資（ドルコスト平均法）」です。
                        多くの交換業者が提供する自動積立サービスを利用すれば、定期的に一定金額分のビットコインを自動購入できます。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> 積み立ての利点
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                <li><strong className="font-semibold">時間分散効果:</strong> 高値掴みのリスクを低減し、平均購入単価を平準化。</li>
                                <li><strong className="font-semibold">感情の排除:</strong> 市場の短期的な変動に惑わされず、計画的な投資を継続しやすい。</li>
                                <li><strong className="font-semibold">自動化による利便性:</strong> 一度設定すれば、手間なく投資を続けられる。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> 留意点
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-1`}>
                                <li><strong className="font-semibold">手数料:</strong> 通常の現物取引と比較して、スプレッド（売買価格差）や手数料が割高な場合がある。</li>
                                <li><strong className="font-semibold">短期的な機会損失:</strong> 価格が底値圏にある時にまとめて購入する場合と比較して、短期的な上昇局面でのリターンは限定的になる可能性。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* セクション5: 少額からの実践 */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Key className="h-5 w-5 mr-2" />
                        少額から始める意義と実践
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資は、まず許容できる範囲内の少額資金（例: 月数千円～数万円）から開始し、市場の動向や取引の仕組み、自身のリスク許容度を実際に体験しながら学ぶことが推奨されます。
                        これにより、大きな損失リスクを避けつつ、知識と経験を蓄積できます。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        自動積立サービスを利用すれば、少額からでも無理なく投資をスタートさせ、徐々に投資額を調整していくアプローチが可能です。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment" // このリンク先は適切か確認してください
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            投資シミュレーションで計画を具体化する{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* 結びとCTA */}
                <div className="text-center mt-10">
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        ビットコイン投資は、適切な知識と戦略に基づけば、有効な資産形成手段となり得ます。
                    </p>
                    <Link
                        to="/simulators/investment" // このリンク先は適切か確認してください
                        className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                    >
                        積み立て投資シミュレーションを試す
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;
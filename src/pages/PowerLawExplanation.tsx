// src/pages/PowerLawExplanation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle } from 'lucide-react';

interface PowerLawExplanationProps {
    chartComponent: React.ReactNode;
}

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
};

const PowerLawExplanation: React.FC<PowerLawExplanationProps> = ({ chartComponent }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-4`}>
                        パワーロー（べき乗則）とは？ ビットコインの長期成長を予測する鍵
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコインの価格が長期的にどうなるか、シンプルな自然の法則で予測する方法をわかりやすく解説します。
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center mt-4 text-[#3B82F6] hover:text-[#2b6cb0] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                <section id="what-is-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        パワーローって何？ 自然界のシンプルな成長ルール
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーロー（べき乗則）とは、自然界や社会で見られる「成長のルール」の一種です。簡単に言うと、「あるものが時間や規模の“べき乗”（たとえば2乗や3乗）に比例して大きくなる」という法則です。
                        </p>
                        <p>
                            たとえば、木の成長を考えてみましょう。木の高さが毎年2倍になるのではなく、年数が経つにつれて「年数の3乗」に比例して成長するとします。1年目で1メートル、2年目で8メートル（2の3乗）、3年目で27メートル（3の3乗）といった具合です。このような成長パターンがパワーローです。
                        </p>
                        <p>
                            パワーローはいろんなところで活躍しています。たとえば：
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>地震の規模と頻度：大きな地震は少なく、小さな地震は多い。</li>
                            <li>都市の人口：大都市は少なく、小さな町は多い。</li>
                            <li>ネットの人気：有名なYouTuberは少なく、フォロワーの少ない人は多い。</li>
                        </ul>
                        <p className="italic text-gray-400">
                            ポイント：パワーローは、物事が「急激に大きくなるけど、だんだん落ち着く」パターンを示します。ビットコインの価格も、このルールに従っていると考えられているんです。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/bitcoin-basics"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            ビットコイン投資の基礎を学ぶ{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                <section id="bitcoin-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        ビットコインとパワーロー：価格が急成長する理由
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            ビットコインの価格は、2009年の誕生以来、驚くほど急成長してきました。たとえば、2010年には1ビットコインが0.05ドル（約5円）だったのが、2025年現在では数万ドルにまで上昇しています。この急成長の裏には、パワーローが関係していると研究者たちが考えています。
                        </p>
                        <p>
                            物理学者のGiovanni Santostasi（ジョバンニ・サントスタシ）さんは、ビットコインの価格が「時間の6乗」に比例して成長していると発見しました。ちょっと難しい話ですが、簡単に言うと、時間が経つにつれて価格がどんどん大きくなるけど、そのスピードは少しずつ落ち着いていく、ということです。
                        </p>
                        <p>
                            なぜこんな成長が起こるのか？ Santostasiさんによると、3つの理由があります：
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-medium text-blue-300">みんなが使い始めると価値が上がる</span>：ビットコインを使う人が増えると、価値が「使う人の数の2乗」に比例して上がります。これは「メトカーフの法則」と呼ばれるもので、たとえばLINEやInstagramが人気になるほど便利になるのと同じ原理です。
                            </li>
                            <li>
                                <span className="font-medium text-blue-300">マイニングが安定させる</span>：ビットコインは「マイニング」という作業で作られますが、難易度が自動で調整される仕組み（難易度調整）があるので、価格が急上昇しても供給が安定します。
                            </li>
                            <li>
                                <span className="font-medium text-blue-300">安全だから人が集まる</span>：ビットコインのシステムが安全だとわかると、もっと多くの人が使い始めます。安全性の高さが新しい人を引き込むんです。
                            </li>
                        </ul>
                        <p>
                            この3つがぐるぐると回りながら、ビットコインの価格をパワーローに沿って成長させている、というのがSantostasiさんの理論です。
                        </p>
                        <p className="italic text-gray-400">
                            ポイント：ビットコインは、まるで「デジタルな都市」のように成長しています。人が増えるほど価値が上がり、価値が上がるほど人が集まる、という好循環がパワーローを作り出しているんです。
                        </p>
                    </div>
                </section>

                <section id="power-law-chart" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローチャートを見てみよう：ビットコインの成長を視覚化
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            では、実際にビットコインの価格がパワーローに従っているか、チャートで見てみましょう。以下のチャートは、2011年から現在までのビットコイン価格を「対数-対数スケール」で表したものです。
                        </p>
                        <p>
                            <span className="font-medium text-blue-300">対数-対数スケールって何？</span> 簡単に言うと、価格と時間の両方を「対数」という特別なスケールで表す方法です。普通のグラフだと価格が急上昇しすぎて見づらいですが、対数スケールを使うと、長い期間の成長が「直線」に見えるんです。まるで、遠くの山を双眼鏡で見るようなイメージです。
                        </p>
                        <p>
                            このチャートでは、3つのラインが重要です：
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-medium text-green-400">中央価格（緑の線）</span>：ビットコイン価格が長期的に安定する目安。
                            </li>
                            <li>
                                <span className="font-medium text-red-400">下限価格（赤の線）</span>：過去にほとんど下回らなかった「底値」のライン。買い時とされることが多いです。
                            </li>
                            <li>
                                <span className="font-medium text-blue-400">上限価格（青の線）</span>：バブル期に到達する「天井」のライン。
                            </li>
                        </ul>
                        {chartComponent}
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/analysis-news"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            最新の価格分析を見る{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                <section id="investment-application" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローを投資に活かす：賢い投資のヒント
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローを知ると、ビットコイン投資の戦略に役立つヒントが得られます。Harold Christopher Burger（ハロルド・クリストファー・バーガー）さんは、パワーローを使って「成長の回廊」を作る方法を提案しています。
                        </p>
                        <p>
                            さっきのチャートで見た「中央価格」「下限価格」「上限価格」を使えば、こんな戦略が考えられます：
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-medium text-green-400">価格が下限価格に近づいたら買い時</span>：過去のデータでは、下限価格を下回ることがほとんどないので、ここで買うとリスクが低い可能性があります。
                            </li>
                            <li>
                                <span className="font-medium text-blue-400">上限価格に近づいたら注意</span>：バブル期のピークでは価格が急落することが多いので、売り時や様子見のタイミングかもしれません。
                            </li>
                            <li>
                                <span className="font-medium text-green-400">中央価格を目安に長期投資</span>：短期的な上下に惑わされず、中央価格を目安にコツコツ積み立てるのがおすすめです。
                            </li>
                        </ul>
                        <p>
                            たとえば、NISAでS&P500を積み立てているあなたなら、ビットコインも「長期的な成長」を信じて、少しずつ買っていく戦略が合うかもしれません。パワーローは、そのタイミングを見極める羅針盤になってくれます。
                        </p>
                        <p className="italic text-gray-400">
                            ポイント：パワーローは「いつ買うか」「いつ売るか」の目安になります。短期的な値動きに振り回されず、長期的な視点で投資を考えましょう。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/simulators/investment"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            シミュレーションで投資戦略を試す{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </section>

                <section id="limitations" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        パワーローの限界と注意点：知っておきたいこと
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは便利なツールですが、完璧ではありません。以下の点に気をつけてください：
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-medium text-yellow-300">長期的な予測に使うもの</span>：パワーローは、来週や来月の価格を予測するのには向いていません。1年後、5年後といった長いスパンで見るためのツールです。
                            </li>
                            <li>
                                <span className="font-medium text-yellow-300">過去のデータに基づいている</span>：未来のことは誰にもわかりません。たとえば、新しい法律や技術の変化が起こると、パワーローの予測が外れることもあります。
                            </li>
                            <li>
                                <span className="font-medium text-yellow-300">成長が永遠に続くわけではない</span>：木が空に向かって無限に伸びないように、ビットコインの成長もいつか落ち着く可能性があります。
                            </li>
                            <li>
                                <span className="font-medium text-yellow-300">モデルは進化する</span>：新しいデータが入ると、パワーローモデル自体が更新されることもあります。
                            </li>
                        </ul>
                        <p>
                            パワーローだけに頼るのではなく、ニュースや他の分析ツールと組み合わせて、バランスよく判断することが大切です。
                        </p>
                        <p className="italic text-gray-400">
                            ポイント：パワーローは「未来を予測する魔法の杖」ではありません。長期的な目安として使い、他の情報と一緒に考えるのが賢い使い方です。
                        </p>
                    </div>
                </section>

                <section id="references" className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4`}>もっと学びたい人のための参考文献</h2>
                    <div className={`${colors.cardBg} rounded-xl p-6 shadow-lg ${colors.textSecondary} space-y-4`}>
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
                                    パワーローがビットコインにどう当てはまるか、物理学の視点から詳しく解説しています。
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
                                    パワーローを使って、ビットコイン投資のタイミングを見極める方法を提案しています。
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
                                    ネットワーク効果がビットコインの価値にどう影響するか、初心者向けに解説しています。
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>

                <footer className="text-center text-gray-400 mt-12 py-4 border-t border-gray-800">
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
                </footer>
            </div>
        </div>
    );
};

export default PowerLawExplanation;
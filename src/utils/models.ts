// src/utils/models.ts
import { PriceModel } from './constants';
import { log10, fromLog10 } from './mathUtils';

/**
 * ビットコインの中央価格（USD）を計算
 * @param days - ジェネシスブロックからの日数
 * @param model - 価格モデル（デフォルト: STANDARD）
 * @returns 中央価格（USD）
 */
export const btcPriceMedian = (days: number, model: PriceModel = PriceModel.STANDARD): number => {
    let medianModelLog: number;
    if (model === PriceModel.STANDARD) {
        // 標準モデル（2050年に約1000万USD）
        medianModelLog = -17.01593313 + 5.84509376 * log10(days);
    } else {
        // 保守的モデル（2050年に約400万USD）
        medianModelLog = -17.5 + 5.7 * log10(days);
    }
    return fromLog10(medianModelLog);
};

/**
 * ビットコインの下限価格（USD）を計算
 * @param days - ジェネシスブロックからの日数
 * @returns 下限価格（USD）
 */
export const btcPriceSupport = (days: number): number => {
    const supportModelLog = -17.668 + 5.926 * log10(days);
    return fromLog10(supportModelLog);
};

/**
 * パワーロー内での相対位置を計算
 * 現在価格が中央価格と下限価格の範囲内でどの位置にあるかを計算する。
 * 範囲は下限価格を0%、中央価格を50%、上限価格（中央価格の2倍）を100%として正規化。
 * @param price - 現在価格（USD）
 * @param medianPrice - 中央価格（USD）
 * @param supportPrice - 下限価格（USD）
 * @returns 相対位置（パーセント）、計算不可の場合はnull
 */
export const calculatePowerLawPosition = (price: number, medianPrice: number, supportPrice: number): number | null => {
    if (!price || !medianPrice || !supportPrice || medianPrice <= supportPrice) return null;

    const upperPrice = medianPrice * 2; // 上限価格を中央価格の2倍と仮定
    const range = upperPrice - supportPrice; // 価格範囲
    const normalizedPosition = ((price - supportPrice) / range) * 100; // 0%（下限）から100%（上限）へ正規化
    return Math.min(Math.max(normalizedPosition, 0), 100); // 0～100%にクランプ
};

/**
 * 下限価格からの乖離率を計算
 * @param price - 現在価格（USD）
 * @param supportPrice - 下限価格（USD）
 * @returns 乖離率（パーセント）、計算不可の場合はnull
 */
export const calculateSupportDeviation = (price: number, supportPrice: number): number | null => {
    if (!price || !supportPrice) return null;
    return ((price - supportPrice) / supportPrice) * 100;
};

/**
 * パワーロー位置に基づくラベルを返す
 * @param position - 相対位置（パーセント）
 * @param supportDeviation - 下限からの乖離率（オプション）
 * @returns 位置の説明
 */
export const getPowerLawPositionLabel = (position: number | null, supportDeviation: number | null = null): string => {
    if (position === null || position === undefined) return '計算不可';

    let baseLabel = '';
    if (position < 20) baseLabel = '非常に割安';
    else if (position < 40) baseLabel = '割安';
    else if (position < 60) baseLabel = '適正範囲';
    else if (position < 80) baseLabel = '割高';
    else baseLabel = '非常に割高';

    if (supportDeviation !== null && supportDeviation < 10) {
        return `${baseLabel} - 下限に接近`;
    }
    return baseLabel;
};

/**
 * パワーロー位置に基づく色を返す
 * @param position - 相対位置（パーセント）
 * @param supportDeviation - 下限からの乖離率（オプション）
 * @returns 色（HEX）
 */
export const getPowerLawPositionColor = (position: number | null, supportDeviation: number | null = null): string => {
    if (position === null || position === undefined) return '#888888';
    if (supportDeviation !== null && supportDeviation < 10) return '#D81B60';

    if (position < 20) return '#1565C0';
    if (position < 40) return '#2196F3';
    if (position < 60) return '#8BC34A';
    if (position < 80) return '#FF9800';
    return '#F44336';
};
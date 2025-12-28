import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice, convertPrice } from "@/data/currencies";

export const useCurrency = () => {
  const { currency, currentLocale } = useLanguage();

  const format = (priceInEur: number): string => {
    return formatPrice(priceInEur, currency, currentLocale.code);
  };

  const convert = (priceInEur: number): number => {
    return convertPrice(priceInEur, currency);
  };

  return {
    currency,
    format,
    convert,
  };
};

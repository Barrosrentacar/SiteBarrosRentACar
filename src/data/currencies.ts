export interface Currency {
  code: string;
  symbol: string;
  name: string;
  nameFr: string;
}

// Exchange rates relative to EUR (base currency)
// These are approximate rates - in production, you'd fetch from an API
export const exchangeRates: Record<string, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  CHF: 0.94,
  CVE: 110.27,
  CAD: 1.47,
  AUD: 1.65,
  JPY: 162.50,
  CNY: 7.85,
  KRW: 1420,
  BRL: 5.35,
  MXN: 18.50,
  ARS: 920,
  COP: 4250,
  CLP: 980,
  INR: 90,
  THB: 38,
  SGD: 1.45,
  NZD: 1.78,
  ZAR: 20.50,
  SEK: 11.35,
  NOK: 11.60,
  DKK: 7.46,
  PLN: 4.32,
  CZK: 25.20,
  HUF: 395,
  RON: 4.97,
  TRY: 32.50,
  RUB: 98,
  UAH: 40,
  ILS: 3.95,
  AED: 3.97,
  SAR: 4.05,
  QAR: 3.93,
  KWD: 0.33,
  BHD: 0.41,
  OMR: 0.42,
  JOD: 0.77,
  EGP: 53,
  MAD: 10.85,
  TND: 3.38,
  DZD: 146,
  NGN: 1650,
  GHS: 13.50,
  KES: 165,
  ZMW: 27,
  IDR: 17000,
  MYR: 5.10,
  PHP: 60,
  VND: 26500,
  PKR: 302,
  BDT: 119,
  LKR: 340,
};

export const currencies: Currency[] = [
  // Major currencies
  { code: "EUR", symbol: "€", name: "Euro", nameFr: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar", nameFr: "Dollar américain" },
  { code: "GBP", symbol: "£", name: "British Pound", nameFr: "Livre sterling" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", nameFr: "Franc suisse" },
  { code: "CVE", symbol: "$", name: "Cape Verdean Escudo", nameFr: "Escudo cap-verdien" },
  
  // Americas
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", nameFr: "Dollar canadien" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", nameFr: "Réal brésilien" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", nameFr: "Peso mexicain" },
  { code: "ARS", symbol: "$", name: "Argentine Peso", nameFr: "Peso argentin" },
  { code: "COP", symbol: "$", name: "Colombian Peso", nameFr: "Peso colombien" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", nameFr: "Peso chilien" },
  
  // Asia Pacific
  { code: "JPY", symbol: "¥", name: "Japanese Yen", nameFr: "Yen japonais" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", nameFr: "Yuan chinois" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", nameFr: "Won sud-coréen" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", nameFr: "Roupie indienne" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", nameFr: "Dollar australien" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", nameFr: "Dollar néo-zélandais" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", nameFr: "Dollar de Singapour" },
  { code: "THB", symbol: "฿", name: "Thai Baht", nameFr: "Baht thaïlandais" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", nameFr: "Roupie indonésienne" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", nameFr: "Ringgit malaisien" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", nameFr: "Peso philippin" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", nameFr: "Dong vietnamien" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", nameFr: "Roupie pakistanaise" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", nameFr: "Taka bangladais" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee", nameFr: "Roupie sri-lankaise" },
  
  // Europe
  { code: "SEK", symbol: "kr", name: "Swedish Krona", nameFr: "Couronne suédoise" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", nameFr: "Couronne norvégienne" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", nameFr: "Couronne danoise" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", nameFr: "Zloty polonais" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", nameFr: "Couronne tchèque" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", nameFr: "Forint hongrois" },
  { code: "RON", symbol: "lei", name: "Romanian Leu", nameFr: "Leu roumain" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", nameFr: "Livre turque" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", nameFr: "Rouble russe" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia", nameFr: "Hryvnia ukrainienne" },
  
  // Middle East
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", nameFr: "Shekel israélien" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", nameFr: "Dirham des EAU" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", nameFr: "Riyal saoudien" },
  { code: "QAR", symbol: "﷼", name: "Qatari Riyal", nameFr: "Riyal qatari" },
  { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", nameFr: "Dinar koweïtien" },
  { code: "BHD", symbol: "د.ب", name: "Bahraini Dinar", nameFr: "Dinar bahreïni" },
  { code: "OMR", symbol: "﷼", name: "Omani Rial", nameFr: "Rial omanais" },
  { code: "JOD", symbol: "د.ا", name: "Jordanian Dinar", nameFr: "Dinar jordanien" },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", nameFr: "Livre égyptienne" },
  
  // Africa
  { code: "ZAR", symbol: "R", name: "South African Rand", nameFr: "Rand sud-africain" },
  { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham", nameFr: "Dirham marocain" },
  { code: "TND", symbol: "د.ت", name: "Tunisian Dinar", nameFr: "Dinar tunisien" },
  { code: "DZD", symbol: "د.ج", name: "Algerian Dinar", nameFr: "Dinar algérien" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", nameFr: "Naira nigérian" },
  { code: "GHS", symbol: "GH₵", name: "Ghanaian Cedi", nameFr: "Cédi ghanéen" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", nameFr: "Shilling kényan" },
  { code: "ZMW", symbol: "ZK", name: "Zambian Kwacha", nameFr: "Kwacha zambien" },
];

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(c => c.code === code);
};

export const convertPrice = (
  priceInEur: number,
  targetCurrency: string
): number => {
  const rate = exchangeRates[targetCurrency] || 1;
  return priceInEur * rate;
};

export const formatPrice = (
  priceInEur: number,
  currencyCode: string,
  locale: string = "fr-FR"
): string => {
  const convertedPrice = convertPrice(priceInEur, currencyCode);
  const currency = getCurrencyByCode(currencyCode);
  
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: currencyCode === "CVE" || currencyCode === "JPY" || currencyCode === "KRW" ? 0 : 2,
      maximumFractionDigits: currencyCode === "CVE" || currencyCode === "JPY" || currencyCode === "KRW" ? 0 : 2,
    }).format(convertedPrice);
  } catch {
    // Fallback for unsupported currencies
    return `${currency?.symbol || currencyCode} ${convertedPrice.toFixed(2)}`;
  }
};

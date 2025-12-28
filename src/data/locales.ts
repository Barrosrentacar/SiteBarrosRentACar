export interface Locale {
  code: string;
  language: string;
  languageCode: string;
  country: string;
  countryCode: string;
  flag: string;
  currency: string;
  dateFormat: string;
}

export const popularLocales: Locale[] = [
  { code: "fr-FR", language: "Français", languageCode: "fr", country: "France", countryCode: "FR", flag: "🇫🇷", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "de-DE", language: "Deutsch", languageCode: "de", country: "Deutschland", countryCode: "DE", flag: "🇩🇪", currency: "EUR", dateFormat: "DD.MM.YYYY" },
  { code: "en-US", language: "English", languageCode: "en", country: "United States", countryCode: "US", flag: "🇺🇸", currency: "USD", dateFormat: "MM/DD/YYYY" },
  { code: "es-ES", language: "Español", languageCode: "es", country: "España", countryCode: "ES", flag: "🇪🇸", currency: "EUR", dateFormat: "DD/MM/YYYY" },
];

export const allLocales: Locale[] = [
  // Popular ones
  ...popularLocales,
  // Additional locales
  { code: "pt-PT", language: "Português", languageCode: "pt", country: "Portugal", countryCode: "PT", flag: "🇵🇹", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "pt-BR", language: "Português", languageCode: "pt", country: "Brasil", countryCode: "BR", flag: "🇧🇷", currency: "BRL", dateFormat: "DD/MM/YYYY" },
  { code: "pt-CV", language: "Português", languageCode: "pt", country: "Cabo Verde", countryCode: "CV", flag: "🇨🇻", currency: "CVE", dateFormat: "DD/MM/YYYY" },
  { code: "en-GB", language: "English", languageCode: "en", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", currency: "GBP", dateFormat: "DD/MM/YYYY" },
  { code: "en-CA", language: "English", languageCode: "en", country: "Canada", countryCode: "CA", flag: "🇨🇦", currency: "CAD", dateFormat: "DD/MM/YYYY" },
  { code: "en-AU", language: "English", languageCode: "en", country: "Australia", countryCode: "AU", flag: "🇦🇺", currency: "AUD", dateFormat: "DD/MM/YYYY" },
  { code: "en-IE", language: "English", languageCode: "en", country: "Ireland", countryCode: "IE", flag: "🇮🇪", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "en-NZ", language: "English", languageCode: "en", country: "New Zealand", countryCode: "NZ", flag: "🇳🇿", currency: "NZD", dateFormat: "DD/MM/YYYY" },
  { code: "en-SG", language: "English", languageCode: "en", country: "Singapore", countryCode: "SG", flag: "🇸🇬", currency: "SGD", dateFormat: "DD/MM/YYYY" },
  { code: "en-ZA", language: "English", languageCode: "en", country: "South Africa", countryCode: "ZA", flag: "🇿🇦", currency: "ZAR", dateFormat: "DD/MM/YYYY" },
  { code: "de-AT", language: "Deutsch", languageCode: "de", country: "Österreich", countryCode: "AT", flag: "🇦🇹", currency: "EUR", dateFormat: "DD.MM.YYYY" },
  { code: "de-CH", language: "Deutsch", languageCode: "de", country: "Schweiz", countryCode: "CH", flag: "🇨🇭", currency: "CHF", dateFormat: "DD.MM.YYYY" },
  { code: "fr-BE", language: "Français", languageCode: "fr", country: "Belgique", countryCode: "BE", flag: "🇧🇪", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "fr-CH", language: "Français", languageCode: "fr", country: "Suisse", countryCode: "CH", flag: "🇨🇭", currency: "CHF", dateFormat: "DD/MM/YYYY" },
  { code: "fr-CA", language: "Français", languageCode: "fr", country: "Canada", countryCode: "CA", flag: "🇨🇦", currency: "CAD", dateFormat: "DD/MM/YYYY" },
  { code: "es-MX", language: "Español", languageCode: "es", country: "México", countryCode: "MX", flag: "🇲🇽", currency: "MXN", dateFormat: "DD/MM/YYYY" },
  { code: "es-AR", language: "Español", languageCode: "es", country: "Argentina", countryCode: "AR", flag: "🇦🇷", currency: "ARS", dateFormat: "DD/MM/YYYY" },
  { code: "es-CO", language: "Español", languageCode: "es", country: "Colombia", countryCode: "CO", flag: "🇨🇴", currency: "COP", dateFormat: "DD/MM/YYYY" },
  { code: "es-CL", language: "Español", languageCode: "es", country: "Chile", countryCode: "CL", flag: "🇨🇱", currency: "CLP", dateFormat: "DD/MM/YYYY" },
  { code: "it-IT", language: "Italiano", languageCode: "it", country: "Italia", countryCode: "IT", flag: "🇮🇹", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "nl-NL", language: "Nederlands", languageCode: "nl", country: "Nederland", countryCode: "NL", flag: "🇳🇱", currency: "EUR", dateFormat: "DD-MM-YYYY" },
  { code: "nl-BE", language: "Nederlands", languageCode: "nl", country: "België", countryCode: "BE", flag: "🇧🇪", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "da-DK", language: "Dansk", languageCode: "da", country: "Danmark", countryCode: "DK", flag: "🇩🇰", currency: "DKK", dateFormat: "DD-MM-YYYY" },
  { code: "sv-SE", language: "Svenska", languageCode: "sv", country: "Sverige", countryCode: "SE", flag: "🇸🇪", currency: "SEK", dateFormat: "YYYY-MM-DD" },
  { code: "no-NO", language: "Norsk", languageCode: "no", country: "Norge", countryCode: "NO", flag: "🇳🇴", currency: "NOK", dateFormat: "DD.MM.YYYY" },
  { code: "fi-FI", language: "Suomi", languageCode: "fi", country: "Suomi", countryCode: "FI", flag: "🇫🇮", currency: "EUR", dateFormat: "D.M.YYYY" },
  { code: "pl-PL", language: "Polski", languageCode: "pl", country: "Polska", countryCode: "PL", flag: "🇵🇱", currency: "PLN", dateFormat: "DD.MM.YYYY" },
  { code: "ru-RU", language: "Русский", languageCode: "ru", country: "Россия", countryCode: "RU", flag: "🇷🇺", currency: "RUB", dateFormat: "DD.MM.YYYY" },
  { code: "ja-JP", language: "日本語", languageCode: "ja", country: "日本", countryCode: "JP", flag: "🇯🇵", currency: "JPY", dateFormat: "YYYY/MM/DD" },
  { code: "zh-CN", language: "中文", languageCode: "zh", country: "中国", countryCode: "CN", flag: "🇨🇳", currency: "CNY", dateFormat: "YYYY/MM/DD" },
  { code: "ko-KR", language: "한국어", languageCode: "ko", country: "대한민국", countryCode: "KR", flag: "🇰🇷", currency: "KRW", dateFormat: "YYYY.MM.DD" },
  { code: "ar-SA", language: "العربية", languageCode: "ar", country: "السعودية", countryCode: "SA", flag: "🇸🇦", currency: "SAR", dateFormat: "DD/MM/YYYY" },
  { code: "ar-AE", language: "العربية", languageCode: "ar", country: "الإمارات", countryCode: "AE", flag: "🇦🇪", currency: "AED", dateFormat: "DD/MM/YYYY" },
  { code: "tr-TR", language: "Türkçe", languageCode: "tr", country: "Türkiye", countryCode: "TR", flag: "🇹🇷", currency: "TRY", dateFormat: "DD.MM.YYYY" },
  { code: "el-GR", language: "Ελληνικά", languageCode: "el", country: "Ελλάδα", countryCode: "GR", flag: "🇬🇷", currency: "EUR", dateFormat: "DD/MM/YYYY" },
  { code: "cs-CZ", language: "Čeština", languageCode: "cs", country: "Česko", countryCode: "CZ", flag: "🇨🇿", currency: "CZK", dateFormat: "DD.MM.YYYY" },
  { code: "hu-HU", language: "Magyar", languageCode: "hu", country: "Magyarország", countryCode: "HU", flag: "🇭🇺", currency: "HUF", dateFormat: "YYYY.MM.DD" },
  { code: "ro-RO", language: "Română", languageCode: "ro", country: "România", countryCode: "RO", flag: "🇷🇴", currency: "RON", dateFormat: "DD.MM.YYYY" },
  { code: "uk-UA", language: "Українська", languageCode: "uk", country: "Україна", countryCode: "UA", flag: "🇺🇦", currency: "UAH", dateFormat: "DD.MM.YYYY" },
  { code: "he-IL", language: "עברית", languageCode: "he", country: "ישראל", countryCode: "IL", flag: "🇮🇱", currency: "ILS", dateFormat: "DD/MM/YYYY" },
  { code: "th-TH", language: "ไทย", languageCode: "th", country: "ประเทศไทย", countryCode: "TH", flag: "🇹🇭", currency: "THB", dateFormat: "DD/MM/YYYY" },
  { code: "vi-VN", language: "Tiếng Việt", languageCode: "vi", country: "Việt Nam", countryCode: "VN", flag: "🇻🇳", currency: "VND", dateFormat: "DD/MM/YYYY" },
  { code: "id-ID", language: "Bahasa Indonesia", languageCode: "id", country: "Indonesia", countryCode: "ID", flag: "🇮🇩", currency: "IDR", dateFormat: "DD/MM/YYYY" },
  { code: "ms-MY", language: "Bahasa Melayu", languageCode: "ms", country: "Malaysia", countryCode: "MY", flag: "🇲🇾", currency: "MYR", dateFormat: "DD/MM/YYYY" },
  { code: "hi-IN", language: "हिन्दी", languageCode: "hi", country: "भारत", countryCode: "IN", flag: "🇮🇳", currency: "INR", dateFormat: "DD/MM/YYYY" },
];

// Get unique locales (excluding duplicates from popularLocales that are in allLocales)
export const moreLocales = allLocales.filter(
  locale => !popularLocales.some(p => p.code === locale.code)
);

export const getLocaleByCode = (code: string): Locale | undefined => {
  return allLocales.find(locale => locale.code === code);
};

export const getDefaultLocale = (): Locale => {
  return popularLocales[0]; // French France by default
};

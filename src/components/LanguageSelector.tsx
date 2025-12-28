import { useState, useMemo } from "react";
import { Globe, Search, X, Languages, Coins, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { popularLocales, moreLocales, Locale } from "@/data/locales";
import { currencies, Currency } from "@/data/currencies";

interface LocaleCardProps {
  locale: Locale;
  isSelected: boolean;
  onSelect: (locale: Locale) => void;
}

const LocaleCard = ({ locale, isSelected, onSelect }: LocaleCardProps) => (
  <button
    onClick={() => onSelect(locale)}
    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left w-full ${
      isSelected
        ? "border-primary bg-primary/5 shadow-sm"
        : "border-transparent hover:bg-secondary/50"
    }`}
  >
    <span className="text-2xl">{locale.flag}</span>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-foreground truncate">{locale.language}</p>
      <p className="text-sm text-muted-foreground truncate">{locale.country}</p>
    </div>
  </button>
);

interface CurrencyCardProps {
  currency: Currency;
  isSelected: boolean;
  onSelect: (code: string) => void;
}

const CurrencyCard = ({ currency, isSelected, onSelect }: CurrencyCardProps) => (
  <button
    onClick={() => onSelect(currency.code)}
    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left w-full ${
      isSelected
        ? "border-primary bg-primary/5 shadow-sm"
        : "border-transparent hover:bg-secondary/50"
    }`}
  >
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-foreground">{currency.nameFr}</p>
      <p className="text-sm text-muted-foreground">
        {currency.code} - {currency.symbol}
      </p>
    </div>
    {isSelected && (
      <Check className="w-5 h-5 text-primary flex-shrink-0" />
    )}
  </button>
);

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("languages");
  const { currentLocale, setLocale, currency, setCurrency } = useLanguage();

  const filteredPopularLocales = useMemo(() => {
    if (!searchQuery || activeTab !== "languages") return popularLocales;
    const query = searchQuery.toLowerCase();
    return popularLocales.filter(
      locale =>
        locale.language.toLowerCase().includes(query) ||
        locale.country.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab]);

  const filteredMoreLocales = useMemo(() => {
    if (!searchQuery || activeTab !== "languages") return moreLocales;
    const query = searchQuery.toLowerCase();
    return moreLocales.filter(
      locale =>
        locale.language.toLowerCase().includes(query) ||
        locale.country.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery || activeTab !== "currency") return currencies;
    const query = searchQuery.toLowerCase();
    return currencies.filter(
      curr =>
        curr.name.toLowerCase().includes(query) ||
        curr.nameFr.toLowerCase().includes(query) ||
        curr.code.toLowerCase().includes(query) ||
        curr.symbol.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab]);

  const handleSelectLocale = (locale: Locale) => {
    setLocale(locale);
    // Auto-update currency based on region
    if (locale.currency) {
      setCurrency(locale.currency);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSelectCurrency = (currencyCode: string) => {
    setCurrency(currencyCode);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="Change language and region"
      >
        <span className="text-xl">{currentLocale.flag}</span>
        <span className="text-foreground font-medium text-sm hidden lg:inline">
          {currentLocale.languageCode.toUpperCase()}
        </span>
        <Globe className="w-4 h-4 text-muted-foreground" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-background">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <DialogTitle className="sr-only">Langues et régions</DialogTitle>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="languages" className="gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
                    <Languages className="w-4 h-4" />
                    <span className="hidden sm:inline">Langues et régions</span>
                    <span className="sm:hidden">Langues</span>
                  </TabsTrigger>
                  <TabsTrigger value="currency" className="gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
                    <Coins className="w-4 h-4" />
                    <span>Devise</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={activeTab === "languages" ? "Rechercher une langue ou une région" : "Chercher une devise"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-8 bg-secondary border-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1">
            <TabsContent value="languages" className="m-0">
              <ScrollArea className="h-[60vh]">
                <div className="p-6 space-y-8">
                  {/* Popular locales */}
                  {filteredPopularLocales.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-4">
                        Les plus populaires
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {filteredPopularLocales.map((locale) => (
                          <LocaleCard
                            key={locale.code}
                            locale={locale}
                            isSelected={currentLocale.code === locale.code}
                            onSelect={handleSelectLocale}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* More locales */}
                  {filteredMoreLocales.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-4">
                        Plus de langues
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {filteredMoreLocales.map((locale) => (
                          <LocaleCard
                            key={locale.code}
                            locale={locale}
                            isSelected={currentLocale.code === locale.code}
                            onSelect={handleSelectLocale}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No results */}
                  {filteredPopularLocales.length === 0 && filteredMoreLocales.length === 0 && (
                    <div className="text-center py-12">
                      <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucun résultat pour "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="currency" className="m-0">
              <ScrollArea className="h-[60vh]">
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4">
                    Devise
                  </h3>
                  {filteredCurrencies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {filteredCurrencies.map((curr) => (
                        <CurrencyCard
                          key={curr.code}
                          currency={curr}
                          isSelected={currency === curr.code}
                          onSelect={handleSelectCurrency}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucune devise trouvée pour "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSelector;

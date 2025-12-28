import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, getLocaleByCode, getDefaultLocale, allLocales } from "@/data/locales";

export type Language = "fr" | "pt" | "en" | "de" | "es" | "it" | "nl" | "da" | "sv" | "no" | "fi" | "pl" | "ru" | "ja" | "zh" | "ko" | "ar" | "tr" | "el" | "cs" | "hu" | "ro" | "uk" | "he" | "th" | "vi" | "id" | "ms" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  t: (key: string) => string;
}

const LOCALE_STORAGE_KEY = "barros_locale";
const CURRENCY_STORAGE_KEY = "barros_currency";

const translations: Record<string, Record<string, string>> = {
  fr: {
    // Header
    home: "Accueil",
    vehicles: "Véhicules",
    contact: "Contact",
    login: "Connexion",
    signup: "Inscription",
    logout: "Déconnexion",
    // Hero
    heroTitle: "Louez votre voiture au Cap-Vert",
    heroSubtitle: "Simple. Rapide. Fiable.",
    // Booking
    pickupLocation: "Lieu de retrait",
    startDate: "Date de départ",
    endDate: "Date de retour",
    seeAvailability: "Voir les disponibilités",
    // Vehicles
    ourFleet: "Notre Flotte",
    selectVehicles: "Sélectionnez un ou plusieurs véhicules pour votre réservation",
    perDay: "par jour",
    seats: "places",
    addToCart: "Ajouter au panier",
    selected: "Sélectionné",
    unavailable: "Indisponible",
    orSimilar: "ou similaire",
    // Booking flow
    datesAndLocation: "Dates & Lieu",
    information: "Informations",
    confirmation: "Confirmation",
    chooseDatesLocation: "Choisissez vos dates et lieu",
    selectedVehicles: "Véhicules sélectionnés",
    addAnotherVehicle: "+ Ajouter un autre véhicule",
    pickupLocationLabel: "Lieu de retrait",
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Téléphone (WhatsApp)",
    email: "Email",
    notes: "Notes (optionnel)",
    notesPlaceholder: "Numéro de vol, heure d'arrivée, demandes spéciales...",
    continue: "Continuer",
    back: "Retour",
    confirmReservation: "Confirmer la réservation",
    summary: "Récapitulatif",
    duration: "Durée",
    day: "jour",
    days: "jours",
    total: "Total",
    totalToPay: "Total à payer",
    // Auth
    loginToAccount: "Connectez-vous à votre compte",
    createAccount: "Créez votre compte",
    password: "Mot de passe",
    signIn: "Se connecter",
    createMyAccount: "Créer mon compte",
    noAccount: "Pas encore de compte ?",
    alreadyAccount: "Déjà un compte ?",
    // Contact
    contactUs: "Contactez-nous",
    // Common
    loading: "Chargement...",
    error: "Une erreur est survenue",
  },
  pt: {
    // Header
    home: "Início",
    vehicles: "Veículos",
    contact: "Contacto",
    login: "Entrar",
    signup: "Registar",
    logout: "Sair",
    // Hero
    heroTitle: "Alugue o seu carro em Cabo Verde",
    heroSubtitle: "Simples. Rápido. Fiável.",
    // Booking
    pickupLocation: "Local de levantamento",
    startDate: "Data de partida",
    endDate: "Data de retorno",
    seeAvailability: "Ver disponibilidades",
    // Vehicles
    ourFleet: "Nossa Frota",
    selectVehicles: "Selecione um ou mais veículos para a sua reserva",
    perDay: "por dia",
    seats: "lugares",
    addToCart: "Adicionar ao carrinho",
    selected: "Selecionado",
    unavailable: "Indisponível",
    orSimilar: "ou similar",
    // Booking flow
    datesAndLocation: "Datas & Local",
    information: "Informações",
    confirmation: "Confirmação",
    chooseDatesLocation: "Escolha as suas datas e local",
    selectedVehicles: "Veículos selecionados",
    addAnotherVehicle: "+ Adicionar outro veículo",
    pickupLocationLabel: "Local de levantamento",
    firstName: "Nome",
    lastName: "Apelido",
    phone: "Telefone (WhatsApp)",
    email: "Email",
    notes: "Notas (opcional)",
    notesPlaceholder: "Número do voo, hora de chegada, pedidos especiais...",
    continue: "Continuar",
    back: "Voltar",
    confirmReservation: "Confirmar reserva",
    summary: "Resumo",
    duration: "Duração",
    day: "dia",
    days: "dias",
    total: "Total",
    totalToPay: "Total a pagar",
    // Auth
    loginToAccount: "Entre na sua conta",
    createAccount: "Crie a sua conta",
    password: "Palavra-passe",
    signIn: "Entrar",
    createMyAccount: "Criar a minha conta",
    noAccount: "Ainda não tem conta?",
    alreadyAccount: "Já tem conta?",
    // Contact
    contactUs: "Contacte-nos",
    // Common
    loading: "A carregar...",
    error: "Ocorreu um erro",
  },
  en: {
    // Header
    home: "Home",
    vehicles: "Vehicles",
    contact: "Contact",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    // Hero
    heroTitle: "Rent your car in Cape Verde",
    heroSubtitle: "Simple. Fast. Reliable.",
    // Booking
    pickupLocation: "Pickup location",
    startDate: "Start date",
    endDate: "End date",
    seeAvailability: "See availability",
    // Vehicles
    ourFleet: "Our Fleet",
    selectVehicles: "Select one or more vehicles for your booking",
    perDay: "per day",
    seats: "seats",
    addToCart: "Add to cart",
    selected: "Selected",
    unavailable: "Unavailable",
    orSimilar: "or similar",
    // Booking flow
    datesAndLocation: "Dates & Location",
    information: "Information",
    confirmation: "Confirmation",
    chooseDatesLocation: "Choose your dates and location",
    selectedVehicles: "Selected vehicles",
    addAnotherVehicle: "+ Add another vehicle",
    pickupLocationLabel: "Pickup location",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone (WhatsApp)",
    email: "Email",
    notes: "Notes (optional)",
    notesPlaceholder: "Flight number, arrival time, special requests...",
    continue: "Continue",
    back: "Back",
    confirmReservation: "Confirm booking",
    summary: "Summary",
    duration: "Duration",
    day: "day",
    days: "days",
    total: "Total",
    totalToPay: "Total to pay",
    // Auth
    loginToAccount: "Login to your account",
    createAccount: "Create your account",
    password: "Password",
    signIn: "Sign in",
    createMyAccount: "Create my account",
    noAccount: "Don't have an account?",
    alreadyAccount: "Already have an account?",
    // Contact
    contactUs: "Contact us",
    // Common
    loading: "Loading...",
    error: "An error occurred",
  },
  de: {
    home: "Startseite",
    vehicles: "Fahrzeuge",
    contact: "Kontakt",
    login: "Anmelden",
    signup: "Registrieren",
    logout: "Abmelden",
    heroTitle: "Mieten Sie Ihr Auto in Kap Verde",
    heroSubtitle: "Einfach. Schnell. Zuverlässig.",
    pickupLocation: "Abholort",
    startDate: "Startdatum",
    endDate: "Enddatum",
    seeAvailability: "Verfügbarkeit prüfen",
    ourFleet: "Unsere Flotte",
    selectVehicles: "Wählen Sie ein oder mehrere Fahrzeuge für Ihre Buchung",
    perDay: "pro Tag",
    seats: "Sitze",
    addToCart: "In den Warenkorb",
    selected: "Ausgewählt",
    unavailable: "Nicht verfügbar",
    orSimilar: "oder ähnlich",
    continue: "Weiter",
    back: "Zurück",
    confirmReservation: "Buchung bestätigen",
    loading: "Laden...",
    error: "Ein Fehler ist aufgetreten",
  },
  es: {
    home: "Inicio",
    vehicles: "Vehículos",
    contact: "Contacto",
    login: "Iniciar sesión",
    signup: "Registrarse",
    logout: "Cerrar sesión",
    heroTitle: "Alquile su coche en Cabo Verde",
    heroSubtitle: "Simple. Rápido. Fiable.",
    pickupLocation: "Lugar de recogida",
    startDate: "Fecha de inicio",
    endDate: "Fecha de fin",
    seeAvailability: "Ver disponibilidad",
    ourFleet: "Nuestra Flota",
    selectVehicles: "Seleccione uno o más vehículos para su reserva",
    perDay: "por día",
    seats: "asientos",
    addToCart: "Añadir al carrito",
    selected: "Seleccionado",
    unavailable: "No disponible",
    orSimilar: "o similar",
    continue: "Continuar",
    back: "Volver",
    confirmReservation: "Confirmar reserva",
    loading: "Cargando...",
    error: "Ha ocurrido un error",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved) {
        const locale = getLocaleByCode(saved);
        if (locale) return locale;
      }
    }
    return getDefaultLocale();
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved) return saved;
    }
    return "EUR";
  });

  const language = currentLocale.languageCode as Language;

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale.code);
  }, [currentLocale]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  const setLanguage = (lang: Language) => {
    const locale = allLocales.find(l => l.languageCode === lang);
    if (locale) {
      setCurrentLocale(locale);
    }
  };

  const setLocale = (locale: Locale) => {
    setCurrentLocale(locale);
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLocale.languageCode] || translations["en"];
    return langTranslations[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      currentLocale, 
      setLocale, 
      currency, 
      setCurrency, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const getLanguageName = (lang: Language) => {
  const locale = allLocales.find(l => l.languageCode === lang);
  return locale?.language || lang;
};

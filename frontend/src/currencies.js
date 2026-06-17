export const CURRENCIES = {
  USD: { symbol: '$', icon: '$', rate: 1, label: 'USD — US Dollar' },
  EUR: { symbol: '€', icon: '€', rate: 0.92, label: 'EUR — Euro' },
  GBP: { symbol: '£', icon: '£', rate: 0.79, label: 'GBP — British Pound' },
  INR: { symbol: '₹', icon: '₹', rate: 83.5, label: 'INR — Indian Rupee' },
  AED: { symbol: 'د.إ', icon: 'د.إ', rate: 3.67, label: 'AED — UAE Dirham' },
  LKR: { symbol: 'Rs', icon: '₨', rate: 310, label: 'LKR — Sri Lankan Rupee' },
  AUD: { symbol: 'A$', icon: 'A$', rate: 1.53, label: 'AUD — Australian Dollar' },
  CAD: { symbol: 'CA$', icon: 'C$', rate: 1.37, label: 'CAD — Canadian Dollar' },
};

export function formatPriceUSD(usd, currencyCode = 'USD') {
  const cur = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = usd * cur.rate;
  return `${cur.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getCurrencySymbol(currencyCode = 'USD') {
  return (CURRENCIES[currencyCode] || CURRENCIES.USD).symbol;
}

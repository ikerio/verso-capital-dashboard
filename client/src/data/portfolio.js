// portfolio.js — the single source of truth for every figure the report shows.
// To publish a new update: add the month to HISTORY, add a row to REPORTS,
// move AS_OF / REPORT forward, and refresh market.json.

import market from "./market.json";

export const AS_OF = "2026-10-13";

export const REPORT = {
  title: "October 2026 update",
  previousLabel: "July report",
  previousMonth: "2026-07",
  previousDate: "2026-07-14",
};

// Passcode → amount originally invested (USD).
export const TIERS = {
  VERSO75: 7500,
  VERSO15: 15000,
  VERSO16: 16800,
  VERSO20: 20000,
  VERSO30: 30000,
};

// ───────────────────────── Valuation model ─────────────────────────
// Unchanged since June 2025, so every month stays comparable with the reports
// already sent: 40% tracks the ADA price, 30% is a liquidity-adjusted value,
// 30% is an assumed floor for the NFTs. All results are a share of the amount
// invested (1 = 100%).
const BASE = { ada: 0.82, value: 0.749 }; // May 2025, the last market-priced month
const FLOOR = 0.35;
const LIQUID_ADA_THRESHOLD = 0.6;

export function modelParts(ada) {
  const liquidity = ada < LIQUID_ADA_THRESHOLD ? 0.25 : 0.45;
  return {
    ada: BASE.value * (ada / BASE.ada) * 0.4,
    liquidity: BASE.value * liquidity * 0.3,
    floor: FLOOR * 0.3,
  };
}

export function modelValue(ada) {
  const p = modelParts(ada);
  return p.ada + p.liquidity + p.floor;
}

// How far the model value moves for a $0.10 move in ADA (share of invested).
export const ADA_SENSITIVITY_PER_10C = ((BASE.value * 0.4) / BASE.ada) * 0.1;

// ───────────────────────── Monthly value history ─────────────────────────
// `share` = market-priced value as a share of the amount invested.
// `ada`   = ADA reference price fed to the model for that month.
// Months up to July 2026 are exactly as previously reported; August onward
// use the month-end ADA close (October: the as-of date).
export const HISTORY = [
  { month: "2024-10", share: 0.9 },
  { month: "2024-11", share: 1.05 },
  { month: "2024-12", share: 1.25 },
  { month: "2025-01", share: 1.6 },
  { month: "2025-02", share: 1.305 },
  { month: "2025-03", share: 0.625 },
  { month: "2025-04", share: 0.55 },
  { month: "2025-05", share: 0.749138 },
  { month: "2025-06", ada: 0.625 },
  { month: "2025-07", ada: 0.7343 },
  { month: "2025-08", ada: 0.9254 },
  { month: "2025-09", ada: 0.889 },
  { month: "2025-10", ada: 0.6997 },
  { month: "2025-11", ada: 0.4046 },
  { month: "2025-12", ada: 0.33 },
  { month: "2026-01", ada: 0.29 },
  { month: "2026-02", ada: 0.28 },
  { month: "2026-03", ada: 0.24 },
  { month: "2026-04", ada: 0.25 },
  { month: "2026-05", ada: 0.24 },
  { month: "2026-06", ada: 0.17 },
  { month: "2026-07", ada: 0.15 },
  { month: "2026-08", ada: 0.198 },
  { month: "2026-09", ada: 0.247 },
  { month: "2026-10", ada: 0.236, date: AS_OF },
].map((row) => {
  const estimated = row.ada != null;
  return {
    ...row,
    estimated,
    share: estimated ? modelValue(row.ada) : row.share,
    date: row.date ?? monthEnd(row.month),
  };
});

export const CURRENT = HISTORY[HISTORY.length - 1];
export const PREVIOUS = HISTORY.find((h) => h.month === REPORT.previousMonth);
export const LAST_MARKET_PRICED = [...HISTORY].reverse().find((h) => !h.estimated);

// What we think the position would fetch if it had to be sold today, as a
// share of the amount invested. This is a judgement, not a model output.
export const SALE_ESTIMATE = { low: 0.07, high: 0.12 };

// Approximate make-up of the position by model value. Category names match
// the ones investors have seen since the July report.
export const HOLDINGS = [
  {
    name: "NFTs",
    share: 0.93,
    liquid: false,
    note: "Utility NFTs that can earn tokens, such as Infinity Rising game assets, and art and collectibles. None sold.",
  },
  { name: "Staking rewards", share: 0.03, liquid: true, note: "Earned by staking and holding the NFTs." },
  {
    name: "Cardano (ADA) and native tokens",
    share: 0.02,
    liquid: true,
    note: "Mostly tokens received for holding the NFTs.",
  },
  { name: "Cash reserve", share: 0.02, liquid: true, note: "Held in reserve." },
];

// Every figure we have reported, exactly as it was sent.
export const REPORTS = [
  { label: "May 2025", share: 0.749138, ada: 0.82, btc: 111000, sale: null, basis: "Market prices" },
  { label: "Nov 2025", share: 0.309, ada: 0.405, btc: 88343, sale: null, basis: "Model" },
  { label: "Apr 2026", share: 0.253, ada: 0.25, btc: 71103, sale: [0.1, 0.15], basis: "Model" },
  { label: "Jul 2026", share: 0.216, ada: 0.15, btc: 62000, sale: [0.05, 0.1], basis: "Model" },
  {
    label: "Oct 2026",
    share: CURRENT.share,
    ada: CURRENT.ada,
    btc: 83400,
    sale: [SALE_ESTIMATE.low, SALE_ESTIMATE.high],
    basis: "Model",
    current: true,
  },
];

// ───────────────────────── Market data ─────────────────────────
const DAY = 86400000;
const marketStart = Date.parse(`${market.start}T00:00:00Z`);

function series(values) {
  return values.map((v, i) => ({ t: marketStart + i * DAY, v }));
}

export const MARKET = {
  ada: series(market.ada),
  btc: series(market.btc),
  fng: series(market.fng),
};

export function marketOn(key, isoDate) {
  const i = Math.round((Date.parse(`${isoDate}T00:00:00Z`) - marketStart) / DAY);
  return market[key][i];
}

// The three months since the last report, with what drove each.
export const MONTHS_SINCE_REPORT = [
  {
    month: "2026-08",
    label: "August",
    close: "2026-08-31",
    summary:
      "Quiet until the third week, then Bitcoin had its strongest week in about two years and finished the month up 25%. ADA followed more slowly, up 18%.",
  },
  {
    month: "2026-09",
    label: "September",
    close: "2026-09-30",
    summary:
      "The rally held through a U.S. rate rise on 16 September. Bitcoin added 6% on steady ETF buying. ADA gained 25%, its best month of the year, and briefly touched $0.26.",
  },
  {
    month: "2026-10",
    label: "October to date",
    close: AS_OF,
    summary:
      "A pause. ADA reached $0.27 on 5 October and has eased back to about $0.24. Bitcoin has moved sideways between $82,000 and $87,000.",
  },
];

export const NFT_MARKET = [
  {
    term: "Where they trade",
    status: "A venue exists again",
    detail:
      "JPG Store, the main Cardano NFT marketplace, closed on 23 May 2026. Wayup, a smaller marketplace run by Anvil, has taken over JPG Store's contracts, so existing listings and royalties still work and there is somewhere to list.",
  },
  {
    term: "Activity",
    status: "Rising from a very low base",
    detail:
      "Wayup recorded 4,697 on-chain transactions in the 30 days to 21 September and 5,951 in the 30 days to 8 October, about 27% more. These are transaction counts, not sales: we have found no dependable figure for how much is actually changing hands.",
  },
  {
    term: "Buyers",
    status: "Still scarce",
    detail:
      "NFT demand is weak everywhere, not only on Cardano. Global NFT sales were about $63 million in the last week of August, down 45% on the week before. Selling the fund's NFTs today would still mean accepting a small fraction of the model value.",
  },
  {
    term: "Wider Cardano activity",
    status: "Improving",
    detail:
      "Trading on Cardano's decentralised exchanges picked up in August and September, and about $67 million was deposited in Cardano DeFi in late September. That helps ADA more directly than it helps NFTs.",
  },
];

export const SOURCES = [
  { label: "ADA and BTC daily closes: Binance spot", href: "https://www.binance.com/en/markets" },
  { label: "Crypto Fear & Greed Index: alternative.me", href: "https://alternative.me/crypto/fear-and-greed-index/" },
  { label: "JPG Store closure: BeInCrypto", href: "https://beincrypto.com/jpg-store-cardano-nft-marketplace-shutdown/" },
  { label: "Wayup activity: cardano.org app directory", href: "https://cardano.org/apps/wayup/" },
  {
    label: "Global NFT sales: CryptoSlam via crypto.news",
    href: "https://crypto.news/nft-sales-fall-44-7-to-63-3m-as-ethereum-leads/",
  },
  {
    label: "Cardano DEX volume and deposits: DeFiLlama via The Crypto Basic",
    href: "https://thecryptobasic.com/2026/09/25/cardano-dex-volume-rises-148-in-a-week/",
  },
  {
    label: "Bitcoin in September: Simple Mining market report",
    href: "https://www.simplemining.io/insights/post/bitcoin-market-report-september-2026",
  },
];

function monthEnd(month) {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
}

// format.js — number and date formatting shared by every view.

const MINUS = "−";

export function usd(value, { decimals = 0 } = {}) {
  const abs = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${value < 0 ? MINUS : ""}$${abs}`;
}

export function signedUsd(value) {
  return `${value < 0 ? MINUS : "+"}$${Math.abs(Math.round(value)).toLocaleString("en-US")}`;
}

// Share of 1 → "24.7%"
export function pct(share, decimals = 1) {
  const v = share * 100;
  return `${v < 0 ? MINUS : ""}${Math.abs(v).toFixed(decimals)}%`;
}

export function signedPct(share, decimals = 1) {
  const v = share * 100;
  return `${v < 0 ? MINUS : "+"}${Math.abs(v).toFixed(decimals)}%`;
}

export function signedPoints(value, decimals = 0) {
  return `${value < 0 ? MINUS : "+"}${Math.abs(value).toFixed(decimals)} pts`;
}

export function adaPrice(value) {
  return `$${value.toFixed(value < 1 ? 3 : 2)}`;
}

// Round a dollar range to figures that do not pretend to be precise.
export function roundTo(value, step = 50) {
  return Math.round(value / step) * step;
}

const dayFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const shortMonthFmt = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });

const toDate = (d) => (typeof d === "string" ? new Date(`${d.length === 7 ? `${d}-01` : d}T00:00:00Z`) : new Date(d));

export const fullDate = (d) => dayFmt.format(toDate(d));
export const monthYear = (d) => monthFmt.format(toDate(d));
export const shortMonth = (d) => shortMonthFmt.format(toDate(d));
export const toTime = (d) => toDate(d).getTime();

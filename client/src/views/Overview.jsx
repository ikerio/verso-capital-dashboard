// Overview.jsx — where the position stands and what changed since the last report.
import { useMemo, useState } from "react";
import LineChart from "../components/LineChart";
import { motion } from "framer-motion";
import { Card, CountUp, Delta, LineKey, Segmented, Stat } from "../components/ui";
import {
  AS_OF,
  CURRENT,
  HISTORY,
  HOLDINGS,
  LAST_MARKET_PRICED,
  MONTHS_SINCE_REPORT,
  PREVIOUS,
  REPORT,
  REPORTS,
  SALE_ESTIMATE,
  marketOn,
} from "../data/portfolio";
import { adaPrice, fullDate, monthYear, pct, roundTo, signedPct, signedUsd, toTime, usd } from "../lib/format";
import { EASE, rise } from "../lib/motion";

const RANGES = [
  { value: "6M", label: "6M", months: 6 },
  { value: "1Y", label: "1Y", months: 12 },
  { value: "ALL", label: "All" },
];

const MARKERS = [{ t: toTime("2026-05-23"), label: "JPG Store closes" }];

function sinceMonthsAgo(months) {
  const d = new Date(`${AS_OF}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() - months);
  return d.getTime();
}

export default function Overview({ invested, onView }) {
  const [range, setRange] = useState("ALL");
  const [display, setDisplay] = useState("chart");

  const value = CURRENT.share * invested;
  const previous = PREVIOUS.share * invested;
  const nftShare = HOLDINGS.find((h) => !h.liquid).share;
  const previousReport = REPORTS[REPORTS.length - 2];

  const points = useMemo(() => {
    const months = RANGES.find((r) => r.value === range).months;
    const from = months ? sinceMonthsAgo(months) : -Infinity;
    return HISTORY.filter((h) => toTime(h.date) >= from).map((h) => ({
      t: toTime(h.date),
      v: h.share * invested,
      est: h.estimated,
      row: h,
    }));
  }, [range, invested]);

  const hasMarketPriced = points.some((p) => !p.est);
  const columns = [PREVIOUS, ...MONTHS_SINCE_REPORT.map((m) => HISTORY.find((h) => h.month === m.month))];

  return (
    <>
      <motion.section className="hero" {...rise()}>
        <div>
          <p className="eyebrow">Estimated value of your position</p>
          <p className="hero-figure">
            <CountUp value={Math.round(value)} format={(v) => usd(Math.round(v))} />
          </p>
          <p className="hero-line">
            <Delta value={value - previous} pill>
              {signedUsd(value - previous)} ({signedPct(CURRENT.share / PREVIOUS.share - 1)})
            </Delta>
            <span>since the {REPORT.previousLabel}</span>
          </p>
          <div className="meter" role="img" aria-label={`${pct(CURRENT.share)} of what you invested`}>
            <div className="meter-track">
              <motion.span
                className="meter-fill"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(1, CURRENT.share) * 100}%` }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
              />
            </div>
            <div className="meter-labels">
              <span>{pct(CURRENT.share)} of what you invested</span>
              <span>{usd(invested)}</span>
            </div>
          </div>
        </div>
        <dl className="stats">
          <Stat label="You invested" value={usd(invested)} />
          <Stat
            label="Return to date"
            value={signedUsd(value - invested)}
            sub={`${signedPct(CURRENT.share - 1)} on the model value`}
          />
          <Stat
            label="If sold today, about"
            value={`${usd(roundTo(SALE_ESTIMATE.low * invested))}–${usd(roundTo(SALE_ESTIMATE.high * invested))}`}
            sub={`${pct(SALE_ESTIMATE.low, 0)}–${pct(SALE_ESTIMATE.high, 0)} of what you invested`}
          />
        </dl>
      </motion.section>

      <motion.p className="notice" {...rise(0.08)}>
        <strong>These are estimates, not prices.</strong> About {pct(nftShare, 0)} of the position is Cardano NFTs,
        which still cannot be sold for anything close to the model value. The model value is up this quarter because
        ADA recovered; the NFTs themselves are no easier to sell.{" "}
        <button type="button" className="link" onClick={() => onView("valuation")}>
          How we value the position
        </button>
      </motion.p>

      <Card
        delay={0.14}
        title="Value over time"
        subtitle={`Month-end value of your position, October 2024 to ${fullDate(AS_OF)}`}
        actions={
          <>
            <Segmented label="Time range" options={RANGES} value={range} onChange={setRange} />
            <Segmented
              label="Display"
              options={[
                { value: "chart", label: "Chart" },
                { value: "table", label: "Table" },
              ]}
              value={display}
              onChange={setDisplay}
            />
          </>
        }
      >
        {display === "chart" ? (
          <>
            <div className="legend">
              {hasMarketPriced && <LineKey>Market prices, to {monthYear(LAST_MARKET_PRICED.month)}</LineKey>}
              <LineKey dashed>Model estimate, from June 2025</LineKey>
            </div>
            <LineChart
              points={points}
              height={320}
              area
              xTicks="points"
              yTickFormat={(v) => (v >= 1000 ? `$${v / 1000}k` : `$${v}`)}
              refLines={[{ y: invested, label: `Invested ${usd(invested)}` }]}
              markers={MARKERS}
              endLabel={usd(Math.round(value))}
              ariaLabel="Value of your position over time. Use the arrow keys to read each month."
              renderTooltip={(p) => (
                <>
                  <span className="tip-label">{monthYear(p.row.month)}</span>
                  <span className="tip-value">{usd(Math.round(p.v))}</span>
                  <span className="tip-row">{pct(p.row.share)} of invested</span>
                  <span className="tip-row">
                    {p.est ? `Model estimate, ADA ${adaPrice(p.row.ada)}` : "Market prices"}
                  </span>
                </>
              )}
            />
          </>
        ) : (
          <div className="table-wrap table-wrap--tall">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col" className="num">
                    Value
                  </th>
                  <th scope="col" className="num">
                    Share of invested
                  </th>
                  <th scope="col">Basis</th>
                  <th scope="col" className="num">
                    ADA reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...points].reverse().map((p) => (
                  <tr key={p.row.month}>
                    <th scope="row">{monthYear(p.row.month)}</th>
                    <td className="num">{usd(Math.round(p.v))}</td>
                    <td className="num">{pct(p.row.share)}</td>
                    <td>{p.est ? "Model estimate" : "Market prices"}</td>
                    <td className="num">{p.est ? adaPrice(p.row.ada) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card
        title={`Month by month since the ${REPORT.previousLabel}`}
        subtitle="Model value at each month-end, with the ADA price it was calculated from"
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="num">
                  {REPORT.previousLabel}
                </th>
                {MONTHS_SINCE_REPORT.map((m) => (
                  <th scope="col" className="num" key={m.month}>
                    {m.close === AS_OF ? fullDate(AS_OF).replace(/ \d{4}$/, "") : m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="row-strong">
                <th scope="row">Model value</th>
                {columns.map((c) => (
                  <td className="num" key={c.month}>
                    {usd(Math.round(c.share * invested))}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Share of invested</th>
                {columns.map((c) => (
                  <td className="num" key={c.month}>
                    {pct(c.share)}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Change on the month before</th>
                {columns.map((c, i) => (
                  <td className="num" key={c.month}>
                    {i === 0 ? "—" : signedPct(c.share / columns[i - 1].share - 1)}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">ADA price used</th>
                {columns.map((c) => (
                  <td className="num" key={c.month}>
                    {adaPrice(c.ada)}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Bitcoin</th>
                <td className="num">{usd(previousReport.btc)}</td>
                {MONTHS_SINCE_REPORT.map((m) => (
                  <td className="num" key={m.month}>
                    {usd(marketOn("btc", m.close))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <ol className="months">
          {MONTHS_SINCE_REPORT.map((m) => (
            <li key={m.month}>
              <h3 className="months-title">{m.label}</h3>
              <p>{m.summary}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid-2">
        <Card title="What improved">
          <ul className="list">
            <li>
              ADA is back to about $0.24, where it was in April, after falling to about $0.15 in July.
            </li>
            <li>Bitcoin recovered from about $62,000 to about $83,000.</li>
            <li>
              Sentiment turned. The Fear &amp; Greed Index averaged 25 in July and has been at 50 or higher since
              20 August.
            </li>
            <li>
              There is a marketplace again. Wayup has taken over JPG Store&rsquo;s contracts and activity on it is
              growing.
            </li>
            <li>
              This is the first report since the crisis began in which the model value is higher than in the report
              before it.
            </li>
          </ul>
        </Card>
        <Card title="What has not">
          <ul className="list">
            <li>
              Liquidity has not come back. Selling the NFTs today would still mean accepting a small fraction of the
              model value.
            </li>
            <li>
              The model value is still {pct(1 - CURRENT.share, 0)} below what you invested, and ADA is still about
              70% below its May 2025 level.
            </li>
            <li>
              More than 40% of the model value rests on an assumed floor for the NFTs that no sale has confirmed.
            </li>
            <li>Nothing has been bought or sold since the {REPORT.previousLabel}. We continue to hold.</li>
          </ul>
        </Card>
      </div>

      <Card title="What we are watching">
        <dl className="watch">
          <div>
            <dt>Actual sales</dt>
            <dd>
              Whether NFTs start changing hands on Wayup at real prices, not just being listed. This is the signal that
              matters most for the position.
            </dd>
          </div>
          <div>
            <dt>ADA holding its gains</dt>
            <dd>
              ADA lost almost 40% in June alone. Two firm months since then are encouraging, but they are not yet a
              trend.
            </dd>
          </div>
          <div>
            <dt>Bitcoin and ETF flows</dt>
            <dd>
              ADA has largely followed Bitcoin this year. If the ETF buying behind this rally reverses, ADA is
              likely to fall with it.
            </dd>
          </div>
        </dl>
      </Card>
    </>
  );
}

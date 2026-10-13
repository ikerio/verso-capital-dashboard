// Market.jsx — the market the position sits in: ADA, Bitcoin, sentiment, and Cardano NFTs.
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import LineChart from "../components/LineChart";
import { Card, Delta, Segmented } from "../components/ui";
import { AS_OF, MARKET, NFT_MARKET, REPORT, SOURCES } from "../data/portfolio";
import { adaPrice, fullDate, signedPct, signedPoints, toTime, usd } from "../lib/format";
import { rise } from "../lib/motion";

const RANGES = [
  { value: "3M", label: "3M", months: 3, phrase: "over 3 months" },
  { value: "6M", label: "6M", months: 6, phrase: "over 6 months" },
  { value: "1Y", label: "1Y", months: 12, phrase: "over 1 year" },
  { value: "ALL", label: "Since May 2025", phrase: "since May 2025" },
];

const MARKERS = [{ t: toTime(REPORT.previousDate), label: REPORT.previousLabel }];

function fngLabel(v) {
  if (v < 25) return "Extreme fear";
  if (v < 45) return "Fear";
  if (v <= 55) return "Neutral";
  if (v <= 75) return "Greed";
  return "Extreme greed";
}

const PANELS = [
  {
    key: "ada",
    title: "ADA",
    unit: "US dollars",
    format: adaPrice,
    tick: (v) => `$${v.toFixed(2)}`,
    change: (first, last) => signedPct(last / first - 1),
    diff: (first, last) => last - first,
    yDomain: "fit",
  },
  {
    key: "btc",
    title: "Bitcoin",
    unit: "US dollars",
    format: (v) => usd(v),
    tick: (v) => `$${v / 1000}k`,
    change: (first, last) => signedPct(last / first - 1),
    diff: (first, last) => last - first,
    yDomain: "fit",
  },
  {
    key: "fng",
    title: "Fear & Greed Index",
    unit: "0 is extreme fear, 100 is extreme greed",
    format: (v) => `${v} · ${fngLabel(v)}`,
    tick: (v) => v,
    change: (first, last) => signedPoints(last - first),
    diff: (first, last) => last - first,
    yDomain: [0, 100],
  },
];

export default function Market() {
  const [range, setRange] = useState("6M");
  const active = RANGES.find((r) => r.value === range);

  const from = useMemo(() => {
    if (!active.months) return -Infinity;
    const d = new Date(`${AS_OF}T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() - active.months);
    return d.getTime();
  }, [active]);

  return (
    <>
      <motion.div className="page-head" {...rise()}>
        <div>
          <h1 className="page-title">Market backdrop</h1>
          <p className="page-sub">
            The model value follows ADA, and ADA has followed Bitcoin and overall sentiment. Daily figures to{" "}
            {fullDate(AS_OF)}.
          </p>
        </div>
        <Segmented label="Time range" options={RANGES} value={range} onChange={setRange} />
      </motion.div>

      <div className="grid-3">
        {PANELS.map((panel, i) => {
          const points = MARKET[panel.key].filter((p) => p.t >= from);
          const first = points[0].v;
          const last = points[points.length - 1].v;
          return (
            <Card key={panel.key} className="card--tight" delay={0.06 + i * 0.07}>
              <h2 className="panel-title">{panel.title}</h2>
              <p className="panel-value">{panel.format(last)}</p>
              <p className="panel-delta">
                <Delta value={panel.diff(first, last)}>{panel.change(first, last)}</Delta>
                <span>{active.phrase}</span>
              </p>
              <LineChart
                points={points}
                height={190}
                yDomain={panel.yDomain}
                yTickFormat={panel.tick}
                markers={MARKERS}
                ariaLabel={`${panel.title}, daily, ${active.phrase}. Use the arrow keys to read each day.`}
                renderTooltip={(p) => (
                  <>
                    <span className="tip-label">{fullDate(p.t)}</span>
                    <span className="tip-value">{panel.format(p.v)}</span>
                  </>
                )}
              />
              <p className="panel-unit">{panel.unit}</p>
            </Card>
          );
        })}
      </div>

      <Card
        title="The Cardano NFT market"
        subtitle="What decides whether the NFTs can actually be sold, and at what price"
      >
        <dl className="facts">
          {NFT_MARKET.map((f) => (
            <div key={f.term}>
              <dt>
                {f.term}
                <span className="facts-status">{f.status}</span>
              </dt>
              <dd>{f.detail}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card title="Sources">
        <ul className="sources">
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

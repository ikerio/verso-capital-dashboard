// Valuation.jsx — how the headline figure is built, what it is not, and the reporting record.
import { motion } from "framer-motion";
import { Card } from "../components/ui";
import {
  ADA_SENSITIVITY_PER_10C,
  AS_OF,
  CURRENT,
  HOLDINGS,
  REPORTS,
  SALE_ESTIMATE,
  modelParts,
} from "../data/portfolio";
import { adaPrice, fullDate, pct, roundTo, usd } from "../lib/format";
import { EASE, rise, wipe } from "../lib/motion";

const SCALE_MAX = 0.3; // right edge of the sale-vs-model scale, as a share of invested

export default function Valuation({ invested }) {
  const parts = modelParts(CURRENT.ada);
  const components = [
    {
      key: "ada",
      name: "Tracks the ADA price",
      share: parts.ada,
      how: `Moves one-for-one with ADA. At ${adaPrice(CURRENT.ada)} today.`,
    },
    {
      key: "liquidity",
      name: "Illiquidity-adjusted value",
      share: parts.liquidity,
      how: "A fixed, discounted amount while ADA is below $0.60.",
    },
    {
      key: "floor",
      name: "Assumed NFT floor",
      share: parts.floor,
      how: "A fixed minimum we assume rare NFTs keep. No sale has confirmed it.",
    },
  ];
  const liquidShare = HOLDINGS.filter((h) => h.liquid).reduce((sum, h) => sum + h.share, 0);
  const saleLow = roundTo(SALE_ESTIMATE.low * invested);
  const saleHigh = roundTo(SALE_ESTIMATE.high * invested);

  return (
    <>
      <motion.div className="page-head" {...rise()}>
        <div>
          <h1 className="page-title">How we value your position</h1>
          <p className="page-sub">
            Since June 2025 there has been too little trading in Cardano NFTs to price them from sales, so we use a
            model. It has not changed since then, which keeps every month comparable.
          </p>
        </div>
      </motion.div>

      <Card
        title="What makes up the model value"
        subtitle={`${usd(Math.round(CURRENT.share * invested))}, or ${pct(CURRENT.share)} of what you invested, as of ${fullDate(AS_OF)}`}
      >
        <motion.div
          className="stack"
          role="img"
          aria-label="Model value split into its three parts; figures are in the table below."
          {...wipe(0.2)}
        >
          {components.map((c) => (
            <span
              key={c.key}
              className={`stack-seg stack-seg--${c.key}`}
              style={{ flexGrow: c.share * 1000 }}
              title={`${c.name}: ${usd(Math.round(c.share * invested))}`}
            />
          ))}
        </motion.div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col">How it is set</th>
                <th scope="col" className="num">
                  Share of invested
                </th>
                <th scope="col" className="num">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.key}>
                  <th scope="row">
                    <span className={`swatch stack-seg--${c.key}`} aria-hidden="true" />
                    {c.name}
                  </th>
                  <td>{c.how}</td>
                  <td className="num">{pct(c.share)}</td>
                  <td className="num">{usd(Math.round(c.share * invested))}</td>
                </tr>
              ))}
              <tr className="row-strong">
                <th scope="row">Model value</th>
                <td />
                <td className="num">{pct(CURRENT.share)}</td>
                <td className="num">{usd(Math.round(CURRENT.share * invested))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="prose">
          Only the first part moves with the market. A $0.10 change in ADA moves the model value by about{" "}
          {(ADA_SENSITIVITY_PER_10C * 100).toFixed(1)} points of your investment, or{" "}
          {usd(Math.round(ADA_SENSITIVITY_PER_10C * invested))}. That is why a rise of roughly half in ADA since
          mid-July lifted the model value by about 15%, and why the model value fell far less than ADA did on the way
          down.
        </p>
      </Card>

      <Card
        title="Model value and sale value are different things"
        subtitle="Both as a share of what you invested"
      >
        <div className="scale" aria-hidden="true">
          <div className="scale-track">
            <motion.span
              className="scale-range"
              style={{ left: `${(SALE_ESTIMATE.low / SCALE_MAX) * 100}%` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${((SALE_ESTIMATE.high - SALE_ESTIMATE.low) / SCALE_MAX) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            />
            <motion.span
              className="scale-dot"
              initial={{ left: "0%", opacity: 0 }}
              whileInView={{ left: `${(CURRENT.share / SCALE_MAX) * 100}%`, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            />
          </div>
          <div className="scale-ticks">
            {[0, 0.1, 0.2, 0.3].map((t) => (
              <span key={t} style={{ left: `${(t / SCALE_MAX) * 100}%` }}>
                {pct(t, 0)}
              </span>
            ))}
          </div>
        </div>
        <dl className="pair">
          <div>
            <dt>
              <span className="swatch swatch--range" aria-hidden="true" />
              If sold today
            </dt>
            <dd className="pair-value">
              {usd(saleLow)}&ndash;{usd(saleHigh)}
            </dd>
            <dd>
              {pct(SALE_ESTIMATE.low, 0)}&ndash;{pct(SALE_ESTIMATE.high, 0)} of invested. Our judgement of what the
              whole position would fetch if we had to sell it now.
            </dd>
          </div>
          <div>
            <dt>
              <span className="swatch swatch--dot" aria-hidden="true" />
              Model value
            </dt>
            <dd className="pair-value">{usd(Math.round(CURRENT.share * invested))}</dd>
            <dd>
              {pct(CURRENT.share)} of invested. What our model says the position is worth today. It assumes the NFTs
              keep a minimum value that the market has not confirmed.
            </dd>
          </div>
        </dl>
        <p className="prose">
          The gap is the assumed NFT floor and the absence of buyers. In July we cut the sale estimate to 5&ndash;10%
          because the main marketplace had just closed. We have raised it to {pct(SALE_ESTIMATE.low, 0)}&ndash;
          {pct(SALE_ESTIMATE.high, 0)}: NFTs are priced in ADA, which is up by roughly half since mid-July, and a
          successor marketplace is operating. It stays below April&rsquo;s 10&ndash;15% because trading there is still
          thin. This range is an opinion, not an offer from any buyer.
        </p>
      </Card>

      <div className="grid-2">
        <Card title="What you hold" subtitle="Approximate share of the model value">
          <motion.div className="stack" aria-hidden="true" {...wipe(0.2)}>
            <span className="stack-seg stack-seg--ink" style={{ flexGrow: (1 - liquidShare) * 1000 }} />
            <span className="stack-seg stack-seg--muted" style={{ flexGrow: liquidShare * 1000 }} />
          </motion.div>
          <table className="table table--plain">
            <tbody>
              {HOLDINGS.map((h) => (
                <tr key={h.name}>
                  <th scope="row">
                    <span className={`swatch ${h.liquid ? "stack-seg--muted" : "stack-seg--ink"}`} aria-hidden="true" />
                    {h.name}
                    <span className="cell-note">{h.note}</span>
                  </th>
                  <td className="num">{pct(h.share, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Reading these figures">
          <ul className="list">
            <li>Every value from June 2025 onward is a model estimate. Nobody has paid or offered these amounts.</li>
            <li>
              Earlier months are shown exactly as they were reported. From August 2026 the model uses the ADA closing
              price on the last day of each month, and on {fullDate(AS_OF)} for October.
            </li>
            <li>
              The assumed NFT floor is the weakest part of the model. If it proves too high, the model value is
              overstated by up to {pct(parts.floor)} of your investment.
            </li>
            <li>The figures are before any fees due on exit.</li>
          </ul>
        </Card>
      </div>

      <Card title="Reporting record" subtitle="Each figure as it was reported at the time">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Report</th>
                <th scope="col" className="num">
                  Value
                </th>
                <th scope="col" className="num">
                  Share of invested
                </th>
                <th scope="col" className="num">
                  If sold then
                </th>
                <th scope="col" className="num">
                  ADA
                </th>
                <th scope="col" className="num">
                  Bitcoin
                </th>
                <th scope="col">Basis</th>
              </tr>
            </thead>
            <tbody>
              {[...REPORTS].reverse().map((r) => (
                <tr key={r.label} className={r.current ? "row-strong" : undefined}>
                  <th scope="row" className="nowrap">
                    {r.label}
                  </th>
                  <td className="num">{usd(Math.round(r.share * invested))}</td>
                  <td className="num">{pct(r.share)}</td>
                  <td className="num">
                    {r.sale ? `${pct(r.sale[0], 0)}–${pct(r.sale[1], 0)}` : "—"}
                  </td>
                  <td className="num">{adaPrice(r.ada)}</td>
                  <td className="num">{usd(r.btc)}</td>
                  <td>{r.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

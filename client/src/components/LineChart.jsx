// LineChart.jsx — one time series on one axis, with a crosshair readout.
// Points flagged `est` are drawn dashed (model estimates rather than prices).
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { shortMonth } from "../lib/format";

const MARGIN = { top: 22, bottom: 26, left: 52 };

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  // Measure before first paint so the plot never flashes empty.
  useLayoutEffect(() => {
    if (ref.current) setWidth(Math.round(ref.current.getBoundingClientRect().width));
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

// Round tick values covering [min, max], at most target + 2 of them.
function niceTicks(min, max, target = 4) {
  const span = max - min || Math.abs(max) || 1;
  const mag = 10 ** Math.floor(Math.log10(span / target));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= target + 1);
  const first = Math.floor(min / step + 1e-9) * step;
  const last = Math.ceil(max / step - 1e-9) * step;
  const ticks = [];
  for (let v = first; v <= last + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

const year = (t) => new Date(t).getUTCFullYear();

// The year is spelled out on the first tick and wherever it changes.
function labelTicks(times) {
  return times.map((t, i) => ({
    t,
    label: i === 0 || year(t) !== year(times[i - 1]) ? `${shortMonth(t)} ’${String(year(t)).slice(2)}` : shortMonth(t),
  }));
}

// Ticks on the first of each month, thinned to fit.
function monthTicks(t0, t1, maxTicks) {
  const starts = [];
  const d = new Date(t0);
  let y = d.getUTCFullYear();
  let m = d.getUTCMonth();
  for (;;) {
    const t = Date.UTC(y, m, 1);
    if (t > t1) break;
    if (t >= t0) starts.push(t);
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
  }
  const step = [1, 2, 3, 6, 12].find((s) => Math.ceil(starts.length / s) <= maxTicks) ?? 12;
  return labelTicks(starts.filter((_, i) => (starts.length - 1 - i) % step === 0));
}

// Ticks on the data points themselves (for monthly series), thinned to fit.
function pointTicks(points, maxTicks) {
  const step = Math.max(1, Math.ceil(points.length / maxTicks));
  return labelTicks(points.filter((_, i) => (points.length - 1 - i) % step === 0).map((p) => p.t));
}

export default function LineChart({
  points,
  height = 280,
  yDomain = "zero", // "zero" | "fit" | [min, max]
  yTickFormat = (v) => v,
  yTickCount = 4,
  xTicks = "months", // "months" | "points"
  area = false,
  refLines = [],
  markers = [],
  endLabel,
  renderTooltip,
  ariaLabel,
}) {
  const [ref, width] = useWidth();
  const [active, setActive] = useState(null);
  const clipId = `reveal-${useId().replace(/:/g, "")}`;
  // A new range replays the left-to-right reveal; a resize does not.
  const revealKey = `${points[0]?.t}-${points.length}`;

  const layout = useMemo(() => {
    if (!width || points.length < 2) return null;
    const right = endLabel ? Math.max(24, endLabel.length * 7.4 + 14) : 14;
    const plot = {
      x0: MARGIN.left,
      x1: width - right,
      y0: MARGIN.top,
      y1: height - MARGIN.bottom,
    };
    const t0 = points[0].t;
    const t1 = points[points.length - 1].t;
    const values = points.map((p) => p.v);
    let lo = Math.min(...values);
    let hi = Math.max(...values);
    if (Array.isArray(yDomain)) [lo, hi] = yDomain;
    else if (yDomain === "zero") lo = 0;
    const yTicks = niceTicks(lo, hi, yTickCount);
    const yMin = yTicks[0];
    const yMax = yTicks[yTicks.length - 1];
    const x = (t) => plot.x0 + ((t - t0) / (t1 - t0)) * (plot.x1 - plot.x0);
    const y = (v) => plot.y1 - ((v - yMin) / (yMax - yMin)) * (plot.y1 - plot.y0);
    const maxTicks = Math.max(2, Math.floor((plot.x1 - plot.x0) / 64));
    const ticksX = xTicks === "points" ? pointTicks(points, maxTicks) : monthTicks(t0, t1, maxTicks);

    // Consecutive segments of the same kind share a path.
    const paths = [];
    for (let i = 1; i < points.length; i += 1) {
      const est = Boolean(points[i].est);
      const last = paths[paths.length - 1];
      const seg = `L${x(points[i].t).toFixed(1)},${y(points[i].v).toFixed(1)}`;
      if (last && last.est === est) last.d += seg;
      else paths.push({ est, d: `M${x(points[i - 1].t).toFixed(1)},${y(points[i - 1].v).toFixed(1)}${seg}` });
    }
    const areaPath =
      `M${x(t0).toFixed(1)},${plot.y1}` +
      points.map((p) => `L${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join("") +
      `L${x(t1).toFixed(1)},${plot.y1}Z`;

    // Marker labels are placed right to left; one that would overlap is dropped.
    let freeUntil = plot.x1 + 1;
    const placedMarkers = markers
      .filter((m) => m.t >= t0 && m.t <= t1)
      .sort((a, b) => b.t - a.t)
      .map((m) => {
        const mx = x(m.t);
        const w = m.label.length * 6.3 + 8;
        const flip = mx + w > plot.x1;
        const start = flip ? mx - w : mx;
        const end = flip ? mx : mx + w;
        const show = end <= freeUntil && start >= plot.x0;
        if (show) freeUntil = start - 6;
        return { ...m, mx, flip, show };
      });

    return { plot, x, y, yTicks, ticksX, paths, areaPath, yMin, yMax, placedMarkers };
  }, [width, height, points, yDomain, yTickCount, xTicks, endLabel, markers]);

  const nearest = (clientX) => {
    if (!layout) return null;
    const box = ref.current.getBoundingClientRect();
    const px = clientX - box.left;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const dist = Math.abs(layout.x(points[i].t) - px);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  };

  const onKeyDown = (e) => {
    const last = points.length - 1;
    const current = active ?? last;
    const next = {
      ArrowLeft: Math.max(0, current - 1),
      ArrowRight: Math.min(last, current + 1),
      Home: 0,
      End: last,
    }[e.key];
    if (next !== undefined) {
      e.preventDefault();
      setActive(next);
    } else if (e.key === "Escape") setActive(null);
  };

  const activePoint = active != null ? points[Math.min(active, points.length - 1)] : null;
  const lastPoint = points[points.length - 1];

  return (
    <div
      ref={ref}
      className="chart"
      style={{ height }}
      role="group"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={() => setActive((a) => a ?? points.length - 1)}
      onBlur={() => setActive(null)}
      onPointerMove={(e) => setActive(nearest(e.clientX))}
      onPointerLeave={() => setActive(null)}
    >
      {layout && (
        <svg width={width} height={height} aria-hidden="true">
          {layout.yTicks.map((v) => (
            <g key={v}>
              <line
                className={v === layout.yMin ? "chart-baseline" : "chart-grid"}
                x1={layout.plot.x0}
                x2={layout.plot.x1}
                y1={layout.y(v)}
                y2={layout.y(v)}
              />
              <text className="chart-tick" x={layout.plot.x0 - 8} y={layout.y(v) + 4} textAnchor="end">
                {yTickFormat(v)}
              </text>
            </g>
          ))}
          {layout.ticksX.map((tick) => (
            <text key={tick.t} className="chart-tick" x={layout.x(tick.t)} y={height - 7} textAnchor="middle">
              {tick.label}
            </text>
          ))}

          {refLines
            .filter((r) => r.y > layout.yMin && r.y <= layout.yMax)
            .map((r) => (
              <g key={r.label}>
                <line
                  className="chart-ref"
                  x1={layout.plot.x0}
                  x2={layout.plot.x1}
                  y1={layout.y(r.y)}
                  y2={layout.y(r.y)}
                />
                <text className="chart-note" x={layout.plot.x1 - 4} y={layout.y(r.y) - 6} textAnchor="end">
                  {r.label}
                </text>
              </g>
            ))}

          {layout.placedMarkers.map((m) => (
            <g key={m.label}>
              <line className="chart-ref" x1={m.mx} x2={m.mx} y1={layout.plot.y0 - 8} y2={layout.plot.y1} />
              {m.show && (
                <text
                  className="chart-note"
                  x={m.flip ? m.mx - 5 : m.mx + 5}
                  y={layout.plot.y0 - 10}
                  textAnchor={m.flip ? "end" : "start"}
                >
                  {m.label}
                </text>
              )}
            </g>
          ))}

          <defs>
            <clipPath id={clipId}>
              <rect
                key={revealKey}
                className="chart-reveal"
                x={layout.plot.x0 - 4}
                y={0}
                width={layout.plot.x1 - layout.plot.x0 + 8}
                height={height}
              />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            {area && <path className="chart-area" d={layout.areaPath} />}
            {layout.paths.map((p) => (
              <path key={p.d.slice(0, 24)} className={p.est ? "chart-line chart-line--est" : "chart-line"} d={p.d} />
            ))}
          </g>

          {endLabel && (
            <g key={revealKey} className="chart-endmark">
              <circle className="chart-dot" cx={layout.x(lastPoint.t)} cy={layout.y(lastPoint.v)} r="4.5" />
              <text className="chart-end" x={layout.x(lastPoint.t) + 10} y={layout.y(lastPoint.v) + 4}>
                {endLabel}
              </text>
            </g>
          )}

          {activePoint && (
            <>
              <line
                className="chart-crosshair"
                x1={layout.x(activePoint.t)}
                x2={layout.x(activePoint.t)}
                y1={layout.plot.y0}
                y2={layout.plot.y1}
              />
              <circle className="chart-dot" cx={layout.x(activePoint.t)} cy={layout.y(activePoint.v)} r="4.5" />
            </>
          )}
        </svg>
      )}

      {layout && activePoint && renderTooltip && (
        <div
          className={`chart-tip${layout.x(activePoint.t) > width * 0.6 ? " chart-tip--left" : ""}`}
          style={{ left: layout.x(activePoint.t), top: layout.plot.y0 }}
          role="status"
        >
          {renderTooltip(activePoint)}
        </div>
      )}
    </div>
  );
}

"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ChartPoint } from "@/components/dashboard/hooks/useLiveMetrics";

interface SalesChartProps {
  data: ChartPoint[];
}

function fmtRevenue(v: number) {
  if (v >= 1000) return `R$${(v / 1000).toFixed(0)}k`;
  return `R$${v}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d1320",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "10px 14px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.38)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 2,
              background: entry.stroke,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{entry.name}</span>
          <span style={{ color: "#e6edf3", fontSize: 12, fontWeight: 700, marginLeft: "auto", paddingLeft: 16 }}>
            {entry.dataKey === "revenue" ? fmtRevenue(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLegend({ payload }: any) {
  if (!payload) return null;
  return (
    <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", paddingTop: 10 }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 2, borderRadius: 2, background: entry.color }} />
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={268}>
      <AreaChart data={data} margin={{ top: 6, right: 4, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#E1306C" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#E1306C" stopOpacity={0}    />
          </linearGradient>
          <linearGradient id="gradConversions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2AABEE" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#2AABEE" stopOpacity={0}   />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.035)"
          vertical={false}
          strokeDasharray="0"
        />

        <XAxis
          dataKey="hour"
          tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={3}
        />

        {/* Left axis — revenue */}
        <YAxis
          yAxisId="rev"
          orientation="left"
          tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtRevenue}
          width={44}
        />

        {/* Right axis — conversions */}
        <YAxis
          yAxisId="conv"
          orientation="right"
          tick={{ fill: "rgba(255,255,255,0.18)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={28}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1, strokeDasharray: "4 4" }}
        />

        <Legend content={<CustomLegend />} />

        {/* Revenue area */}
        <Area
          yAxisId="rev"
          type="monotone"
          dataKey="revenue"
          name="Faturamento"
          stroke="#E1306C"
          strokeWidth={1.5}
          fill="url(#gradRevenue)"
          dot={false}
          activeDot={{ r: 3.5, fill: "#E1306C", stroke: "#070b12", strokeWidth: 2 }}
          isAnimationActive={false}
        />

        {/* Conversions area */}
        <Area
          yAxisId="conv"
          type="monotone"
          dataKey="conversions"
          name="Conversões"
          stroke="#2AABEE"
          strokeWidth={1.5}
          fill="url(#gradConversions)"
          dot={false}
          activeDot={{ r: 3.5, fill: "#2AABEE", stroke: "#070b12", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

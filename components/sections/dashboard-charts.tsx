"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { learningHours, skillRadar } from "@/content/dashboard"

const hoursConfig = {
  jam: { label: "Jam", color: "var(--chart-1)" },
} satisfies ChartConfig

const radarConfig = {
  nilai: { label: "Nilai", color: "var(--chart-2)" },
} satisfies ChartConfig

/**
 * Isi chart dashboard.
 *
 * Dipisah dari `dashboard.tsx` supaya recharts (heavy) bisa dimuat terpisah.
 * Modul ini TIDAK dirender di server — hasilnya hanya muncul setelah
 * section dashboard didekati, bukan di initial load.
 */
function DashboardCharts() {
  return (
    <>
      <ChartContainer config={hoursConfig} className="h-full w-full">
        <LineChart data={learningHours} margin={{ left: -12, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={36}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="jam"
            type="monotone"
            stroke="var(--color-jam)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </>
  )
}

function SkillRadarChart() {
  return (
    <ChartContainer config={radarConfig} className="h-full w-full">
      <RadarChart data={skillRadar} outerRadius="70%">
        <PolarGrid stroke="var(--muted-foreground)" opacity={0.18} />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
        />
        <Radar
          dataKey="nilai"
          stroke="var(--color-nilai)"
          fill="var(--color-nilai)"
          fillOpacity={0.25}
        />
      </RadarChart>
    </ChartContainer>
  )
}

function RecentHoursChart() {
  return (
    <ChartContainer config={hoursConfig} className="h-full w-full">
      <BarChart data={learningHours.slice(-6)} margin={{ top: 4 }}>
        <XAxis dataKey="month" hide />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="jam" fill="var(--color-jam)" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

export { DashboardCharts, RecentHoursChart, SkillRadarChart }

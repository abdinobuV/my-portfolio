"use client"

import * as React from "react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { Counter } from "@/components/animations/counter"
import { learningHours, skillRadar, streak } from "@/content/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
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
import { cn } from "cn"

const hoursConfig = {
  jam: { label: "Jam", color: "var(--chart-1)" },
} satisfies ChartConfig

const radarConfig = {
  nilai: { label: "Nilai", color: "var(--chart-2)" },
} satisfies ChartConfig

function Dashboard() {
  return (
    <Section id="dashboard">
      <SectionHeading
        index="05"
        title="Dashboard"
        description="Snapshot progres belajar mingguan — statistik kecil yang menjaga saya konsisten."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Streak aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-4xl font-semibold">
                <Counter value={streak.hariBerturut} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">hari berturut-turut</p>
              <div className="mt-5 flex gap-1.5" aria-label="Aktivitas minggu ini">
                {streak.mingguIni.map((done, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      className={cn(
                        "size-6 border border-border",
                        done ? "bg-foreground" : "bg-transparent"
                      )}
                      aria-hidden
                    />
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {streak.labelHari[i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="sr-only">
                {streak.mingguIni.filter(Boolean).length} dari 7 hari minggu ini
                aktif.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="h-full md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Jam belajar per bulan</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ChartContainer config={hoursConfig} className="h-full w-full">
                <LineChart data={learningHours} margin={{ left: -12, right: 8, top: 8 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} width={36} />
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
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="h-full md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Distribusi skill</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ChartContainer config={radarConfig} className="h-full w-full">
                <RadarChart data={skillRadar} outerRadius="70%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10 }}
                  />
                  <Radar
                    dataKey="nilai"
                    stroke="var(--color-nilai)"
                    fill="var(--color-nilai)"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Total jam</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-4xl font-semibold">
                <Counter value={860} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                jam belajar sejak 2024
              </p>
              <div className="mt-6 h-24">
                <ChartContainer config={hoursConfig} className="h-full w-full">
                  <BarChart data={learningHours.slice(-6)} margin={{ top: 4 }}>
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="jam" fill="var(--color-jam)" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

export { Dashboard }

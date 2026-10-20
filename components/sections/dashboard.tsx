"use client"

import * as React from "react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { Counter } from "@/components/animations/counter"
import {
  HoursChartSlot,
  RadarChartSlot,
  RecentHoursSlot,
} from "@/components/sections/dashboard-charts-lazy"
import { learningHours, streak } from "@/content/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"

const totalHours = learningHours.reduce((total, month) => total + month.jam, 0)

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
              <HoursChartSlot />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="h-full md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Distribusi skill</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <RadarChartSlot />
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
                <Counter value={totalHours} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                jam belajar, {learningHours[0].month}–{learningHours.at(-1)?.month}
              </p>
              <div className="mt-6 h-24">
                <RecentHoursSlot />
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

export { Dashboard }

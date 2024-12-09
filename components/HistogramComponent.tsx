"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  ageGroup: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Age Group",
    color: "hsl(var(--chart-1))",
  },
};

export function HistogramComponent() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    axios
      .get<number[]>("http://localhost:8000/histogram-data")
      .then((response) => {
        const bins = Array(10).fill(0);
        response.data.forEach((age) => {
          if (typeof age === "number") {
            const index = Math.min(Math.floor(age / 10), bins.length - 1);
            bins[index]++;
          }
        });
        setData(
          bins.map((count, index) => ({
            ageGroup: `${index * 10}-${index * 10 + 9}`,
            count,
          }))
        );
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>Histogram of Age Groups</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={500}
            height={300}
            data={data}
            accessibilityLayer
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />} // Use "line" instead of "solid"
            />
            <Bar dataKey="count" fill="var(--color-age)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Insights on age distribution
        </div>
        <div className="leading-none text-muted-foreground">
          Data shows the number of individuals in each age group.
        </div>
      </CardFooter>
    </Card>
  );
}

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

interface BarData {
  group: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Passenger Classes by Gender",
    color: "hsl(var(--chart-1))",
  },
};

export function BarChartComponent() {
  const [data, setData] = useState<BarData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/bar-data").then((response) => {
      setData(
        response.data.map((item: any) => ({
          group: `${item.class} - ${item.sex}`,
          count: item.count,
        }))
      );
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Classes by Gender</CardTitle>
        <CardDescription>Grouped by class and gender</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-pink)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Insights on passenger class distribution by gender.
        </div>
        <div className="leading-none text-muted-foreground">
          Data from a sample of passenger classes and genders.
        </div>
      </CardFooter>
    </Card>
  );
}

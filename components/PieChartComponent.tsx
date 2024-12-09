"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PieData {
  name: string;
  value: number;
}

const chartConfig = {
  pclass: {
    label: "Passenger Class Distribution",
    color: "hsl(var(--chart-1))",
  },
};

export function PieChartComponent() {
  const [data, setData] = useState<PieData[]>([]);
  const colors = ["#1B1212", "#696969", "#A9A9A9"]; // Dark shades for the pie segments

  useEffect(() => {
    axios.get("http://localhost:8000/pie-data").then((response) => {
      setData(
        response.data.map((item: any) => ({
          name: item.class,  // Changed 'status' to 'class'
          value: item.percentage * 100,
        }))
      );
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Class Distribution</CardTitle>
        <CardDescription>Percentage of passengers in each class</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="var(--color-blue)"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The percentage of passengers in each class is displayed here.
        </div>
        <div className="leading-none text-muted-foreground">
          This data is based on a historical dataset of passenger classes.
        </div>
      </CardFooter>
    </Card>
  );
}

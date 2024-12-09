"use client";

import { BarChartComponent } from "@/components/BarChartComponent";
import { PieChartComponent } from "@/components/PieChartComponent";
import { HistogramComponent } from "@/components/HistogramComponent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ChartPage() {
    return (
        <>
            <div className="h-14 px-4 flex items-center">
                <Link href="/">
                    <div className="size-8 flex items-center cursor-pointer justify-center text-white rounded-full bg-zinc-950">
                        <ArrowLeft />
                    </div>
                </Link>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <BarChartComponent />
                <PieChartComponent />
                <HistogramComponent />
            </div>
        </>
    );
}

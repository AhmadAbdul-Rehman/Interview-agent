"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function Home() {
    const [data, setData] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const getData = async () => {
        startTransition(async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const response = await axios.get("http://127.0.0.1:8000/");
                console.log(response)
                setData(response.data.message);
                console.log(response.data.message);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    return (
        <div className="h-screen">
            <Header />
            <div className="container mx-auto px-5 pt-10 md:px-7 lg:px-9">
                <h1 className="font-semibold pb-2 text-xl">GET request from FastAPI</h1>
                <Button onClick={getData} disabled={isPending} className="mb-4">
                    {isPending ? "Fetching..." : "Fetch Data"}
                </Button>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>FastAPI Check</CardTitle>
                        <CardDescription>
                            Fetched Data From FastAPI:
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center space-x-4 rounded-md border p-4">
                            {data ? (
                                isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" />
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    <p className="text-md text-gray-600">
                                        {data}
                                    </p>
                                )
                            ) : (
                                <p className="text-sm text-gray-800">
                                    Data will show here
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

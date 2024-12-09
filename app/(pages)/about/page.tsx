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
import { ArrowLeft, GithubIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function About() {
    const notify = (title: string, desc: string) => {
        toast.success(`${title}`, {
            duration: 3000,
            description: `${desc}`,
            action: {
                label: "undo",
                onClick: () => console.log("undo"),
            },
        });
    };
    return (
        <>
            <div className="h-14 px-4 flex items-center">
                <Link href="/">
                    <div className="size-8 flex items-center cursor-pointer justify-center text-white rounded-full bg-zinc-950">
                        <ArrowLeft />
                    </div>
                </Link>
            </div>
            <div className="h-[calc(100vh-56px)] flex w-3/4 mx-auto *:w-1/2 gap-5 items-center justify-center">
                {/* Joke side */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-mono text-gray-900">
                        About To-Do App
                    </h1>
                    <p className="font-mono text-lg tracking-tight">Intro:</p>
                    <p className="text-sm font-mono mb-3 text-gray-700">
                        This to-do application is built using Next.js, a popular
                        React framework, and FastAPI, a modern, fast,
                        low-pressure, and easy-to-use web framework for building
                        APIs with Python. The frontend is designed using
                        Tailwind CSS for styling, and the backend is built using
                        FastAPI's features for creating RESTful APIs and
                        integrating with databases. The application should be
                        able to handle a large number of tasks efficiently and
                        provide a seamless user experience, including task
                        creation, editing, deletion, and marking tasks as
                        complete.
                    </p>
                    <div className="flex *:w-1/2 gap-2">
                        <Link href="/todo">
                            <Button variant="outline" className="w-full">Visit</Button>
                        </Link>
                        <Button>
                            <GithubIcon /> Github
                        </Button>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Complete Next.js Frontend</CardTitle>
                            <CardDescription>
                                Build the user interface for the to-do app.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                The Next.js frontend is the heart of this to-do
                                application. It should include all essential
                                features such as task creation, editing,
                                deletion, and marking tasks as complete. The
                                design must be clean, intuitive, and fully
                                responsive, ensuring it works seamlessly across
                                all devices. Additionally, it should integrate
                                with the FastAPI backend to dynamically fetch,
                                display, and update task data in real-time,
                                providing a smooth user experience. Consider
                                adding accessibility features to ensure
                                inclusivity.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

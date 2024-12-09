"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Zap } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/todo", label: "Todo" },
    { href: "/charts", label: "Charts" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link
                            href="/"
                            passHref
                            className="mr-6 flex items-center gap-1"
                        >
                            <Zap className="h-6 w-6" />
                            <span className="font-mono font-medium text-xl">
                                FastAPI
                            </span>
                        </Link>
                        <div className="grid gap-4 py-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                >
                                    <Button variant="ghost" className="w-full text-lg text-gray-800 font-mono">
                                        {" "}
                                        {link.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link
                    href="/"
                    passHref
                    className="mr-6 hidden lg:flex items-center gap-1"
                >
                    <Zap className="h-6 w-6" />
                    <span className="font-mono font-medium text-xl">
                        FastAPI
                    </span>
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {navLinks.map((link) => (
                            <NavigationMenuLink key={link.href} asChild>
                                <Link href={link.href}>
                                    <Button variant="ghost">
                                        {link.label}
                                    </Button>
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">Sign in</Button>
                    <Button>Sign Up</Button>
                </div>
            </header>
        </div>
    );
}

function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

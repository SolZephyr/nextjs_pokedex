"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname().split("/")[1];
    const navList = [
        { "slug": [""], "label": "Home" },
        { "slug": ["search","pokemon"], "label": "Pokédex" },
        { "slug": ["types"], "label": "Types" },
        { "slug": ["favorites"], "label": "Favourites" }
    ]

    return (
        <header className="grid grid-cols-2 sm:px-14 self-start w-full">
            <div className="flex flex-row items-center">
                <Image src={logo} alt={"Site logo"} width={50} height={50} className="p-2 h-auto"></Image>
                <h1 className="text-4xl grid-column-1 text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Pokédex</h1>
            </div>
            <nav className="grid-column-2">
                <ul className="flex flex-row h-full justify-end items-center">
                    {navList.map((item, index) => (
                        <li key={index}>
                            <Link href={`/${item.slug[0]}`} className={`p-3 ${(item.slug.includes(pathname)) ? "bg-gradient-to-r from-orange-400 to-red-400 text-white" : ""} hover:bg-blue-500`}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
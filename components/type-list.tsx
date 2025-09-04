"use client";

import { PokemonType } from "@/lib/interface";
import PokemonTypeTag, { PokemonTypeTagButton, PokemonTypeTagButtonLoader } from "./pokemon-type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";

export default function TypeList({ types }: { types: PokemonType[] }) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParam = useSearchParams();
    const params = new URLSearchParams(searchParam);
    const list = (params.get("type")?.split(",") || []);

    const toggleType = (value: string) => {
        if (value) {
            const idx = list.findIndex((item) => item === value);
            if (idx < 0) {
                list.push(value);
            } else {
                list.splice(idx, 1);
            }
            if (list.length) {
                params.set("type", list.toString());
            } else {
                params.delete("type");
            }
            replace(`${pathname}?${params.toString()}`);
        }
    }

    const isSelected = (value: string) => {
        return (list.findIndex((item) => item === value) >= 0);
    }

    if (types === undefined) {
        return NotFound();
    }
    return (
        <div>
            <h2 className="text-4xl text-center py-8">Types</h2>
            <p className="text-center">Select one or two types.</p>
            <ul className="flex flex-row flex-wrap justify-center gap-1 py-2 max-w-[800px]">
                {types && types?.map((item, index) => (
                    <li key={index}>
                        <PokemonTypeTagButton type={item} selected={isSelected(item.name)} callback={toggleType} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function TypeTags({ types }: { types: PokemonType[] }) {
    return (
        <ul className="flex flex-row justify-center gap-1 py-2">
            {types?.map((item, index) => (
                <li key={index}>
                    <PokemonTypeTag type={item} />
                </li>
            ))}
        </ul>
    );
}

export function TypeListLoader() {
    return (
        <div>
            <h2 className="text-4xl text-center py-8">Types</h2>
            <p className="text-center">Select one or two types.</p>
            <ul className="flex flex-row flex-wrap justify-center gap-1 py-2 max-w-[800px]">
                {Array.from({ length: 18 }, (_, i) =>
                    <li key={i}>
                        <PokemonTypeTagButtonLoader />
                    </li>
                )}
            </ul>
        </div>
    );
}
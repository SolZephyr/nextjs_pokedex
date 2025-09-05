import PokemonList, { PokemonListLoader } from "@/components/list/pokemon-list";
import SearchBar from "@/components/filter/searchbar";
import { ListFilter } from "@/lib/interface";
import { Suspense } from "react";

export default async function Page({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { page, limit, order, query } = await searchParams;

    const DEEFAULT_LIMIT = 20;
    const lmt = Number(limit) || DEEFAULT_LIMIT;
    const off = Math.floor(((Number(page) || 1) - 1) * lmt);

    const params: ListFilter = {
        offset: off,
        limit: lmt,
        order: (order ? order : undefined),
        query: (query ? query : undefined)
    };
    return (
        <>
            <section className="p-14 flex flex-row justify-center">
                <SearchBar placeholder={"Search for a Pokémon..."} />
            </section>
            <section className="bg-purple-50 px-14 pb-10">
                <h2 className="text-4xl text-center py-8">Pokémon</h2>
                <Suspense fallback={<PokemonListLoader key={Math.random()} />}>
                    <PokemonList filter={params} />
                </Suspense>
            </section>
        </>
    );
}
import TypeFilter from "@/components/filter/type-filter";
import { TypeListLoader } from "@/components/filter/type-list";
import PokemonList, { PokemonListLoader } from "@/components/list/pokemon-list";
import { ListFilter } from "@/lib/interface";
import { Suspense } from "react";

export default async function Page({ searchParams, }: { searchParams: Promise<{ [key: string]: string | undefined }>; }) {
    const { page, limit, order, type } = await searchParams;

    const DEEFAULT_LIMIT = 20;
    const lmt = Number(limit) || DEEFAULT_LIMIT;
    const off = Math.floor(((Number(page) || 1) - 1) * lmt);
    const odr = (order || undefined);
    const types = (type?.split(",") || []);

    const filter: ListFilter = {
        offset: off,
        limit: lmt,
        order: odr,
        types: types
    }
    return (
        <>
            <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
                <Suspense fallback={<TypeListLoader />}>
                    <TypeFilter />
                </Suspense>
            </section>
            <section className="bg-purple-50 px-14 pb-10 grow">
                <h2 className="text-4xl text-center py-8">Pokémon</h2>
                <Suspense fallback={<PokemonListLoader />}>
                    <PokemonList filter={filter} />
                </Suspense>
            </section>
        </>
    );
}
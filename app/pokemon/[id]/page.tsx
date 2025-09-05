import PokemonPage, { PokemonPageLoader } from "@/components/detail/pokemon-page";
import { POKEAPI } from "@/lib/pokeapi";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const result = await POKEAPI().pokemon().get(Number(id));
    if (!result.status || !result.pokemon) {
        return notFound();
    }
    const pkmn = result.pokemon;
    //
    return {
        title: `Pokémon: ${pkmn.name}`,
        description: `Read all about ${pkmn.name}`
    }
}

export default async function Page(
    { params, searchParams }:
        { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string }> }) {
    const { id } = await params;
    const { version } = await searchParams;
    return (
        <section className="p-14 flex flex-row justify-center bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)]">
            <Suspense fallback={<PokemonPageLoader />}>
                <PokemonPage id={Number(id)} version={version} />
            </Suspense>
        </section>
    );
}
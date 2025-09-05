import { POKEAPI, PokeApiResult } from "@/lib/pokeapi";
import { Pokemon } from "@/lib/interface";
import { Suspense } from "react";
import PokemonCard from "./pokemon-card";
import notFound from "@/app/not-found";

export default async function FeaturedList() {
    const result: PokeApiResult = await POKEAPI().pokemon().random(4);
    if (!result.status) {
        return notFound();
    }
    const featuredList: Pokemon[] = (result.pokemons || []);

    return (
        <section className="bg-purple-50 p-14">
            <h2 className="text-4xl text-center py-8">Featured Pokémon</h2>
            <Suspense fallback={<p>Loading...</p>}>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-4">
                    {featuredList.map((item, index) => (
                        <li key={index} className="grid-subgrid">
                            <PokemonCard pkmn={item} />
                        </li>
                    ))}
                </ul>
            </Suspense>
        </section>
    );
}
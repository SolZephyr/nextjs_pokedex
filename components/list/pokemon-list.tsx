import { ListFilter, Pokemon } from "@/lib/interface";
import { POKEAPI } from "@/lib/pokeapi";
import Pagination from "../filter/pagination";
import PokemonCard, { PokemonCardLoader } from "./pokemon-card";
import NotFound from "@/app/not-found";

export default async function PokemonList({ filter }: { filter: ListFilter }) {
    const offset = filter.offset;
    const limit = filter.limit;

    const result = await POKEAPI().pokemon().list(filter);
    if (!result.status) {
        return NotFound();
    }
    const list: Pokemon[] = (result.pokemons || []);
    const total = result.total || 0;

    let message = undefined;
    if (filter.types !== undefined) {
        if (filter.types.length <= 0) {
            message = "Select a type for results.";
        } else if (filter.types.length > 2) {
            message = "No pokémon has more than 2 types.";
        } else if (list.length <= 0) {
            message = "No results found.";
        }
    } else if (list.length <= 0) {
        message = "No results found.";
    }
    if (message) {
        return (
            <p className="text-xl text-center">{message}</p>
        );
    }
    return (
        <section className="pb-8">
            <Pagination offset={offset} limit={limit} total={total} isTop={true} />
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-4">
                {list.map((item, index) => (
                    <li key={index}>
                        <PokemonCard pkmn={item} />
                    </li>
                ))}
            </ul>
            <Pagination offset={offset} limit={limit} total={total} />
        </section>
    );
}

export function PokemonListLoader() {
    return (
        <section className="pb-8">
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-flow-row auto-rows-auto justify-center gap-4">
                <PokemonCardLoader />
                <PokemonCardLoader />
                <PokemonCardLoader />
                <PokemonCardLoader />
                <PokemonCardLoader />
            </ul>
        </section>
    );
}
import { PokemonType } from "@/lib/interface";
import { POKEAPI } from "@/lib/pokeapi";
import TypeList from "./type-list";

export const revalidate = 60;

export default async function TypeFilter() {

    let types: PokemonType[] = [];

    const result = await POKEAPI().types().list();
    if (result.status) {
        types = (result.types || []);
    }
    return (
        <TypeList types={types} />
    );


}
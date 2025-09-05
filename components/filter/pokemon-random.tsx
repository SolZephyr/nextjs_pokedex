"use client";

import { Pokemon } from "@/lib/interface";
import { POKEAPI, PokeApiResult } from "@/lib/pokeapi";
import Image from "next/image";
import { Suspense, useState } from "react";
import React from "react";
import { Loader } from "lucide-react";
import PokemonCard from "../list/pokemon-card";

export default function PokemonRandom() {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
    const [loadRandom, setLoadRandom] = useState<boolean>(false);

    async function getRandomPokemon() {
        setLoadRandom(true);
        setPokemon(undefined);
        // TODO: Get actual total
        //const tmp: PokeApiResult = await POKEAPI().pokemon().count({});
        //console.log(tmp);
        const result: PokeApiResult = await POKEAPI().pokemon().random(1);
        if (result.status) {
            const resultList: Pokemon[] = (result.pokemons || []);
            if (resultList.length > 0) {
                setLoadRandom(false);
                setPokemon(resultList[0]);
            } else {
                console.log("No result. Redoing...");
                getRandomPokemon();
            }
        }
    }

    return (
        <>
            <button onClick={getRandomPokemon} className="btn-primary">
                <Image
                    src="/Dice.svg"
                    width={25}
                    height={25}
                    alt="Dice"
                />
                Random Pokémon</button>
            {loadRandom ? <Loader className="animate-spin text-white w-10 h-10" /> : ''}
            <Suspense fallback={<Loader className="animate-spin" />}>
                {(pokemon !== undefined ? <PokemonCard pkmn={pokemon} /> : '')}
            </Suspense>
        </>
    );
}
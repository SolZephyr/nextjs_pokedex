"use client";

import { Pokemon } from "@/lib/interface";
import { POKEAPI, PokeApiResult } from "@/lib/pokeapi";
import Image from "next/image";
import { Suspense, useState } from "react";
import React from "react";
import PokemonCard from "./pokemon-card";
import { Loader } from "lucide-react";

export default function PokemonRandom() {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
    const [loadRandom, setLoadRandom] = useState<boolean>(false);

    async function getRandomPokemon() {
        setLoadRandom(true);
        setPokemon(undefined);
        const tmp: PokeApiResult = await POKEAPI().pokemon().count({});
        console.log(tmp);
        const result: PokeApiResult = await POKEAPI().pokemon().random(1);
        setLoadRandom(false);
        if (result.status) {
            const resultList: Pokemon[] = (result.pokemons || []);
            if (resultList.length > 0) {
                setPokemon(resultList[0]);
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
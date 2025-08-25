"use client";
import { Pokemon } from "@/lib/interface";
import { POKEAPI, PokeApiResult } from "@/lib/pokeapi";
import Image from "next/image";
import { Suspense, useState } from "react";
import PokemonCard from "./pokemon-card";
import React from "react";

export function PokemonRandom() {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

    async function getRandomPokemon() {
        const result: PokeApiResult = await POKEAPI().pokemon().random(1);
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
            <Suspense fallback={<p>Loading featured...</p>}>
                {(pokemon !== undefined ? <PokemonCard poke={pokemon} /> : '')}
            </Suspense>
        </>
    );
}
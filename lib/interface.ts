
export interface Pokemon {
    id: number;
    name: string;
    pokemontypes?: [{ slot: number; type: PokemonType }]
    pokemonsprites?: PokemonSprites[]
}

export interface PokemonSprites {
    sprites: {
        other?: object;
        version?: object;
        front_default?: string;
        back_default?: string;
        front_female?: string;
        back_female?: string;
        front_shiny?: string;
        back_shiny?: string;
        back_shiny_female?: string;
        front_shiny_female?: string;
    }
}

export interface PokemonType {
    id: number;
    name: string;
}
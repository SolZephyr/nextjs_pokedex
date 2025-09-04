
export interface ResponseGQL {
    status: number;
    error?: string;
    body: {
        data: {
            pokemon?: unknown;
            pokemontype?: unknown;
            pokemonmove?: unknown;
            version?: unknown;
            pokemon_aggregate?: { aggregate: { count: number; } }
        }
        errors?: unknown;
    }
}

export interface gql_Pokemon {
    id: number;
    pokemon_species_id: number;
    name: string;
    weight: number;
    height: number;
    pokemontypes: gql_PokemonTypes[];
    pokemonsprites: gql_PokemonSprites[];
    pokemonstats: gql_PokemonBaseStats[];
    pokemoncries?: gql_PokemonCries[];
    pokemonspecy?: { pokemonspeciesflavortexts?: gql_PokemonText[] };
}

interface gql_PokemonTypes {
    slot: number;
    type: {
        name: string;
    }
}

interface gql_PokemonSprites {
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

interface gql_PokemonBaseStats {
    stat: {
        name: string;
    }
    base_stat: number;
}

interface gql_PokemonCries {
    cries: {
        legacy: string;
        latest: string;
    }
}

interface gql_PokemonText {
    flavor_text: string;
}

export interface gql_PokemonType {
    type: {
        id: number;
        name: string;
    }
}

export interface gql_PokemonMove {
    move: {
        id: number;
        name: string;
        type: gql_PokemonType;
    }
}

export interface gql_Version {
    id: number;
    name: string;
    versiongroup: {
        generation: {
            name: string
        }
    }
    pokemonspeciesflavortexts?: [
        { flavor_text: string; }
    ]
    encounters?: [
        {
            locationarea: {
                location: {
                    name: string;
                }
            }
        }
    ]
}

export const fragment_pokemon = (
    { types, sprites, stats, cries, textVersionId }:
        { types?: boolean, sprites?: boolean, stats?: boolean, cries?: boolean, textVersionId?: number }
) => {
    return `fragment fragPokemon on pokemon {
                id
                pokemon_species_id
                name
                height
                weight
                ${(types ? '...fragPokemonTypeSlots' : '')}
                ${(sprites ? '...fragPokemonSprites' : '')}
                ${(stats ? '...fragPokemonStats' : '')}
                ${(cries ? '...fragPokemonCries' : '')}
                ${(textVersionId ? '...fragPokemonText' : '')}
            }
            ${(types ? fragment_pokemontypeslots() : '')}
            ${(sprites ? fragment_pokemonsprites() : '')}
            ${(stats ? fragment_pokemonstats() : '')}
            ${(cries ? fragment_pokemoncries() : '')}
            ${(textVersionId ? fragment_pokemontexts(textVersionId) : '')}
            `;
}

export const fragment_pokemontypeslots = () => {
    return `fragment fragPokemonTypeSlots on pokemon {
                pokemontypes {
                    slot
                    type {
                        id
                        name
                    }
                }
            }`;
}

export const fragment_pokemonsprites = () => {
    return `fragment fragPokemonSprites on pokemon {
                pokemonsprites {
                    sprites
                }
            }`;
}

export const fragment_pokemonstats = () => {
    return `fragment fragPokemonStats on pokemon {
                pokemonstats {
                    stat {
                        name
                    }
                    base_stat
                }
            }`;
}

export const fragment_pokemoncries = () => {
    return `fragment fragPokemonCries on pokemon {
                pokemoncries {
                    cries
                }
            }`;
}

export const fragment_pokemontexts = (versionId: number) => {
    return `fragment fragPokemonText on pokemon {
                pokemonspecy {
                    pokemonspeciesflavortexts(where:  {
                        version:  {
                            id:  {
                            _eq: ${versionId}
                            }
                        }
                        language:  {
                            name:  {
                            _eq: "en"
                            }
                        }
                    }) {
                        flavor_text
                    }
                }
            }`;
}

export const fragment_pokemontype = () => {
    return `fragment fragPokemonType on pokemontype {
                type {
                    id
                    name
                }
            }`;
}
import { Pokemon } from "./interface";

export interface PokeApiResult {
    status: number;
    error: string;
    pokemons?: Pokemon[];
    pokemon?: Pokemon;
}

export const POKEAPI = () => {

    interface ResponseGQL {
        status: number;
        error?: string;
        body: {
            data: {
                pokemon_aggregate: {
                    aggregate?: unknown;
                    nodes?: unknown;
                }
                error?: unknown;
            }
        }
    }

    const endpoint = "https://graphql.pokeapi.co/v1beta2";
    const total = 1025;

    async function request(data: object) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                return {
                    status: response.status,
                    error: response.statusText
                }
                throw new Error(response.statusText);
            }
            const body = await response.json();
            return {
                status: response.status,
                body
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(`${error instanceof Error ? error.message : String(error)}`);
        }
    }

    const pokemon = () => {

        const randomIds = (count: number) => {
            const arr: number[] = [];
            for (let i = 0; i < count; i++) {
                arr.push(Math.floor(Math.random() * (total - 1)));
            }
            return arr;
        }

        const random = async (count: number) => {
            const where = `{
                id: {
                    _in: [${randomIds(count).toString()}]
                }
            }`;
            const response = await request({
                query:
                    `query {
                    pokemon_aggregate(limit: ${count} where: ${where} ) {
                        nodes {
                            id
                            name
                            pokemontypes {
                                slot
                                type {
                                    name
                                }
                            }
                            pokemonsprites {
                                sprites
                            }
                        }
                    }
                }`
            }) as ResponseGQL;
            return {
                status: response.status,
                pokemons: (response?.body?.data?.pokemon_aggregate?.nodes || []) as Pokemon[]
            } as PokeApiResult;
        }

        return { random };
    }
    return { pokemon };

}
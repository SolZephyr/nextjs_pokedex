import { ListFilter, PkmnVersion, Pokemon, PokemonMove, PokemonSprites, PokemonType } from "./interface";
import { fragment_pokemon, fragment_pokemontype, gql_Pokemon, gql_PokemonMove, gql_PokemonType, gql_Version, ResponseGQL } from "./pokegql";

export interface PokeApiResult {
    status: number;
    error?: string;
    pokemons?: Pokemon[];
    pokemon?: Pokemon;
    types?: PokemonType[];
    moves?: PokemonMove[];
    versions?: PkmnVersion[];
    total?: number;
}

export const POKEAPI = () => {

    const endpoint = "https://graphql.pokeapi.co/v1beta2";

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
                //throw new Error(response.statusText);
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

    function unpack_pokemon(data: gql_Pokemon) {
        const id = data.id;
        const specyId = data.pokemon_species_id;
        const name = data.name;
        const weight = data.weight;
        const height = data.height;
        const types: PokemonType[] = [];
        const sprites: PokemonSprites[] = [];
        const pkmn: Pokemon = {
            id: id,
            specyId: specyId,
            name: name,
            weight: weight,
            height: height
        }
        // Types
        if (data.pokemontypes) {
            data.pokemontypes.forEach(item => {
                const _type: PokemonType = {
                    id: item.slot,
                    name: item.type.name
                }
                types.push(_type);
            });
        }
        pkmn.types = types;
        // Sprites
        if (data.pokemonsprites) {
            data.pokemonsprites.forEach(item => {
                const _sprites: PokemonSprites = {
                    front_default: (item.sprites.front_default || ""),
                    back_default: (item.sprites.back_default || ""),
                    front_female: (item.sprites.front_female || ""),
                    back_female: (item.sprites.back_female || ""),
                    front_shiny: (item.sprites.front_shiny || ""),
                    back_shiny: (item.sprites.back_shiny || ""),
                    back_shiny_female: (item.sprites.back_shiny_female || ""),
                    front_shiny_female: (item.sprites.front_shiny_female || "")
                }
                sprites.push(_sprites);
            });
        }
        pkmn.sprites = sprites;
        // Stats
        if (data.pokemonstats) {
            data.pokemonstats.forEach(item => {
                switch (item.stat.name) {
                    case "hp":
                        pkmn.base_health = item.base_stat;
                        break;
                    case "attack":
                        pkmn.base_attack = item.base_stat;
                        break;
                    case "defense":
                        pkmn.base_defense = item.base_stat;
                        break;
                    case "special-attack":
                        pkmn.base_sp_attack = item.base_stat;
                        break;
                    case "special-defense":
                        pkmn.base_sp_defense = item.base_stat;
                        break;
                    case "speed":
                        pkmn.base_speed = item.base_stat;
                        break;
                }
            });
        }
        // Cries
        if (data.pokemoncries) {
            data.pokemoncries.forEach(item => {
                pkmn.cry = item.cries.latest;
            });
        }
        // Flavor texts
        if (data.pokemonspecy?.pokemonspeciesflavortexts) {
            const textdata = data.pokemonspecy?.pokemonspeciesflavortexts;
            textdata.forEach(item => {
                pkmn.flavor_text = item.flavor_text;
            });
        }
        return pkmn;
    }

    function unpack_pokemontype(data: gql_PokemonType) {
        const id = data.type.id;
        const name = data.type.name;
        const pkmntype: PokemonType = {
            id: id,
            name: name
        }
        return pkmntype;
    }

    function unpack_pokemonmove(data: gql_PokemonMove) {
        const id = data.move.id;
        const name = data.move.name;
        const type = unpack_pokemontype(data.move.type);
        const pkmnmove: PokemonMove = {
            id: id,
            name: name,
            type: type
        }
        return pkmnmove;
    }

    function unpack_version(data: gql_Version) {
        const id = data.id;
        const name = data.name;
        const generation = data.versiongroup.generation.name;
        let pkmn = undefined;
        //
        let flavortext = "";
        const encounters: string[] = [];
        if (data.pokemonspeciesflavortexts) {
            flavortext = data.pokemonspeciesflavortexts[0].flavor_text || "";
        }
        if (data.encounters) {
            data.encounters.forEach((item) => {
                encounters.push(item.locationarea.location.name);
            });
        }
        if (flavortext || encounters.length) {
            pkmn = {
                flavorText: flavortext,
                encounters: encounters
            }
        }
        const pkmnver: PkmnVersion = {
            id: id,
            name: name,
            generation: generation,
            pokemon: pkmn
        }
        return pkmnver;
    }

    const pokemon = () => {

        const randomIds = (count: number) => {
            const fixedTotal = 1302;
            const arr: number[] = [];
            for (let i = 0; i < count; i++) {
                arr.push(Math.floor(Math.random() * (fixedTotal - 1)));
            }
            return arr;
        }

        const count = async ({ query, types }: { query?: string, types?: string[] }) => {
            const whereName = (query) ? `name: {  _like: "%${query}%" }` : '';
            let whereTypes = '';
            if (types) {
                let andList = ``;
                for (const type of types) {
                    andList += `{ pokemontypes: { type: { name: { _eq: ${type} } } } }`;
                }
                whereTypes = `_and: [${andList}]`;
            }
            const where = `{
                            ${whereName}
                            ${whereTypes}
                            }`;
            const response = await request({
                query:
                    `query {
                        pokemon_aggregate(where: ${where}) {
                            aggregate {
                                count
                            }
                        }
                    }`
            });
            const count = response?.body?.data?.pokemon_aggregate.aggregate.count || 0;

            return {
                status: response.status,
                count: count
            } as PokeApiResult;
        }

        const random = async (count: number) => {
            const where = `{ 
                                id: {
                                    _in: [${randomIds(count).toString()}]
                                } 
                            }`;
            // distinct_on: [pokemon_species_id]
            const response = await request({
                query:
                    `query {
                        pokemon(
                            limit: ${count} where: ${where} ) 
                        {
                            ...fragPokemon
                        }
                    }
                    ${fragment_pokemon({ types: true, sprites: true, stats: true })}`
            }) as ResponseGQL;
            const result = response?.body?.data?.pokemon;

            const pokemons: Pokemon[] = [];
            if (result) {
                const data = result as [];
                data.forEach(item => {
                    pokemons.push(unpack_pokemon(item));
                });
            }
            return {
                status: response.status,
                pokemons: pokemons as Pokemon[]
            } as PokeApiResult;
        }

        const list = async ({ offset, limit, order, query, types }: ListFilter) => {
            const whereName = (query) ? `name: {  _like: "%${query}%" }` : '';
            let whereTypes = '';
            if (types) {
                let andList = ``;
                for (const type of types) {
                    andList += `{ pokemontypes: { type: { name: { _eq: ${type} } } } }`;
                }
                whereTypes = `_and: [${andList}]`;
            }
            let orderBy = `{ id: asc}`;
            if (order) {
                switch (order) {
                    case "id":
                        orderBy = `{ id: asc }`;
                        break;
                    case "name":
                        orderBy = `{ name: asc}`;
                        break;
                }
            }
            const where = `{
                            ${whereName}
                            ${whereTypes}
                            }`;
            const response = await request({
                query:
                    `query {
                        pokemon(
                            order_by: ${orderBy}
                            offset: ${offset}
                            limit: ${limit}
                            where: ${where})
                        {
                            ...fragPokemon
                        }
                        pokemon_aggregate(
                            where: ${where})
                        {
                            aggregate { count }
                        }
                    }
                    ${fragment_pokemon({ types: true, sprites: true, stats: true })}`
            }) as ResponseGQL;
            const result = response?.body?.data;

            const pokemons: Pokemon[] = [];
            let total = 0;
            if (result) {
                const data = result.pokemon as [];
                data.forEach(item => {
                    pokemons.push(unpack_pokemon(item));
                });
                total = result.pokemon_aggregate?.aggregate.count || 0;
            }
            return {
                status: response.status,
                pokemons: pokemons as Pokemon[],
                total: total
            } as PokeApiResult;
        }

        const get = async (id: number, version?: number) => {
            const where = `{ id: { _eq: ${id} } }`;
            const response = await request({
                query:
                    `query {
                        pokemon( where: ${where}) {
                            ...fragPokemon
                        }
                    }
                    ${fragment_pokemon({ types: true, sprites: true, stats: true, cries: true, textVersionId: version })}`
            }) as ResponseGQL;
            const result = response?.body?.data?.pokemon;

            let pokemon: Pokemon | undefined;
            if (result) {
                const data = result as [];
                const item = data.at(0);
                if (item !== undefined) {
                    pokemon = unpack_pokemon(item);
                }
            }
            return {
                status: response.status,
                pokemon: pokemon
            } as PokeApiResult;
        }

        return { random, count, list, get };
    }

    const types = () => {
        const list = async () => {
            const response = await request({
                query:
                    `query {
                        pokemontype(distinct_on: [type_id]) {
                            ...fragPokemonType
                        }
                    }
                    ${fragment_pokemontype()}`
            }) as ResponseGQL;
            const result = response?.body?.data?.pokemontype;

            const pokemontypes: PokemonType[] = [];
            if (result !== undefined) {
                const data = result as [];
                data.forEach(item => {
                    pokemontypes.push(unpack_pokemontype(item));
                });
            }
            return {
                status: response.status,
                types: pokemontypes as PokemonType[]
            } as PokeApiResult;
        }

        return { list };
    }

    const moves = () => {
        const list = async (pkmnId: number) => {
            const response = await request({
                query:
                    `query {
                        pokemonmove(where:  {
                            pokemon_id:  {
                                _eq: ${pkmnId}
                            }
                            movelearnmethod:  {
                                name:  {
                                _eq: "level-up"
                                }
                            }
                        }) {
                            move {
                                name
                                type {
                                    name
                                }
                            }  
                        }
                    }`
            }) as ResponseGQL;
            const result = response?.body?.data?.pokemonmove;

            const pokemonmoves: PokemonMove[] = [];
            if (result !== undefined) {
                const data = result as [];
                data.forEach(item => {
                    pokemonmoves.push(unpack_pokemonmove(item));
                });
            }
            return {
                status: response.status,
                moves: pokemonmoves as PokemonMove[]
            } as PokeApiResult;
        }

        return { list };
    }

    const versions = () => {
        const list = async (specyId: number) => {
            const response = await request({
                query:
                    `query {
                        version(where:  {
                            pokemonspeciesflavortexts:  {
                                pokemon_species_id:  {
                                    _eq: ${specyId}
                                }
                            }
                        }) {
                            id
                            name
                            versiongroup {
                                generation {
                                    id
                                    name
                                }
                            }
                        }
                    }`
            }) as ResponseGQL;
            const result = response?.body?.data?.version;

            const versions: PkmnVersion[] = [];
            if (result !== undefined) {
                const data = result as [];
                data.forEach(item => {
                    versions.push(unpack_version(item));
                });
            }
            return {
                status: response.status,
                versions: versions as PkmnVersion[]
            } as PokeApiResult;
        }

        const get = async (specyId: number, pkmnId: number, version: string) => {
            const response = await request({
                query:
                    `query {
                        version(where:  {
                            name:  {
                                _eq: "${version}"
                            }
                        }) {
                            id
                            name
                            versiongroup {
                                generation {
                                    id
                                    name
                                }
                            }
                            pokemonspeciesflavortexts(where: {
                                language:  { name:  { _eq: "en" } }
                                pokemon_species_id: {_eq: ${specyId}}
                            }) {
                                flavor_text
                            }
                            encounters (where:  {
                                pokemon_id:  {
                                    _eq: ${pkmnId}
                                }
                                }) {
                                locationarea {
                                    location {
                                    name
                                    }
                                }
                                version {
                                    name
                                }
                            }
                        }
                    }`
            }) as ResponseGQL;
            const result = response?.body?.data?.version;

            const versions: PkmnVersion[] = [];
            if (result !== undefined) {
                const data = result as [];
                data.forEach(item => {
                    versions.push(unpack_version(item));
                });
            }
            return {
                status: response.status,
                versions: versions as PkmnVersion[]
            } as PokeApiResult;
        }

        return { list, get };
    }

    return { pokemon, types, moves, versions };
}

export interface Pokemon {
    id: number;
    specyId: number;
    name: string;
    weight: number;
    height: number;
    types?: PokemonType[];
    sprites?: PokemonSprites[];
    base_health?: number;
    base_attack?: number;
    base_defense?: number;
    base_sp_attack?: number;
    base_sp_defense?: number;
    base_speed?: number;
    cry?: string;
    flavor_text?: string;
}

export interface PokemonSprites {
    front_default: string;
    back_default: string;
    front_female?: string;
    back_female?: string;
    front_shiny?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_shiny_female?: string;
}

export interface PokemonBaseStats {
    stat: {
        name: string;
    }
    base_stat: number;
}

export interface PokemonType {
    id: number;
    name: string;
}

export interface PokemonMove {
    id: number;
    name: string;
    type: PokemonType;
}

export interface PkmnVersion {
    id: number;
    name: string;
    generation: string;
    pokemon?: {
        flavorText: string;
        encounters: string[];
    }
}

export interface TypeColor {
    name: string;
    spritePath: string;
    color: string;
}

export interface ListFilter {
    offset: number;
    limit: number;
    order?: string | string[] | undefined;
    query?: string | string[] | undefined;
    types?: string[] | undefined;
}
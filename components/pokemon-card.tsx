import { Pokemon, PokemonSprites } from "@/lib/interface";
import styles from "./pokemon-card.module.css";
import Image from "next/image";
import PokemonTypeTag from "./pokemontype";
import { capitalize } from "@/lib/util";

export default function PokemonCard({ poke }: { poke: Pokemon }) {
    const id = poke.id || 0;
    const name = capitalize(poke.name) || "Missing";
    const sprites = poke.pokemonsprites as PokemonSprites[];
    const item = sprites[0] as PokemonSprites;
    const image = (item.sprites.front_default || "");
    const typeslots = poke.pokemontypes;

    return (
        <article className={styles.pokemonCard}>
            <p className={styles.pokeName}>{name}</p>
            <p className={styles.pokeId}>#{id}</p>
            <figure>
                <Image src={image} alt={name} width={100} height={100} />
            </figure>
            <ul className={styles.types}>
                {typeslots?.map((item, index) => (
                    <li key={index}>
                        <PokemonTypeTag type={item.type} />
                    </li>
                ))}
            </ul>
        </article>
    );
}
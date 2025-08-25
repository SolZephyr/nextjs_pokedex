import { POKEAPI, PokeApiResult } from "@/lib/pokeapi";
import styles from "./featured.module.css";
import { Pokemon } from "@/lib/interface";
import PokemonCard from "./pokemon-card";

export default async function FeaturedList() {
    const result: PokeApiResult = await POKEAPI().pokemon().random(4);
    if (!result.status) {
        return (
            <p>ERROR!</p>
        );
    }
    const featuredList: Pokemon[] = (result.pokemons || []);

    return (
        <div className={styles.featured}>
            <h2>Featured</h2>
            <ul>
                {featuredList.map((item, index) => (
                    <li key={index}>
                        <PokemonCard poke={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
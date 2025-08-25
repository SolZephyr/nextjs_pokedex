import { PokemonType } from "@/lib/interface";
import styles from "./pokemontype.module.css";

export default function PokemonTypeTag({ type }: { type: PokemonType }) {

    const label = type.name.toUpperCase();
    return (
        <div className={styles.pokemonType} datatype={`type-${type.name}`}>
            <p>{label}</p>
        </div>
    );
}
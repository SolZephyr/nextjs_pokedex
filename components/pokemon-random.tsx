import Image from "next/image";

export async function PokemonRandom() {
    return (
        <>
            <button className="btn-primary">
                <Image
                    src="/Dice.svg"
                    width={25}
                    height={25}
                    alt="Dice"
                />
                Random Pokémon</button>
        </>
    );
}
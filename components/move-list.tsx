import { POKEAPI } from "@/lib/pokeapi";

export default async function MoveList({ pkmnId }: { pkmnId: number }) {
    //const result = await POKEAPI().moves().list(pkmnId);
    // if (!result.status || !result.pokemon) {
    //     return notFound();
    // }
    //const moves = result.moves;

    return (
        <section>
            <select name="" id="">
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select>
            <ul>
                <li>Hello</li>
            </ul>
        </section>
    );
}
import notFound from "@/app/not-found";
import { PokemonSprites } from "@/lib/interface";
import { POKEAPI } from "@/lib/pokeapi";
import { capitalize } from "@/lib/util";
import Image from "next/image";
import { Suspense } from "react";
import VersionFilter from "@/components/detail/version-filter";
import { TypeTags } from "../filter/type-list";
import ButtonAudio from "../common/button-audio";

export default async function PokemonPage({ id, version }: { id: number, version?: string }) {
    const result = await POKEAPI().pokemon().get(Number(id));
    if (!result.status || !result.pokemon) {
        return notFound();
    }
    const pkmn = result.pokemon;
    const pkmnId = pkmn.id;
    const specyId = pkmn.specyId;

    const name = capitalize(pkmn.name) || "Missing";
    const sprites = pkmn.sprites as PokemonSprites[];
    const item = sprites[0] as PokemonSprites;
    const image = (item.front_default || "");
    const types = pkmn.types || [];
    const primarytype = types?.at(0)?.name;
    const pkmncry = pkmn.cry;

    return (
        <article className={"grid grid-cols-2 bg-gray-50 p-8 border-5 border-blue-500 rounded-xl max-w-[800px] type-" + primarytype}>
            <h2 className="col-span-full row-start-1 text-4xl text-center py-4">Pokémon</h2>
            <section className="col-start-1 row-start-2 row-end-4 text-center">
                <figure className="pb-5 flex flex-column justify-center">
                    <div className={"bg-white border-5 rounded-full type-bdr p-10"}>
                        <Image src={image} alt={name} width={250} height={250} />
                    </div>
                </figure>
            </section>
            <section className="col-start-2 row-start-2 text-center">
                <h3 className="font-(family-name:--font-jersey) text-4xl mb-2">{name}</h3>
                <p><span className="field-id px-2 rounded-full">#{id}</span></p>
                <TypeTags types={types} />
                <h4 className="font-bold">Cry</h4>
                {pkmncry ?
                    <ButtonAudio src={pkmncry} />
                    : <p>No data recorded.</p>}
            </section>
            <section className="col-start-2 row-start-3 justify-self-center">
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>HP</li>
                    <li className="justify-self-end">{pkmn.base_health}</li>
                </ul>
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>Attack</li>
                    <li className="justify-self-end">{pkmn.base_attack}</li>
                </ul>
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>Defense</li>
                    <li className="justify-self-end">{pkmn.base_defense}</li>
                </ul>
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>Sp. Attack</li>
                    <li className="justify-self-end">{pkmn.base_sp_attack}</li>
                </ul>
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>Sp. Defense</li>
                    <li className="justify-self-end">{pkmn.base_sp_defense}</li>
                </ul>
                <ul className="grid grid-cols-2 justify-items-start font-extrabold">
                    <li>Speed</li>
                    <li className="justify-self-end">{pkmn.base_speed}</li>
                </ul>
            </section>
            <section className="col-span-full flex flex-col">
                <Suspense>
                    <VersionFilter specyId={specyId} pkmnId={pkmnId} version={version} />
                </Suspense>
            </section>
        </article>
    );
}

export async function PokemonPageLoader() {
    return (
        <article className={"grid grid-cols-2 bg-gray-50 p-8 border-5 border-gray-300 rounded-xl w-[800px] dark:text-gray-300 shadow-sm animate-pulse"}>
            <div className="col-span-full row-start-1 bg-gray-100 dark:bg-gray-300 rounded-full h-8 py-4 my-4"></div>
            <div className="col-start-1 row-start-2 row-end-4">
                <div className="w-[340px] h-[340px] border-5 rounded-full flex flex-column justify-center items-center p-10">
                    <svg className="w-10 h-10 text-gray-100 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                </div>
            </div>
            <section className="col-start-2 row-start-2 text-center">
                <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-8 py-4 my-4"></div>
                <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-8 py-4 my-2"></div>
                <ul className="flex flex-row justify-center gap-1 my-2">
                    <li><div className="bg-gray-100 dark:bg-gray-300 rounded-full w-25 h-8"></div></li>
                    <li><div className="bg-gray-100 dark:bg-gray-300 rounded-full w-25 h-8"></div></li>
                </ul>
            </section>
        </article>
    );
}
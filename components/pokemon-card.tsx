import { Pokemon, PokemonSprites } from "@/lib/interface";
import Image from "next/image";
import { capitalize } from "@/lib/util";
import Link from "next/link";
import logo from "@/public/Logo.png";
import { TypeTags } from "./type-list";

export default function PokemonCard({ pkmn }: { pkmn: Pokemon }) {
    const id = pkmn.id || 0;
    const name = capitalize(pkmn.name) || "Missing";
    const sprites = pkmn.sprites as PokemonSprites[];
    const item = sprites[0] as PokemonSprites;
    const image = (item.front_default || "");
    const types = pkmn.types || [];
    const primarytype = types?.at(0)?.name;

    return (
        <Link href={`/pokemon/${id}`}>
            <article className={"grid grid-subgrid justify-center min-w-[250px] border-5 border-blue-500 rounded-xl p-4 bg-blue-50 hover:bg-blue-100 text-center type-" + primarytype}>
                <figure className="mb-5 flex flex-column justify-center">
                    {image.length ?
                        <Image src={image} alt={name} width={100} height={100} className={"bg-white border-2 rounded-full type-bdr"} />
                        :
                        <Image src={logo} alt="Image was not found" width={100} height={100} className={"bg-white border-2 rounded-full"} />
                    }
                </figure>
                <p className="font-(family-name:--font-jersey) text-2xl">{name}</p>
                <p><span className="field-id px-2 rounded-full">#{id}</span></p>
                <TypeTags types={types} />
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
            </article>
        </Link>
    );
}

export function PokemonCardLoader() {
    return (
        <article className="grid grid-subgrid justify-center min-w-[250px] border-5 border-gray-300 rounded-xl p-4 dark:text-gray-300 shadow-sm animate-pulse">
            <div className="mb-5 flex flex-column justify-center">
                <div className="w-[100px] h-[100px] border-5 rounded-full flex flex-column justify-center items-center">
                    <svg className="w-10 h-10 text-gray-100 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-4 my-2"></div>
            <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-4 my-1"></div>
            <ul className="flex flex-row justify-center gap-1 my-2">
                <li><div className="bg-gray-100 dark:bg-gray-300 rounded-full w-25 h-8"></div></li>
                <li><div className="bg-gray-100 dark:bg-gray-300 rounded-full w-25 h-8"></div></li>
            </ul>
            <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-4 m-1"></div>
            <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-4 m-1"></div>
            <div className="bg-gray-100 dark:bg-gray-300 rounded-full h-4 m-1"></div>
        </article>
    );
}
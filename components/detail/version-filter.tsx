import { PkmnVersion } from "@/lib/interface";
import { POKEAPI } from "@/lib/pokeapi";
import { capitalizeWords, cleanString } from "@/lib/util";
import VersionList from "./version-list";

export default async function VersionFilter({ specyId, pkmnId, version }: { specyId: number, pkmnId: number, version?: string }) {
    let versions: PkmnVersion[] = [];
    let text = "Loading..."
    const encounters: string[] = [];
    {
        const result = await POKEAPI().versions().list(specyId);
        if (result.status) {
            versions = (result.versions || []);
        }
    }
    {
        const verIndex = versions.findIndex((ver) => (ver.name === version || ""));
        if (verIndex < 0) {
            version = versions[Math.max(0, versions.length - 1)].name;
        }
        version = version ? version : "";
        const result = await POKEAPI().versions().get(specyId, pkmnId, version);
        if (result.status && result.versions) {
            const obj = result.versions[0];
            text = obj?.pokemon?.flavorText || "Data not found.";
            obj?.pokemon?.encounters.forEach(item => encounters.push(item));
        }
    }
    return (
        <>
            <section>
                <h3 className="text-2xl py-1">Version appearence</h3>
                <VersionList versions={versions} selected={version} />
            </section>
            <DescriptionBox text={cleanString(text)} />
            <EncountersBox encounters={encounters} />
        </>
    );
}

async function DescriptionBox({ text }: { text: string }) {
    return (
        <section className="my-4">
            <h3 className="text-4xl py-4">Description</h3>
            <div className="border-5 border-blue-500 rounded-xl bg-white p-5 text-xl">
                <p>{text}</p>
            </div>
        </section>
    );
}

async function EncountersBox({ encounters }: { encounters: string[] }) {
    return (
        <section className="my-4">
            <h3 className="text-4xl py-4">Encounters</h3>
            <ul className="border-5 border-blue-500 rounded-xl bg-white p-5 text-xl">
                {encounters.map((enc, index) => (
                    <li key={index}>{capitalizeWords(enc)}</li>
                ))}
                {(encounters.length <= 0) ? <li>No data found.</li> : ''}
            </ul>
        </section>
    );
}
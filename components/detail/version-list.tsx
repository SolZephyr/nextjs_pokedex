"use client";

import { PkmnVersion } from "@/lib/interface";
import { capitalizeWords } from "@/lib/util";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function VersionList({ versions, selected }: { versions: PkmnVersion[], selected?: string }) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParam = useSearchParams();
    const params = new URLSearchParams(searchParam);
    let version = versions.find((ver) => (ver.name === selected || ""));
    if (version === undefined) {
        version = versions[Math.max(0, versions.length - 1)];
    }

    function handleChange(version: string): void {
        if (version) {
            params.set('version', version);
        } else {
            params.delete('version');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="grid grid-cols-1 col-span-full row-span-full justify-self-center items-center text-white font-bold text-xl w-[250px] border-3 border-transparent rounded-xl bg-blue-500 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-500">
            <label htmlFor="order" className="col-span-full row-span-full z-999 px-5 pointer-events-none">PKMN&nbsp;</label>
            <select name="version" id="version" onChange={(e) => handleChange(e.target.value)} defaultValue={(version !== undefined) ? version.name : ""} className="col-span-full row-span-full text-right border-r-[12px] border-transparent cursor-pointer">
                {versions.map((ver, index) => (
                    <option key={index} value={ver.name}>{capitalizeWords(ver.name)}</option>
                ))}
            </select>
        </div>
    );
}
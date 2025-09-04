"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ placeholder }: { placeholder?: string }) {

    const pathname = usePathname();
    const { replace } = useRouter();
    const [query, setQuery] = useState("");

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setQuery(value);
    }

    const handleSearch = () => {
        params.delete("page");
        if (pathname !== "/search") {
            // Navigate to search
            replace(`/search?query=${query}`);
        } else {
            if (query) {
                params.set("query", query);
            } else {
                params.delete("query");
            }
            replace(`${pathname}?${params.toString()}`);
        }
    }

    return (
        <div className="grid grid-cols-1 w-full max-w-[800px]">
            <input type="search" name="search" id="search" placeholder={placeholder ? placeholder : "Search..."} onChange={onChange} defaultValue={params.get("query")?.toString()}
                className="col-span-full row-span-full rounded-xl shadow-md p-2 pl-5 text-xl" />
            <button onClick={handleSearch} className="btn-search col-span-full row-span-full m-3 ml-auto w-[50px]"><Search /></button>
        </div>
    );
}
import { PokemonType } from "@/lib/interface";

export default function PokemonTypeTag({ type }: { type: PokemonType }) {

    const label = type.name.toUpperCase();
    const typeStyle = `type-${type.name} type-bg`;
    return (
        <div className={`px-2 py-1 text-white rounded-full text-center font-bold min-w-[80px] ${typeStyle} group-hover:text-black `}>
            <p>{label}</p>
        </div>
    );
}

export function PokemonTypeTagButton({ type, selected, callback }: { type: PokemonType, selected: boolean, callback: (value: string) => void }) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value || undefined;
        if (value) {
            callback(value);
        }
    }

    const label = type.name.toUpperCase();
    const typeStyle = `type-${type.name} type-bg`;
    return (
        <button onClick={handleClick} value={type.name} className="group">
            <div className={`px-2 py-1 text-white text-center font-bold min-w-[80px] border rounded-full ${typeStyle} group-hover:text-black border-2 cursor-pointer ` + (selected ? 'border-black' : 'border-transparent')}>
                <p>{label}</p>
            </div>
        </button>
    );
}

export function PokemonTypeTagButtonLoader() {
    return (
            <div className={`px-2 py-1 text-white text-center font-bold min-w-[80px] h-8 bg-gray-100 dark:bg-gray-300 rounded-full border-2 border-transparent shadow-sm animate-pulse`}></div>
    );
}
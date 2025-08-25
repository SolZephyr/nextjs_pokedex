import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {

    const navList = [
        { "slug": "", "label": "Home" },
        { "slug": "list", "label": "Pokémon" },
        { "slug": "types", "label": "Types" },
    ]

    return (
        <header className={styles.header}>
            <h1>POKÉDEX</h1>
            <nav>
                <ul>
                    {navList.map((item, index) => (
                        <li key={index}>
                            <Link href={`/${item.slug}`}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
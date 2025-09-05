import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Logo.png";
import facebook from "@/public/Facebook.svg";
import instagram from "@/public/Instagram.svg";

export default function Footer() {
    return (
        <footer className="flex flex-col px-14 py-10 bg-[var(--foreground)] text-white max-h-[260px] justify-self-end">
            <section className="flex flex-row justify-center items-center mb-4">
                <Image src={logo} alt={"Site logo"} width={50} height={50} className="p-2 w-[50px] h-auto"></Image>
                <h1 className="text-4xl grid-column-1 text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Pokédex</h1>
            </section>
            <section className="flex flex-col items-center">
                <p className="mb-4">Explore the world of Pokémon</p>
                <ul className="flex flex-row items-center">
                    <li className="m-4">
                        <Link href={""}><Image src={facebook} alt={"Facebook"} width={50} height={50}></Image></Link>
                    </li>
                    <li className="m-4">
                        <Link href={""}><Image src={instagram} alt={"Instagram"} width={50} height={50}></Image></Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
}
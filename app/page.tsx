import FeaturedList from "@/components/list/featured-list";
import SearchBar from "@/components/filter/searchbar";
import { Suspense } from "react";
import PokemonRandom from "@/components/filter/pokemon-random";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch &apos;em all!</h1>
        <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
        <Suspense>
          <PokemonRandom />
        </Suspense>
      </section>
      <section className="p-14 flex flex-row justify-center">
        <Suspense>
          <SearchBar placeholder={"Search for a Pokémon..."} />
        </Suspense>
      </section>
      <FeaturedList />
    </>
  );
}

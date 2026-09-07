import PokemonList from "./PokemonsList";

// This metadata is looked by NextJS to populate broser metadata on head of HTML elements
export const metadata = {
    title: "Pokemons page",
    description: "Page for pokemons"
}

async function getPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0", {
        // cache: "force-cache" // => SSG (Static Site Generation)
        next: {revalidate: 60} // regenerates every 60 seconds => ISR (Incremental Site Regeneration)
        //cache: "no-store" // Server re-render on every request => SSR (Server Side Rendering)
    });

    if(!res.ok) throw new Error("Failed to fetch pokemons")

    return res.json()
}


export default async function PokemonsPage() {
    
    const pokemonsResponse = await getPokemons()
    const pokemons = pokemonsResponse?.results
  

    return (
        <div>
            <PokemonList pokemons={pokemons} />
        </div>
    )
}
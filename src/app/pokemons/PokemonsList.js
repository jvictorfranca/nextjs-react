"use client"

export default function PokemonList({pokemons}) {
    return (
        <div>
            <section className="mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-6">Pokemons</h1>
            <ul className="space-y-4">
                {pokemons.map(pokemon => (
                    <li key={pokemon.url} >{pokemon.name}</li>
                ))}
            </ul>

            </section>
        </div>
    )
}
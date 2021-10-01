import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function PokemonDex() {
  const { id } = useParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${id} `
  const [pokemonData, setPokemon] = useState(null)

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setPokemon(res.data)
      })
  }, [url])

  if (pokemonData) {
    return (
      <div>
        <h1 className="font-bold text-2xl uppercase">{pokemonData.name} #{pokemonData.id}</h1>
        <div>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
        </div>

        <div>
          <span className="font-bold text-xl mb-3">TYPE</span>
          {
            pokemonData.types.map((type) =>
              <p>{type.type.name}</p>
            )
          }
        </div>

        <div>
          <span className="font-bold text-xl mb-3">BASE STAT</span>
          <ul>
            <li>HP : {pokemonData.stats[0].base_stat}</li>
            <li>Att : {pokemonData.stats[1].base_stat}</li>
            <li>Def : {pokemonData.stats[2].base_stat}</li>
            <li>Sp. Att : {pokemonData.stats[3].base_stat}</li>
            <li>Sp. Def : {pokemonData.stats[4].base_stat}</li>
            <li>Spd : {pokemonData.stats[5].base_stat}</li>
          </ul>
        </div>

        <div>
          <span className="font-bold text-xl mb-3">ABILITIES</span>
          <ul>
            {
              pokemonData.abilities.map((ability) =>
                <li>{ability.ability.name}</li>
              )
            }
          </ul>
        </div>

        <div>
          <span className="font-bold text-xl mb-3">Base Experience Yield</span>
          <p>{pokemonData.base_experience}</p>
          <span className="font-bold text-xl mb-3">Height</span>
          <p>{(pokemonData.height * 0.1).toFixed(1)}m</p>
          <span className="font-bold text-xl mb-3">Weight</span>
          <p>{(pokemonData.weight * 0.1).toFixed(1)}kg</p>
        </div>

        <span className="font-bold text-xl mb-3 text-blue-200">
          <Link
            to={`/pokemon/${pokemonData.id - 1}`}
          >
            #{`${pokemonData.id - 1}`}
          </Link>
        </span>
        <span className="font-bold text-xl mb-3 text-blue-200">
          <Link
            to={`/pokemon/${pokemonData.id + 1}`}
          >
            #{`${pokemonData.id + 1}`}
          </Link>
        </span>
      </div>
    )
  }

  return (
    <div>

    </div>
  )
}

export default PokemonDex
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader'

function PokemonDex() {
  const { id } = useParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${id} `
  const [pokemonData, setPokemonData] = useState({
    loading: false,
    data: null,
    error: false
  })

  useEffect(() => {
    setPokemonData({
      loading: true,
      data: null,
      error: false
    })
    axios.get(url)
      .then(response => {
        setPokemonData({
          loading: false,
          data: response.data,
          error: false
        })
      })
      .catch(() => {
        setPokemonData({
          loading: false,
          data: null,
          error: true
        })
      })
  }, [url])

  let content = null

  if (pokemonData.loading) {
    content = <Loader></Loader>
  }

  if (pokemonData.error) {
    content = <p>
      There was an error, please refresh or try again later.
    </p>
  }

  if (pokemonData.data) {
    content =
      <div>
        <h1 className="font-bold text-2xl uppercase">{pokemonData.data.name} #{pokemonData.data.id}</h1>
        <div>
          <img
            src={pokemonData.data.sprites.front_default}
            alt={pokemonData.data.name}
          />
        </div>

        <div>
          <span className="font-bold text-xl mb-3">TYPE</span>
          {
            pokemonData.data.types.map((type) =>
              <p>{type.type.name}</p>
            )
          }
        </div>

        <div>
          <span className="font-bold text-xl mb-3">BASE STAT</span>
          <ul>
            <li>HP : {pokemonData.data.stats[0].base_stat}</li>
            <li>Att : {pokemonData.data.stats[1].base_stat}</li>
            <li>Def : {pokemonData.data.stats[2].base_stat}</li>
            <li>Sp. Att : {pokemonData.data.stats[3].base_stat}</li>
            <li>Sp. Def : {pokemonData.data.stats[4].base_stat}</li>
            <li>Spd : {pokemonData.data.stats[5].base_stat}</li>
          </ul>
        </div>

        <div>
          <span className="font-bold text-xl mb-3">ABILITIES</span>
          <ul>
            {
              pokemonData.data.abilities.map((ability) =>
                <li>{ability.ability.name}</li>
              )
            }
          </ul>
        </div>

        <div>
          <span className="font-bold text-xl mb-3">Base Experience Yield</span>
          <p>{pokemonData.data.base_experience}</p>
          <span className="font-bold text-xl mb-3">Height</span>
          <p>{(pokemonData.data.height * 0.1).toFixed(1)}m</p>
          <span className="font-bold text-xl mb-3">Weight</span>
          <p>{(pokemonData.data.weight * 0.1).toFixed(1)}kg</p>
        </div>

        <span className="font-bold text-xl mb-3 text-blue-200">
          <Link
            to={`/pokemon/${pokemonData.data.id - 1}`}
          >
            #{`${pokemonData.data.id - 1}`}
          </Link>
        </span>
        <span className="font-bold text-xl mb-3 text-blue-200">
          <Link
            to={`/pokemon/${pokemonData.data.id + 1}`}
          >
            #{`${pokemonData.data.id + 1}`}
          </Link>
        </span>
      </div>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default PokemonDex
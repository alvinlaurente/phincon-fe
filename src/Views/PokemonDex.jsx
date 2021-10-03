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

  const [name, setName] = useState('')
  const [num, setNum] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setName('')
    setNum('')
    setMsg('')
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

  const catchPokemon = e => {
    e.preventDefault()

    const payload = JSON.stringify({
      id: pokemonData.data.id,
      name: name,
      image: pokemonData.data.sprites.front_default,
    })
    axios.post(`${process.env.REACT_APP_API_HOST}/catch`, payload, {
      "headers":{
        "content-type":"application/json",
      }
    })
    .then(response => {
      setNum(response.data.random)
      setMsg(response.data.message)
    })
    .catch(e => console.log(e))
  }

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
    let before = 0;
    let after = 0;
    before = pokemonData.data.id - 1;
    if(pokemonData.data.id === 1) { before = 10220 };
    if(pokemonData.data.id === 10001) { before = 898 };

    after = pokemonData.data.id + 1;
    if(pokemonData.data.id === 898) { after = 10001 };
    if(pokemonData.data.id === 10220) { after = 1 };

    content =
      <div className="max-w-screen-sm bg-green-500 rounded overflow-hidden grid m-auto shadow-lg text-center">

        <div className="bg-green-300 m-1 rounded grid grid-cols-2 font-bold text-2xl text-yellow-400 capitalize">
          <div className="bg-green-50 m-1 rounded"><Link
            to={`/pokemon/${before}`}
          >
            ←	#{`${before}`}
          </Link></div>
          <div className="bg-green-50 m-1 rounded"><Link
            to={`/pokemon/${after}`}
          >
            #{`${after}`} →
          </Link></div>
        </div>

        <div className="bg-green-300 m-1 rounded grid grid-cols-2 font-bold text-2xl capitalize">
          <div className="bg-green-50 m-1 rounded">{pokemonData.data.name}</div>
          <div className="bg-green-50 m-1 rounded">#{pokemonData.data.id}</div>
          <div className="col-span-2 bg-green-50 m-1 rounded">
            <img
              src={pokemonData.data.sprites.front_default}
              alt={pokemonData.data.name}
              className="m-auto"
            />
          </div>
        </div>


        <div className="bg-green-300 m-1 rounded">
          <span className="font-bold text-xl mb-3">Type</span>
          <div className="bg-green-50 m-1 rounded capitalize">
            {
              pokemonData.data.types.map((type) =>
                <span
                  key={type.slot}
                  className={`
                  ${type.type.name === "normal" ? "bg-normal" : "bg-unknown-type"}
                  ${type.type.name === "fighting" ? "bg-fighting" : "bg-unknown-type"} 
                  ${type.type.name === "flying" ? "bg-flying" : "bg-unknown-type"} 
                  ${type.type.name === "poison" ? "bg-poison" : "bg-unknown-type"} 
                  ${type.type.name === "ground" ? "bg-ground" : "bg-unknown-type"} 
                  ${type.type.name === "rock" ? "bg-rock" : "bg-unknown-type"} 
                  ${type.type.name === "bug" ? "bg-bug" : "bg-unknown-type"} 
                  ${type.type.name === "ghost" ? "bg-ghost" : "bg-unknown-type"} 
                  ${type.type.name === "steel" ? "bg-steel" : "bg-unknown-type"} 
                  ${type.type.name === "fire" ? "bg-fire" : "bg-unknown-type"}
                  ${type.type.name === "water" ? "bg-water" : "bg-unknown-type"} 
                  ${type.type.name === "grass" ? "bg-grass" : "bg-unknown-type"} 
                  ${type.type.name === "electric" ? "bg-electric" : "bg-unknown-type"}
                  ${type.type.name === "psychic" ? "bg-pyschic" : "bg-unknown-type"}
                  ${type.type.name === "ice" ? "bg-ice" : "bg-unknown-type"} 
                  ${type.type.name === "dragon" ? "bg-dragon" : "bg-unknown-type"}
                  ${type.type.name === "dark" ? "bg-dark" : "bg-unknown-type"} 
                  ${type.type.name === "fairy" ? "bg-fairy" : "bg-unknown-type"}  
                  
                  inline-block rounded px-3 mx-1 my-2 text-sm text-white font-semibold`}
                >
                  {type.type.name}
                </span>
              )
            }
          </div>
        </div>

        <div className="bg-green-300 m-1 rounded">
          <span className="font-bold text-xl mb-3">Abilities</span>
          <div className="bg-green-50 m-1 rounded grid grid-cols-2 capitalize">
            {
              pokemonData.data.abilities.map((ability) =>
                <div key={ability.ability.name}>{ability.ability.name}</div>
              )
            }
          </div>
        </div>

        <div className="bg-green-300rounded grid grid-cols-2">
          <div className="bg-green-300 m-1 rounded">
            <span className="font-bold text-xl ">Height</span>
            <div className="bg-green-50 m-1 rounded grid grid-cols-2">
              <div>{(pokemonData.data.height * 0.1).toFixed(1)} m</div>
              <div>{(pokemonData.data.height * 0.328084).toFixed(2)} ft</div>
            </div>
          </div>

          <div className="bg-green-300 m-1 rounded">
            <span className="font-bold text-xl ">Weight</span>
            <div className="bg-green-50 m-1 rounded grid grid-cols-2">
              <div>{(pokemonData.data.weight * 0.220462).toFixed(1)} lbs</div>
              <div>{(pokemonData.data.weight * 0.1).toFixed(1)} kg</div>
            </div>
          </div>
        </div>

        <div className="bg-green-300 m-1 rounded">
          <span className="font-bold text-xl">Base Experience Yield</span>
          <div className="bg-green-50 m-1 rounded">{pokemonData.data.base_experience}</div>
        </div>

        <div className="bg-green-300 m-1 rounded">
          <span className="font-bold text-xl">Base Stat</span>
          <div className="bg-green-50 m-1 rounded grid grid-cols-6 capitalize">
            <div className="grid bg-red-500 rounded m-3">
              <span>{pokemonData.data.stats[0].base_stat}</span>
              <span>HP</span>
            </div>
            <div className="grid bg-yellow-500 rounded m-3">
              <span>{pokemonData.data.stats[1].base_stat}</span>
              <span>Atk</span>
            </div>
            <div className="grid bg-yellow-300 rounded m-3">
              <span>{pokemonData.data.stats[2].base_stat}</span>
              <span>Def</span>
            </div>
            <div className="grid bg-blue-300 rounded m-3">
              <span>{pokemonData.data.stats[3].base_stat}</span>
              <span>Sp. Atk</span>
            </div>
            <div className="grid bg-green-400 rounded m-3">
              <span>{pokemonData.data.stats[4].base_stat}</span>
              <span>Sp. Def</span>
            </div>
            <div className="grid bg-pink-300 rounded m-3">
              <span>{pokemonData.data.stats[5].base_stat}</span>
              <span>Speed</span>
            </div>
          </div>
        </div>

        <div className="bg-green-300 m-1 rounded">
          <span className="font-bold text-xl mb-3">Moves</span>
          <ul className="bg-green-50 m-1 rounded">
            {
              pokemonData.data.moves.map((move) =>
                <li
                  key={move.move.name}
                  className="capitalize"
                >
                  {move.move.name}
                </li>
              )
            }
          </ul>
        </div>

        <div className="bg-green-300 m-1 rounded">
          <div className="bg-green-50 m-1 py-1 rounded">
            <form
            onSubmit={catchPokemon}
            className="w-full flex justify-center">
              <input
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                placeholder="Give a name"
                className="appearance-none bg-transparent border border-2 border-purple-500 text-gray-700 mr-3 py-2 px-2 rounded leading-tight focus:outline-none"/>
              <button type="submit" className="flex-shrink-0 bg-purple-400 border-purple-400 text-sm border-4 text-white text-semibold px-1 rounded hover:bg-purple-600 transition duration-500 hover:border-purple-600">
                CATCH!
              </button>
            </form>
          </div>

          <div className="text-xl">
          Your Number is : <span className="font-bold">{num}</span>
          </div>
          <div className="text-xl">
          {msg}
          </div>
        </div>

      </div>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default PokemonDex
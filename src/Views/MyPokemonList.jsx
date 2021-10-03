import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageCard from '../Components/ImageCard'
import Loader from '../Components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MyPokemonList(){
  const {REACT_APP_API_HOST} = process.env
  let url = `${REACT_APP_API_HOST}/my-pokemon-list`
  const [pokemonList, setPokemonList] = useState({
    loading: false,
    data: null,
    error: false
  })
  
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setPokemonList({
      loading: true,
      data: null,
      error: false
    })

    getData(url)
  }, [url])

  async function getData(url) {
    await axios.get(url)
      .then(response => {
        setPokemonList({
          loading: false,
          data: response.data,
          error: false
        })
      })
      .catch(() => {
        setPokemonList({
          loading: false,
          data: null,
          error: true
        })
      })
  }

  async function renamePokemon(id) {
    const payload = JSON.stringify({ id: id})
    await axios.patch(`${process.env.REACT_APP_API_HOST}/rename`, payload, {
      "headers":{
        "content-type":"application/json",
      }
    })
    .then(response => { console.log(response) })
    .catch(e => console.log(e))

    getData(url)
  }

  async function releasePokemon(id) {
    const payload = JSON.stringify({ id: id})
    console.log(payload)
    await axios.delete(`${process.env.REACT_APP_API_HOST}/release/${id}`, {
      "headers":{
        "content-type":"application/json",
      }
    })
    .then(response => { setMsg(response.data.message) })
    .catch(e => console.log(e))
    
    getData(url)
  }

  let content = null

  if (pokemonList.loading) {
    content = <Loader></Loader>
  }

  if (pokemonList.error) {
    content = <p>
      There was an error, please refresh or try again later.
    </p>
  }

  if (pokemonList.data) {
    content =
      <div className="text-center">
        <span className="text-2xl font-bold text-purple-500">
          My Pokémon List
        </span>
        <div className="text-bold text-xl text-yellow-300">{msg}</div>
        <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-10 m-4">
          {pokemonList.data.data.map((datum, index) => (
            <div className="text-center">
              <ImageCard
                key={datum.name}
                image={datum.image}
                id={datum.id}
                name={datum.name} />
                  <FontAwesomeIcon
                    onClick={() => renamePokemon(datum.id)}
                    icon={faPencilAlt}
                    className="mx-2 cursor-pointer"
                  />
                  <FontAwesomeIcon
                    onClick={() => releasePokemon(datum.id)}
                    icon={faTrashAlt}
                    className="mx-2 cursor-pointer"
                  />
            </div>
          ))}
        </div>
      </div>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default MyPokemonList
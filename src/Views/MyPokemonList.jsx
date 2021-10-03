import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageCard from '../Components/ImageCard'
import Loader from '../Components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MyPokemonList(){
  const {REACT_APP_API_HOST} = process.env
  const url = `${REACT_APP_API_HOST}/my-pokemon-list`
  const [pokemonList, setPokemonList] = useState({
    loading: false,
    data: null,
    error: false
  })
  const [pokemonData, setPokemonData] = useState({
    loading: false,
    data: null,
    error: false
  })

  let content = null

  useEffect(() => {
    setPokemonList({
      loading: true,
      data: null,
      error: false
    })

    axios.get(url)
      .then(response => {
        setPokemonList({
          loading: false,
          data: response.data,
          error: false
        })

        let urls = []
        if (response.data) {
          response.data.data.map((datum) => urls.push(datum.url))
          setPokemonData({
            loading: true,
            data: null,
            error: false
          })

          axios
            .all(urls.map(map => axios.get(map)))
            .then(
              axios.spread((...responses) => {
                return Promise.allSettled(responses.map(test => test))
                  .then(results => {
                    setPokemonData({
                      loading: false,
                      data: results,
                      error: false
                    })
                  })
                  .catch((error) => console.log(error))
              })
            )
            .catch(() => {
              setPokemonData({
                loading: false,
                data: null,
                error: true
              })
            })
        }
      })
      .catch(() => {
        setPokemonList({
          loading: false,
          data: null,
          error: true
        })
      })
  }, [url])

  if (pokemonList.loading || pokemonData.loading) {
    content = <Loader></Loader>
  }

  if (pokemonList.error || pokemonData.error) {
    content = <p>
      There was an error, please refresh or try again later.
    </p>
  }

  if (pokemonData.data) {
    for(let i = 0; i < pokemonList.data.data.length; i++){
      pokemonData.data[i].value.data.name = pokemonList.data.data[i].name
    }

    content =
      <div className="text-center">
        <span className="text-2xl font-bold text-purple-500">
          My Pokémon List
        </span>
        <div className="grid lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-3 gap-10 m-4">
          {pokemonData.data.map(datum => (
            <div className="text-center">
              <ImageCard
                key={datum.value.data.name}
                image={datum.value.data.sprites.front_default}
                id={datum.value.data.id}
                name={datum.value.data.name} />
              {/* Button Inside Here */}
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="mx-2"
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="mx-2"
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
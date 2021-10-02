import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import Loader from '../Components/Loader'
import ImageCard from '../Components/ImageCard'
import SearchList from '../Components/SearchList'

function Home() {
  let query = new URLSearchParams(useLocation().search)
  let limit = query.get("limit")
  let offset = query.get("offset")

  let urlList = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=0`
  if (limit && offset) { urlList = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}` }
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
    axios.get(urlList)
      .then(response => {
        setPokemonList({
          loading: false,
          data: response.data,
          error: false
        })
        let urls = []
        if (response.data) {
          response.data.results.map((datum) => urls.push(datum.url))
          setPokemonData({
            loading: true,
            data: null,
            error: false
          })

          axios
            .all(urls.map(map => axios.get(map)))
            .then(
              axios.spread((...responses) => {
                // console.log(responses)
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
  }, [urlList])

  if (pokemonList.loading || pokemonData.loading) {
    content = <Loader></Loader>
  }

  if (pokemonList.error || pokemonData.error) {
    content = <p>
      There was an error, please refresh or try again later.
    </p>
  }

  if (pokemonData.data) {
    content =
      <div>
        <SearchList />
        <div className="grid lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-3 gap-10 m-4">
          {pokemonData.data.map(datum => (
            <ImageCard
              key={datum.value.data.name}
              image={datum.value.data.sprites.front_default}
              id={datum.value.data.id}
              name={datum.value.data.name} />
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

export default Home
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Components/Loader'

function Home() {
  const urlList = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
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
        if (pokemonList.data) {
          pokemonList.data.results.map((datum) => urls.push(datum.url))
          setPokemonData({
            loading: true,
            data: null,
            error: false
          })

          axios
            .all(urls.map(map => axios.get(map)))
            .then(
              axios.spread((...responses) => {
                console.log(responses)
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

  if (pokemonData.data) {
    console.log(pokemonData.data[1].value.data.name)
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default Home
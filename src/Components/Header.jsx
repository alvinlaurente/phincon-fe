import React, { useState } from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

function Header() {
  const [search, setSearch] = useState('')

  return (
    <nav className="mx-4 border-b-2 p-3 flex items-center text-yellow-400">
      <Link
        to="/"
        className="font-bold text-2xl uppercase text-yellow-400 ml-2">
        Pokémon Dex
      </Link>

      <div className="mr-10 max-w-sm rounded overflow-hidden mx-auto">
        <form className="w-full max-w-sm flex">
          <input
            onChange={e => setSearch(e.target.value.toLowerCase())}
            className="appearance-none bg-transparent border-2 border-yellow-400 w-150 font-semibold text-gray-500 mr-3 py-1 px-1 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="Search by id or name" />
          <Link to={`/pokemon/${search}`}>
            <button className="flex-shrink-0 bg-yellow-400 border-yellow-400 text-sm border-4 text-white py-1 px-2 rounded hover:bg-yellow-500 transition duration-500 hover:border-yellow-500" type="submit">
              Search
            </button>
          </Link>
        </form>
      </div>

      <Navigation />
    </nav>
  )
}

export default Header
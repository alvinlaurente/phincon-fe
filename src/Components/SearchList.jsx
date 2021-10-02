import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchList() {
  const [textLimit, setTextLimit] = useState('')
  const [textOffset, setTextOffset] = useState('')

  return (
    <div className="max-w-sm rounded overflow-hidden mx-auto text-center">
      <span className="text-2xl font-bold text-purple-500">
        Pokémon List
      </span>
      <form className="w-full max-w-sm">
        <div class="flex items-center border-purple-500">
          <input
            onChange={e => setTextOffset(e.target.value - 1)}
            className="appearance-none bg-transparent border border-2 border-purple-500 w-full text-gray-700 mr-3 py-1 px-2 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="Start from" />
          <input
            onChange={e => setTextLimit(e.target.value - textOffset)}
            className="appearance-none bg-transparent border border-2 border-purple-500 w-full text-gray-700 mr-3 py-1 px-2 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="End at" />
          <Link to={`/list?limit=${textLimit}&offset=${textOffset}`}>
            <button className="flex-shrink-0 bg-purple-400 border-purple-400 text-sm border-4 text-white text-semibold py-1 px-2 rounded hover:bg-purple-600 transition duration-500 hover:border-purple-600" type="submit">
              LIST
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SearchList

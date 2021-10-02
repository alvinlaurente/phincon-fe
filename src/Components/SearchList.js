import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchList() {
  const [textLimit, setTextLimit] = useState('')
  const [textOffset, setTextOffset] = useState('')

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form className="w-full max-w-sm">
        <div class="flex items-center border-b border-b-2 border-purple-500 py-2">
          <input
            onChange={e => setTextOffset(e.target.value - 1)}
            className="appearance-none bg-transparent border border-1 border-purple-500 w-full text-gray-700 mr-3 py-1 px-2 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="Start from" />
          <input
            onChange={e => setTextLimit(e.target.value - textOffset)}
            className="appearance-none bg-transparent border border-1 border-purple-500 w-full text-gray-700 mr-3 py-1 px-2 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="End at" />
          <Link to={`/list?limit=${textLimit}&offset=${textOffset}`}>
            <button className="flex-shrink-0 bg-purple-500 border-purple-500 text-sm border-4 text-white py-1 px-2 rounded hover:bg-purple-700 transition duration-500 hover:border-purple-700" type="submit">
              LIST
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SearchList

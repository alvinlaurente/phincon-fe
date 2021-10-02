import React from 'react'
import { Link } from 'react-router-dom'

function ImageCard(props) {
  return (
    <Link to={`/pokemon/${props.id}`}>
      <div className="max-w-sm bg-gray-100 rounded overflow-hidden shadow-lg text-center">
        <img
          src={props.image}
          alt={props.name}
          className="w-full"
        />
        <div className="border-t-2 border-purple-300">
          <div class="font-bold text-purple-400 text-sm uppercase">
            <span>#{props.id}</span> {props.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ImageCard

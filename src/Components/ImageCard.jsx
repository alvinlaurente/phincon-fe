import React from 'react'
import { Link } from 'react-router-dom'

function ImageCard(props) {
  return (
    <Link to={`/pokemon/${props.id}`}>
      <div className="group max-w-sm bg-gray-100 rounded overflow-hidden shadow-lg text-center hover:bg-yellow-400 transform transition duration-500 hover:scale-125">
        <img
          src={props.image}
          alt={props.name}
          className="w-full"
        />
        <div className="border-t-2 border-purple-300 group-hover:border-yellow-400">
          <div className="font-bold text-purple-400 text-sm uppercase group-hover:text-yellow-400">
            <span>#{props.id}</span> {props.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ImageCard

import React from 'react'
import { Link } from 'react-router-dom'

function NavigationMenu(props) {
  return (
    <div>
      <span className="font-bold text-2xl uppercase text-yellow-400 py-3">Pokémon Dex</span>
      <ul>
        <li>
          <Link
            to="/"
            className="text-yellow-300 py-3 border-t border-b block"
            onClick={props.closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/pokemon/1"
            className="text-yellow-300 py-3 border-b block"
            onClick={props.closeMenu}
          >
            Pokémon
          </Link>
        </li>
        <li>
          <Link
            to="/my-pokemon-list"
            className="text-yellow-300 py-3 border-b block"
            onClick={props.closeMenu}
          >
            My Pokemon List
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationMenu
import React from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border-b p-3 flex justify-between items-centeryarn add @fortawesome/fontawesome-svg-core text-yellow-400">
      <Link
        to="/"
        className="font-bold text-2xl uppercase text-yellow-400">
      Pokémon Dex
      </Link>
      
      <Navigation />
    </header>
  )
}

export default Header
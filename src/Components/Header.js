import React from 'react'
import Navigation from './Navigation'

function Header() {
  return (
    <header className="border-b p-3 flex justify-between items-centeryarn add @fortawesome/fontawesome-svg-core">
      <span className="font-bold">
      Pokémon Dex
      </span>
      
      <Navigation />
    </header>
  )
}

export default Header
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NavigationMenu from './NavigationMenu'

function Navigation() {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <nav>
      {
        !showMenu && <span className="fixed z-50 top-4 left-4 text-xl cursor-pointer">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setShowMenu(!showMenu)}
          />
        </span>
      }
      {
        showMenu && <div
          className="fixed bg-white top-0 left-0 w-1/5 h-full z-50 p-4 shadow flex gap-2"
        >
          <span className="text-xl cursor-pointer">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setShowMenu(!showMenu)}
            />
          </span>
          <NavigationMenu
            closeMenu={() => setShowMenu(false)}
          />
        </div>
      }
    </nav>
  )
}

export default Navigation
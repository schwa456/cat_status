import React from 'react';
import CatSelector from '../CatSelector';
import AppIcon from '../AppIcon'

const Header = ({ onMenuClick }) => {
  return (
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <span className="text-lg font-bold">logo</span>
        </div>

        {/* Center Section: Cat Selector (Placeholder)*/}
        <CatSelector />

        {/* Right Section: Menu Icon */}
        <div className="flex items-center">
          <button onClick={onMenuClick} className="p-2 focus:outline-none">
            <AppIcon name="Menu" size={24} />
          </button>
        </div>

      </header>

  )
}

export default Header
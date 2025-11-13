import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import {useCats} from "../../../contexts/CatContext";

const CatSelector = () => {
  const { cats, selectedCat, selectCat } = useCats();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCatSelect = (cat) => {
    selectCat(cat)
    setIsOpen(false);
  };

  const currentCat = selectedCat || cats?.[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
          <Image
            src={currentCat?.photo}
            alt={currentCat?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-foreground">{currentCat?.name}</h3>
          <p className="text-sm text-muted-foreground">{currentCat?.breed} • {currentCat?.age}</p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="p-2">
            {cats?.map((cat) => (
              <button
                key={cat?.id}
                onClick={() => handleCatSelect(cat)}
                className={`w-full flex items-center space-x-4 p-3 rounded-lg text-left transition-colors duration-200 ${
                  currentCat?.id === cat?.id
                    ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                  <Image
                    src={cat?.photo}
                    alt={cat?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{cat?.name}</p>
                  <p className="text-sm text-muted-foreground">{cat?.breed} • {cat?.age}</p>
                </div>
                {currentCat?.id === cat?.id && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-2">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-muted transition-colors duration-200">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Add New Cat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatSelector;
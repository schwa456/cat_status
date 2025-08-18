import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SettingsSearch = ({ onSearchResults, allSettings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery?.trim() === '') {
      setSearchResults([]);
      onSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = searchSettings(searchQuery);
      setSearchResults(results);
      onSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allSettings, onSearchResults]);

  const searchSettings = (query) => {
    const lowercaseQuery = query?.toLowerCase();
    const results = [];

    allSettings?.forEach((section) => {
      // Search in section title and description
      if (section?.title?.toLowerCase()?.includes(lowercaseQuery) ||
          section?.description?.toLowerCase()?.includes(lowercaseQuery)) {
        results?.push({
          type: 'section',
          section: section?.key,
          title: section?.title,
          description: section?.description,
          match: 'Section'
        });
      }

      // Search in section content/settings
      if (section?.searchableContent) {
        section?.searchableContent?.forEach((content) => {
          if (content?.toLowerCase()?.includes(lowercaseQuery)) {
            results?.push({
              type: 'setting',
              section: section?.key,
              title: section?.title,
              description: `Found in ${section?.title}`,
              match: content,
              settingType: 'content'
            });
          }
        });
      }
    });

    return results;
  };

  const handleResultClick = (result) => {
    // Scroll to the relevant section
    const element = document.getElementById(`settings-${result?.section}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Highlight the section briefly
      element?.classList?.add('animate-border-pulse');
      setTimeout(() => {
        element?.classList?.remove('animate-border-pulse');
      }, 1000);
    }
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search settings..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e?.target?.value)}
        className="mb-4"
      />
      {/* Search Results Dropdown */}
      {(searchQuery?.trim() !== '' && (searchResults?.length > 0 || !isSearching)) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Found {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''}
              </div>
              {searchResults?.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-muted transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={result?.type === 'section' ? 'Folder' : 'Search'} 
                      size={16} 
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {result?.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result?.description}
                    </p>
                    {result?.match && result?.match !== result?.title && (
                      <p className="text-xs text-primary truncate">
                        Match: "{result?.match}"
                      </p>
                    )}
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No settings found</p>
              <p className="text-xs text-muted-foreground">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsSearch;
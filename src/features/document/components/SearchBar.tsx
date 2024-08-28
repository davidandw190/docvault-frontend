import React from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
    <div className="col-lg-6 mb-2">
        <div className="selection-widget">
            <input
                type="search"
                onChange={e => onSearch(e.target.value)}
                className="form-control"
                id="email"
                placeholder="Search documents"
                required
            />
        </div>
    </div>
);

export default SearchBar;

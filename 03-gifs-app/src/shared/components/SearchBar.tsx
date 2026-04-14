import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
    placeholder: string;
    onQuery: (query: string) => void;
}

export const SearchBar = ({ onQuery, placeholder = "Buscar" }: Props) => {

    const [query, setQuery] = useState("");

    useEffect(() => {
        
        const timeout = setTimeout(() => {
            onQuery(query);
        }, 700);        

        return () => {
            clearTimeout(timeout);
        }

    }, [query, onQuery]);

    const handleSearch = () => {
        onQuery(query);
        setQuery("");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== 'Enter') {
            return;
        }

        handleSearch();

    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );

};

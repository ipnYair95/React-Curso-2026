import { GifsList } from "./gifs/components/GifsList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const { gifs, reverseTerms, handleSearch, handleTermClick } = useGifs();

    return (
        <>

            {/* header */}
            <CustomHeader title="Buscador de gifs" description="Encuentra los mejores gifs" />

            {/* search */}
            <SearchBar placeholder="Buscar lo que quieras" onQuery={handleSearch} />

            {/* Búsquedas previas */}
            <PreviousSearches searches={reverseTerms} onLabelClick={handleTermClick} />

            {/* Gifs */}
            <GifsList gifs={gifs} />

        </>
    )
}

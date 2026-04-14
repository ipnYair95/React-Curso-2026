interface Props {
    searches: string[];
    onLabelClick: (label: string) => void
}

export const PreviousSearches = ({ searches = [], onLabelClick }: Props) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas previas</h2>

            <ul className="previous-searches-list">
                {
                    searches.map((search) => (
                        <li key={search} onClick={() => onLabelClick(search)}>{search}</li>
                    ))
                }
            </ul>
        </div>
    )
}

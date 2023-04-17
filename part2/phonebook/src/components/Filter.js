const Filter = ({search, handleSearchChange}) => {
    return (
        <p>
            Search: <input value={search} onChange={handleSearchChange}></input>
        </p>
    )
}

export default Filter
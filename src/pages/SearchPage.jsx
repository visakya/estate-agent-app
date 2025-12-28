import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";

export default function SearchPage(){
    const properties = data.properties;

    const postcodeOptions = Array.from(
        new Set(
            properties
            .map((p) => p.location.match(/[A-Z]{1,2}\d{1,2}/))
            .filter(Boolean)
            .map((m) => m[0])
        )
    );

    return(
        <div style={{padding: 16}}>
            <h1>Estate Agent App</h1>

            <SearchForm postcodeOptions={postcodeOptions} />
            
            <p>Properties loaded: {properties.length}</p>

            <ul>
                {properties.map((p) => (
                    <li key={p.id}>
                        {p.type} - £{p.price} - {p.bedrooms} beds
                    </li>
                ))} 
            </ul>
            
        </div>
    );
}
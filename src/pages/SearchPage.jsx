import data from "../data/properties.json";

export default function SearchPage(){
    const properties = data.properties;

    return(
        <div style={{padding: 16}}>
            <h1>Estate Agent App</h1>
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
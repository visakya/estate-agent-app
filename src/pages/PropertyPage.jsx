import {Link, useParams} from "react-router-dom";
import data from "../data/properties.json";

export default function PropertyPage(){
    const {id} = useParams();
    const property = data.properties.find((p) => String(p.id) === String(id));

    if(!property){
        return(
            <div style = {{padding: 16}}>
                <h2>Property not found.</h2>
                <Link to="/">Back to search</Link>
            </div>
        );
    }

    return (
        < div style = {{padding: 16}}>
            <Link to="/"> Back to search</Link>

            <h1 style = {{marginTop: 12}}>
                {property.type} - £{property.price.toLocaleString()}
            </h1>

            <p>
                <strong>Bedrooms: </strong> {property.bedrooms}
            </p>

            <p>
                <strong>Locations: </strong> {property.location}
            </p>

            <p>
                <strong>Date added: </strong> {property.dateAdded}
            </p>

            <h3>Description</h3>
            <p>{property.description}</p>
        </div>
    )
}
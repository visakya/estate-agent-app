import "./PropertyCard.css";
import {Link} from "react-router-dom";

export default function PropertyCard({ property }) {
    const postcodeAreaMatch = property.location?.match(/[A-Z]{1,2}\d{1,2}/);
    const postcodeArea = postcodeAreaMatch ? postcodeAreaMatch[0] : "";

    const base = import.meta.env.BASE_URL;

    const picturePath = property.picture.replace(/^\//, "");

    const pictureSrc = `${base}${picturePath}`;

    return (
            <div className="property-card">
                <Link to ={`/property/${property.id}`} className="property-card-link">
                    <img className="property-thumb" src={pictureSrc} alt={`${property.type} thumbnail`} loading="lazy" />           
                    <h3>
                        {property.type} —{" "}
                        <span className="price">
                        £{property.price.toLocaleString()}
                        </span>
                    </h3>
                </Link>

                <p className="meta">
                    <strong>Bedrooms:</strong> {property.bedrooms} ·{" "}
                    <strong>Postcode:</strong> {postcodeArea || "N/A"}
                </p>

                <p className="meta">
                    <strong>Location:</strong> {property.location}
                </p>

                <p className="meta">
                    <strong>Date added:</strong> {property.dateAdded}
                </p>

                <p>{property.description}</p>

                <Link to={`/property/${property.id}`} className="details-link">
                    View details 
                </Link>
            </div>

        );
}
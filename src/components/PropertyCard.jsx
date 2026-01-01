import "./PropertyCard.css";
import {Link} from "react-router-dom";

export default function PropertyCard({ property }) {
  const postcodeAreaMatch = property.location?.match(/[A-Z]{1,2}\d{1,2}/);
  const postcodeArea = postcodeAreaMatch ? postcodeAreaMatch[0] : "";

  return (
    <Link to ={`/property/${property.id}`} className="property-card-link">
        <div className="property-card">
            <img className="property-thumb" src={property.picture} alt={`${property.type} thumbnail`} loading="lazy" />            <h3>
                {property.type} —{" "}
                <span className="price">
                £{property.price.toLocaleString()}
                </span>
            </h3>

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
        </div>
    </Link>
  );
}
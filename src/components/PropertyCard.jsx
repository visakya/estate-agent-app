import "./PropertyCard.css";
import {Link} from "react-router-dom";

export default function PropertyCard({ property, onAddFavourite, isFavourite }) {
    const postcodeAreaMatch = property.location?.match(/[A-Z]{1,2}\d{1,2}/);
    const postcodeArea = postcodeAreaMatch ? postcodeAreaMatch[0] : "";

    const base = import.meta.env.BASE_URL;

    const picturePath = property.picture.replace(/^\//, "");

    const pictureSrc = `${base}${picturePath}`;

    return (
            <div className="property-card" draggable onDragStart={(e) => {e.dataTransfer.setData("propertyId", String(property.id));}}>
                <Link to ={`/property/${property.id}`} className="property-card-link" draggable={false}>
                    <img className="property-thumb" src={pictureSrc} alt={`${property.type} thumbnail`} loading="lazy" />           
                    <h3>
                        {property.type} —{" "}
                        <span className="price">
                        £{property.price.toLocaleString()}
                        </span>
                    </h3>
                </Link>

                <button type="button" className="fav-btn" disabled={isFavourite} onClick = {(e) => {e.preventDefault(); e.stopPropagation(); onAddFavourite(property);}}>
                    {isFavourite ? "\u2764\uFE0F Favourite": "\u2661 Favourite" }
                </button>

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
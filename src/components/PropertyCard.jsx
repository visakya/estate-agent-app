import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  const postcodeAreaMatch = property.location?.match(/[A-Z]{1,2}\d{1,2}/);
  const postcodeArea = postcodeAreaMatch ? postcodeAreaMatch[0] : "";

  return (
    <div className="property-card">
      <h3>
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
  );
}
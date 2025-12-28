export default function BedroomRange({
  minBedrooms,
  maxBedrooms,
  onMinBedroomsChange,
  onMaxBedroomsChange,
}) {
  const inputStyle = {
    display: "inline-block",
    visibility: "visible",
    opacity: 1,
    width: "120px",
    height: "36px",
    padding: "6px 10px",
    border: "1px solid #999",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#000",
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 400, marginBottom: 8, color: "white" }}>
        Bedrooms:
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label>Min:</label>
        <input
          type="number"
          min="0"
          max="10"
          placeholder="Min"
          style={inputStyle}
          value={minBedrooms ?? ""}
          onChange={(e) =>
            onMinBedroomsChange(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
        />

        <label>Max:</label>
        <input
          type="number"
          min="0"
          max="10"
          placeholder="Max"
          style={inputStyle}
          value={maxBedrooms ?? ""}
          onChange={(e) =>
            onMaxBedroomsChange(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
        />
      </div>

    
    </div>
  );
}

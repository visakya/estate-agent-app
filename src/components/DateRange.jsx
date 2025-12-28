function toDateInputValue(date) {
  // Convert Date -> "YYYY-MM-DD" for <input type="date">
  return date instanceof Date ? date.toISOString().slice(0, 10) : "";
}

export default function DateRange({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) {
  const inputStyle = {
    display: "inline-block",
    visibility: "visible",
    opacity: 1,
    width: "160px",
    height: "36px",
    padding: "6px 10px",
    border: "1px solid #999",
    borderRadius: "6px",
    fontSize: "14px",
    
    color: "gray",
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 400, marginBottom: 8, color: "white" }}>
        Date added: 
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label>From:</label>
        <input
          type="date"
          style={inputStyle}
          value={toDateInputValue(dateFrom)}
          onChange={(e) =>
            onDateFromChange(e.target.value ? new Date(e.target.value) : null)
          }
        />

        <label>To:</label>
        <input
          type="date"
          style={inputStyle}
          value={toDateInputValue(dateTo)}
          onChange={(e) =>
            onDateToChange(e.target.value ? new Date(e.target.value) : null)
          }
        />
      </div>

    </div>
  );
}

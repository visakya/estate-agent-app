import { useState } from "react";

export default function SearchForm() {
  const [criteria, setCriteria] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateAdded: "",
    postcode: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <form style={{ marginBottom: 20 }}>
      <h2>Search Properties</h2>

      <label>
        Property type:
        <select name="type" value={criteria.type} onChange={handleChange}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      <br /><br />

      <label>
        Min price:
        <input
          type="number"
          name="minPrice"
          value={criteria.minPrice}
          onChange={handleChange}
        />
      </label>

      <label>
        Max price:
        <input
          type="number"
          name="maxPrice"
          value={criteria.maxPrice}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <label>
        Min bedrooms:
        <input
          type="number"
          name="minBedrooms"
          value={criteria.minBedrooms}
          onChange={handleChange}
        />
      </label>

      <label>
        Max bedrooms:
        <input
          type="number"
          name="maxBedrooms"
          value={criteria.maxBedrooms}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <label>
        Added after:
        <input
          type="date"
          name="dateAdded"
          value={criteria.dateAdded}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <label>
        Postcode area:
        <input
          type="text"
          name="postcode"
          value={criteria.postcode}
          onChange={handleChange}
          placeholder="e.g. BR5"
        />
      </label>
    </form>
  );
}

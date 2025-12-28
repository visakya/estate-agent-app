import { useState } from "react";
import {
  DropdownList,
  NumberPicker,
  Combobox
} from "react-widgets";
import BedroomRange from "./BedroomRange";
import DateRange from "./DateRange";

export default function SearchForm({postcodeOptions}) {
  const [criteria, setCriteria] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: null,
    dateTo: null,
    postcode: ""
  });

  return (
    <form style={{ marginBottom: 24 }}
      
    >
      <h2>Properties</h2>

      {/*Property type widget*/}
      <label>Property type:</label>
      <DropdownList
        data = {["Any","House","Flat"]}
        value = {criteria.type}
        onChange = {(value) =>
          setCriteria((prev) => ({
            ...prev,
            type: value === "Any" ? null: value
          }))

        }
      />

      <br /><br />

      {/*Price widgets*/}
      <label>Minimum price:</label>
      <NumberPicker
        min = {0}
        step = {5000}
        value = {criteria.minPrice}
        onChange = {(value) => 
          setCriteria((prev) => ({ ...prev, minPrice: value}))
        }
      />

      <br /><br />

      <label>Maximum price:</label>
      <NumberPicker
        min = {0}
        step = {5000}
        value = {criteria.maxPrice}
        onChange = {(value) =>
          setCriteria((prev) => ({ ...prev, maxPrice: value}))
        }
      />

      <br /><br />

      {/*Bedrooms widgets*/}
      <BedroomRange
        minBedrooms={criteria.minBedrooms}
        maxBedrooms={criteria.maxBedrooms}
        onMinBedroomsChange={(value) =>
          setCriteria((prev) => ({ ...prev, minBedrooms: value }))
        }
        onMaxBedroomsChange={(value) =>
          setCriteria((prev) => ({ ...prev, maxBedrooms: value }))
        }
      />

      <br /><br />

      {/*Date widgets*/}
      <DateRange
        dateFrom={criteria.dateFrom}
        dateTo={criteria.dateTo}
        onDateFromChange={(value) =>
          setCriteria((prev) => ({ ...prev, dateFrom: value }))
        }
        onDateToChange={(value) =>
          setCriteria((prev) => ({ ...prev, dateTo: value }))
        }
      />


      <br /><br />

      {/*Postcode widgets*/}
      <label>Postcode area:</label>
      <Combobox
        data = {postcodeOptions}
        value = {criteria.postcode}
        onChange={(value) =>
          setCriteria((prev) => ({ ...prev, postcode: value}))
        }
        placeholder="e.g. BR5"
      />
      
    </form>
  );
}

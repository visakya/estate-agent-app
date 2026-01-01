
import {
  DropdownList,
  NumberPicker,
  Combobox
} from "react-widgets";
import BedroomRange from "./BedroomRange";
import DateRange from "./DateRange";

export default function SearchForm({postcodeOptions,criteria,setCriteria,onClearFilters}) {
 
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Properties</h2>

      {/*Property type widget*/}
      <div>
        <label className="form-label">Property type:</label>
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
      </div>
      <br /><br />

      {/*Price widgets*/}
      <div>
        <label className="form-label">Price range</label>
        <div style={{display: "flex", gap:12}}>
          <NumberPicker
            min = {0}
            step = {5000}
            placeholder="Min price"
            value = {criteria.minPrice}
            onChange = {(value) => 
              setCriteria((prev) => ({ ...prev, minPrice: value}))
            }
          />

          <br /><br />

          
          <NumberPicker
            min = {0}
            step = {5000}
            placeholder="Max price"
            value = {criteria.maxPrice}
            onChange = {(value) =>
              setCriteria((prev) => ({ ...prev, maxPrice: value}))
            }
          />
        </div>
      </div>
      <br /><br />

      {/*Bedrooms widgets*/}
      <div className="form-group">
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
      </div>  

      <br /><br />

      {/*Date widgets*/}
      <div className="form-group">
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
      </div>

      <br /><br />

      {/*Postcode widgets*/}
      <div className="form-group">
        <label className="form-label">Postcode area:</label>
        <Combobox
          data = {postcodeOptions}
          value = {criteria.postcode}
          onChange={(value) =>
            setCriteria((prev) => ({ ...prev, postcode: value}))
          }
          placeholder="e.g. BR5"
        />
      </div>

      <div className="form-group" style={{textAlign:"center"}}>
        <button type="button" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
      
    </form>
  );
}

import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import {useMemo, useState} from "react";
import PropertyCard from "../components/PropertyCard";
import {DropdownList} from "react-widgets";

function getPostcodeArea(location){
    const match = location?.match(/[A-Z]{1,2}\d{1,2}/);
    return match ? match[0] : "";
}

function toDate(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

export default function SearchPage(){
    const properties = data.properties;

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

    const [sortBy, setSortBy] = useState("None");
    function clearFilters() {
        setCriteria({
            type: null,
            minPrice: null,
            maxPrice: null,
            minBedrooms: null,
            maxBedrooms: null,
            dateFrom: null,
            dateTo: null,
            postcode: "",
        });
        setSortBy("None");
    }

    const postcodeOptions = Array.from(
        new Set(
            properties
            .map((p) => getPostcodeArea(p.location))
            .filter(Boolean)
        )
    );

    const filteredProperties = useMemo(() => {
        return properties.filter((p) => {

            //property type
            if(criteria.type && p.type !== criteria.type) return false;

            //price
            if(criteria.minPrice != null && p.price < criteria.minPrice) return false;
            if(criteria.maxPrice != null && p.price > criteria.maxPrice) return false;

            //bedrooms
            if(criteria.minBedrooms != null && p.bedrooms < criteria.minBedrooms) return false;
            if(criteria.maxBedrooms != null && p.bedrooms > criteria.maxBedrooms) return false;

            //date added
            const propDate = toDate(p.dateAdded);
            if(criteria.dateFrom && propDate && propDate < criteria.dateFrom) return false;
            if(criteria.dateTo && propDate && propDate > criteria.dateTo) return false;

            //postcode
            const area = getPostcodeArea(p.location);
            if(criteria.postcode && area !== criteria.postcode) return false;

            return true;
        });

        },[properties, criteria]
    );

    const sortedProperties = useMemo(() => {
        const array1 = [...filteredProperties];

        array1.sort((a,b) => {
            if(sortBy === "Price: Low to High") return a.price - b.price;
            if(sortBy === "Price: High to Low") return b.price - a.price;

            if(sortBy === "Date: Newest first"){
                const da = toDate(a.dateAdded)?.getTime() ?? 0;
                const db = toDate(b.dateAdded)?.getTime() ?? 0;
                return db - da;
            }

            if(sortBy === "Date: Oldest first"){
                const da = toDate(a.dateAdded)?.getTime() ?? 0;
                const db = toDate(b.dateAdded)?.getTime() ?? 0;
                return da - db;
            }
            return 0;
        });

        return array1;
        },[filteredProperties, sortBy]
    );
    return(
        <div style={{padding: 16}}>
            <h1>Estate Agent App</h1>
            <div style={{display:"flex", justifyContent: "center"}}>
                <SearchForm 
                    postcodeOptions={postcodeOptions}
                    criteria={criteria}
                    setCriteria={setCriteria} 
                    onClearFilters={clearFilters}
                />
            </div>

            <div className="form-group" style={{ maxWidth: 700, margin: "0 auto 16px auto" }}>
                <label className="form-label">Sort by</label>
                <DropdownList
                    data={[
                    "None",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Date: Newest first",
                    "Date: Oldest first",
                    ]}
                    value={sortBy}
                    onChange={(value) => setSortBy(value)}
                />
            </div>

            <p>Showing {sortedProperties.length} of {properties.length} properties </p>
            {sortedProperties.length === 0 ? (
                <p>No properties match your search criteria.</p>
                ) : (
                <div className="results-grid">
                    {sortedProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                    ))}
                </div>
                )
            }
            
        </div>
    );
}
import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import {useMemo, useState} from "react";
import PropertyCard from "../components/PropertyCard";

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

    return(
        <div style={{padding: 16}}>
            <h1>Estate Agent App</h1>
            <div style={{display:"flex", justifyContent: "center"}}>
                <SearchForm 
                    postcodeOptions={postcodeOptions}
                    criteria={criteria}
                    setCriteria={setCriteria} 
                />
            </div>
            <p>Showing {filteredProperties.length} of {properties.length} properties </p>
            {filteredProperties.length === 0 ? (
                <p>No properties match your search criteria.</p>
                ) : (
                <div className="results-grid">
                    {filteredProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                    ))}
                </div>
                )
            }
            
        </div>
    );
}
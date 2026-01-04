import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import {useMemo, useState, useEffect} from "react";
import PropertyCard from "../components/PropertyCard";
import {DropdownList} from "react-widgets";
import {Link} from "react-router-dom";
import filterProperties from "../logic/filterProperties";

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

    const [favourites, setFavourites] = useState(() => {
        try{
            const saved = localStorage.getItem("favourites");
            return saved ? JSON.parse(saved) : [];
        } catch{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    },
    [favourites]);

    function addToFavourites(property){
        setFavourites((prev) => {
            if(prev.some((p) => p.id === property.id)) return prev;
            return [...prev, property];
        });
    }

    function removeFavourite(id){
        setFavourites((prev) => prev.filter((p) => p.id !== id));
    }

    function clearFavourites(){
        setFavourites([]);
    }

    const postcodeOptions = Array.from(
        new Set(
            properties
            .map((p) => getPostcodeArea(p.location))
            .filter(Boolean)
        )
    );

    const filteredProperties = useMemo(() => {
        return filterProperties(properties, criteria);
    }, [properties, criteria]);

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
                <label className="form-label" style={{textAlign:"center"}}>Sort by</label>
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

            <h3 className="fav-top">Favourites</h3>

            <div className="favourite-panel" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("propertyId");
                const prop = properties.find((p) => String(p.id) === String(id));
                if(prop) addToFavourites(prop);
            }}>
                {favourites.length === 0 ? (
                <p>Drag a property here to add.</p>
                ):(
                    <ul className="favourite-list">
                        {favourites.map((p) => (
                            <li key={p.id} className="favourite-item" draggable onDragStart={(e) => {e.dataTransfer.setData("favId",p.id);}}>
                                <Link to = {`/property/${p.id}`} className="favourites-link">
                                    <img className="favourite-thumb" src={`${import.meta.env.BASE_URL}${p.picture.replace(/^\//, "")}`} alt={`${p.type} thumbnail`} loading="lazy"/>
                                    <div className="favourite-text">
                                        <div className="favourite-title">{p.type}</div>
                                        <div className="favourite-meta">
                                            £{p.price.toLocaleString()} - {p.bedrooms} beds
                                        </div>
                                    </div>
                                </Link>

                                <button type="button" className="fav-remove" onClick={() => removeFavourite(p.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="fav-drag-out" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {e.preventDefault();

                    const favId = e.dataTransfer.getData("favId");
                    if(favId) removeFavourite(favId);
                    }}>
                        Drag a favourite item here to remove
                </div>

                <div className="favourite-header">
                    {favourites.length > 0 && (
                        <button type="button" className="fav-clear" onClick={clearFavourites}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            <div style={{ marginTop:25}}>
                <p style={{textAlign: "center"}}>Showing {sortedProperties.length} of {properties.length} properties </p>
                {sortedProperties.length === 0 ? (
                    <p>No properties match your search criteria.</p>
                    ) : (
                    <div className="results-grid">
                        {sortedProperties.map((p) => (
                        <PropertyCard key={p.id} property={p} onAddFavourite = {addToFavourites} isFavourite = {favourites.some((f) => f.id === p.id)} />
                        ))}
                    </div>
                    )
                }
            </div>
            
        </div>
    );
}
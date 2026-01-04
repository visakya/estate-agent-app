
export function getPostcodeArea(location){
    const match = location?.match(/[A-Z]{1,2}\d{1,2}/);
    return match ? match[0] : "";
}

export function toDate(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

export default function filterProperties(properties, criteria){

    const dateFrom = criteria.dateFrom ? toDate(criteria.dateFrom) : null;
    const dateTo = criteria.dateTo ? toDate(criteria.dateTo) : null;
    
    return properties.filter((p) => {

        if(criteria.type && p.type !== criteria.type) return false;

        if(criteria.minPrice != null && p.price < criteria.minPrice) return false;
        if(criteria.maxPrice != null && p.price > criteria.maxPrice) return false;

        if(criteria.minBedrooms != null && p.bedrooms < criteria.minBedrooms) return false;
        if(criteria.maxBedrooms != null && p.bedrooms > criteria.maxBedrooms) return false;

        const propDate = toDate(p.dateAdded);

        if(criteria.dateFrom && propDate && propDate < criteria.dateFrom) return false;
        if(criteria.dateTo && propDate && propDate > criteria.dateTo) return false;

        const area = getPostcodeArea(p.location);

        if(criteria.postcode && area !== criteria.postcode) return false;

        return true;
    })
}


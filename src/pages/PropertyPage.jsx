import {Link, useParams} from "react-router-dom";
import data from "../data/properties.json";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "./PropertyPage.css";
import { useEffect,useState,useRef } from "react";

export default function PropertyPage(){
    const {id} = useParams();
    const property = data.properties.find((p) => String(p.id) === String(id));

    if(!property){
        return(
            <div style = {{padding: 16}}>
                <h2>Property not found.</h2>
                <Link to="/">Back to search</Link>
            </div>
        );
    }

    const base = import.meta.env.BASE_URL;

    const gallery = property.images && property.images.length > 0 ? property.images.map((p) => `${base}${p.replace(/^\//, "")}`) : [];

    const [selectedImage, setSelectedImage] = useState(gallery[0] || "");

    const [viewerOpen, setViewerOpen] = useState(false);

    const thumbRefs = useRef([]);

    function openViewer(img) {
        setSelectedImage(img);
        setViewerOpen(true);
    }

    function closeViewer() {
        setViewerOpen(false);
    }

    function nextImage() {
        const i = gallery.indexOf(selectedImage);
        setSelectedImage(gallery[(i + 1) % gallery.length]);
    }

    function prevImage() {
        const i = gallery.indexOf(selectedImage);
        setSelectedImage(gallery[(i - 1 + gallery.length) % gallery.length]);
    }

    useEffect(() => {

        function handleKeyDown(e){
            if (viewerOpen) {
                if (e.key === "Escape") {
                    closeViewer();
                    return;
                }
                if (e.key === "ArrowRight") {
                    nextImage();
                    return;
                }
                if (e.key === "ArrowLeft") {
                    prevImage();
                    return;
                }
                if (e.key === "Home") {
                    setSelectedImage(gallery[0]);
                    return;
                }
                if (e.key === "End") {
                    setSelectedImage(gallery[gallery.length - 1]);
                    return;
                }
                return;
                }

            const activeIndex = thumbRefs.current.findIndex(
            (btn) => btn === document.activeElement
            );

            if (activeIndex === -1) return;

            if (e.key === "ArrowRight") {
            const next = (activeIndex + 1) % gallery.length;
            thumbRefs.current[next]?.focus();     
            setSelectedImage(gallery[next]);
            e.preventDefault();
            }

            if (e.key === "ArrowLeft") {
            const prev = (activeIndex - 1 + gallery.length) % gallery.length;
            thumbRefs.current[prev]?.focus();    
            setSelectedImage(gallery[prev]);
            e.preventDefault();
            }

            if (e.key === "Enter" || e.key === " ") {
            document.activeElement.click();
            e.preventDefault();
            }
    
        }

        window.addEventListener("keydown", handleKeyDown);

        return() => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    },[viewerOpen, gallery, selectedImage]
);

    return (
        < div style = {{padding: 16}}>
            <Link to="/" className="backLink"> Back to search</Link>

            <h1 style = {{marginTop: 12}}>
                {property.type} - £{property.price.toLocaleString()}
            </h1>

            <p>
                <strong>Bedrooms: </strong> {property.bedrooms}
            </p>

            <p>
                <strong>Locations: </strong> {property.location}
            </p>

            <p>
                <strong>Date added: </strong> {property.dateAdded}
            </p>

            {gallery.length > 0 && (
                <div className="gallery">
                    <img className="gallery-main" src={selectedImage} alt="Property" onClick={() => openViewer(selectedImage)} style={{cursor: "pointer"}}/>

                    <div className="gallery-images">
                        {gallery.map((img, index) => (
                            <button key={index} type="button" ref={(el) => (thumbRefs.current[index] = el)} className={img === selectedImage ? "gallery-btn active": "gallery-btn"} onClick={() => setSelectedImage(img)}>
                                <img className="gallery-img" src={img} alt={`Property ${index + 1}`}/>
                            </button>
                        ))}
                    </div>
                    <button type="button" className="view-all-btn" onClick={() => openViewer(gallery[0])}>
                        View all images
                    </button>
                </div>
            )}

            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                <TabPanel>
                    <p>{property.description}</p>
                </TabPanel>

                <TabPanel>
                    <h3>Floor Plan</h3>
                    {property.floorPlan ? (
                        <div className="floorplan-wrap">
                            <img className="floorplan-img" src={`${import.meta.env.BASE_URL}${property.floorPlan.replace(/^\//,"")}`} alt={`Floor plan for ${property.type} in ${property.location}`}
                            />
                        </div>
                    ):(
                        <p>No floor plan available for this property yet.</p>
                    )
                }
                </TabPanel>

                <TabPanel>
                    <h3>Map</h3>
                    <p>{property.location}</p>

                    {(() => {const hasCoords = typeof property.lat === "number" && typeof property.lng === "number";

                    const mapSrc = hasCoords ?`https://www.google.com/maps?output=embed&z=16&11=${property.lat},${property.lng}`
                                            : `https://www.google.com/maps?output=embed&q=${encodeURIComponent(property.location)}`;
                    return(
                        <div className="map-wrap">
                            <iframe 
                                title={`Map of ${property.location}`}
                                className="map-iframe"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={mapSrc}
                            />
                        </div>
                    );
                })()}
                </TabPanel>
            </Tabs>

            {viewerOpen && (
                <div className="viewer-overlay" onClick={closeViewer}>
                    <div className="viewer-modal" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="viewer-close" onClick={closeViewer}>
                            X
                        </button>

                        <p className="viewer-count">{gallery.indexOf(selectedImage)+1} / {gallery.length}</p>

                        <div className="viewer-main">
                            <button type="button" className="viewer-nav" onClick={prevImage}>
                            ‹
                            </button>

                            <img className="viewer-image" src={selectedImage} alt="Full view" />

                            <button type="button" className="viewer-nav" onClick={nextImage}>
                            ›
                            </button>
                        </div>
                       
                    </div>

                </div>
            )}
        </div>
        
    )
}
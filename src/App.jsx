import SearchPage from "./pages/SearchPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage";

export default function App(){
  return (
  
      <Routes>
        <Route path= "/" element= {<SearchPage/>}/>
        <Route path= "/property/:id" element= {<PropertyPage />}/>
      </Routes>
   
  );
}
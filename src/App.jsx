import SearchPage from "./pages/SearchPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage";

export default function App(){
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path= "/" element= {<SearchPage/>}/>
        <Route path= "/property/:id" element= {<PropertyPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
import React from "react";
import Home from "./Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddContact from "./AddContact";
import AllContact from "./AllContact";
import RemoveContact from "./removeContact";
import UpdateContact from "./UpdateContact";
const Urls = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/add-contact" element={<AddContact/>} />
          <Route  path="/update-contact" element={<UpdateContact/>} />
          <Route  path="/remove-contact" element={<RemoveContact/>} />
          <Route  path="/all-contacts" element={<AllContact/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Urls;

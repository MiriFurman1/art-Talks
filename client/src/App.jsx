import React, { useEffect, useState } from "react";
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import GalleryPage from "./components/GalleryPage";
import DiscussionPage from "./components/discussionPage";
import Navbar from "./components/Navbar";
const App = () => {


  return (
    <div className=" max-w-screen min-h-screen flex flex-col  items-center bg-blue-900">
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<GalleryPage />}>
      </Route>
      <Route path="/discussion/:pictureId" element={<DiscussionPage />}>
      </Route>
    </Routes>

    </div>
  );
};

export default App;

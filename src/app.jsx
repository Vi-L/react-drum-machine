import React, { useState, useEffect } from "react";

/*
This code defines the react app
- Imports the router functionality to provide page navigation
- Defines the Home function outlining the content on each page
- Content specific to each page (Home and About) is defined in their components in /pages
- Each page content is presented inside the overall structure defined here
- The router attaches the page components to their paths
*/

// Import and apply CSS stylesheet
import "./styles/styles.css";

import Home from "./pages/home"

// Home function that is reflected across the site
export default function App() {
  return (
    <Home />
  );
}

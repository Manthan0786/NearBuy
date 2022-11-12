import React from "react";
import Login from "./login";
import Homepage from "./buyer/homepage";

export default function App() {
  return (
    <React.Fragment>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" /> 
      <Homepage/>
      {/* <Login /> */}
    </React.Fragment>
  )
}

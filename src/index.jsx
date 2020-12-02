import React from "react";
import ReactDOM from "react-dom";
import "./myServer";
import App from "component/App";
import RTL from "providers/StylePrivider"

ReactDOM.render(
  <React.StrictMode>
    <RTL>
       <App />
    </RTL>
   
  </React.StrictMode>,
  document.getElementById("root")
);

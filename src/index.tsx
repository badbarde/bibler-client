import React from "react";
import ReactDOM from "react-dom";
import { Bibler } from "./Bibler";

const App = () => (
    <div style={{
        width: "100%",
        height: "100vh",
        margin: "none",
        padding: "none"
    }}>
        <Bibler></Bibler>
    </div>
);
const app = document.createElement("div")
ReactDOM.render(
    <App />,
    app
);
document.body.appendChild(app)
import React from "react";
import ReactDOM from "react-dom";
import { Bibler } from "./Bibler";
//import { app, BrowserWindow } from "electron";


//function createWindow () {
//  // Create the browser window.
//  const win = new BrowserWindow({
//    width: 800,
//    height: 600,
//    webPreferences: {
//      nodeIntegration: true
//    }
//  })
//
//  // and load the index.html of the app.
//  win.loadFile('index.html')
//}
//
//app.whenReady().then(createWindow)

const App = () => (
    <div style={ {
        width:"100%",
        height:"100vh",
        margin:"none",
        padding:"none"
        }}>
        <Bibler></Bibler>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
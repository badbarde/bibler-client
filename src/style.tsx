/** @jsx jsx */
import CSS from "csstype";

export const textDarkStyle: CSS.Properties = {
    fontFamily: "Helvetica",
    color: "#505739",
    textDecoration: "none",
    textShadow: "0px 1px 0px #ffffff",
}
export const textLightStyle: CSS.Properties = {
    fontFamily: "Helvetica",
    color: "#eae0c2",
    textDecoration: "none",
    textShadow: "0px 1px 0px #ffffff",
}
export const backgroundColor = "rgb(45, 46, 41)"
export const backgroundStyle: CSS.Properties = {
    backgroundColor: backgroundColor
}
export const backgroundPaperDarkerStyle: CSS.Properties = {
    backgroundColor: "#e5d8b3",
}
export const backgroundPaperAccentColor = "#decfa0"
export const backgroundPaperAccentStyle: CSS.Properties = {
    backgroundColor: backgroundPaperAccentColor,
}
export const borderColor = "#706752"
export const paperColor = "#eae0c2"
export const backgroundPaperStyle: CSS.Properties = {
    backgroundColor: paperColor,
}
export const tableCellLightStyle: CSS.Properties = {
    background: "linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%)",
}

/*export const inputStyle: CSS.Properties = {
    width: "100%",
    minWidth: "16ch",
    border: "none",
    borderBottom: ".1em solid gray"
}
*/
export const iconButtonStyle: CSS.Properties = {
    backgroundColor: backgroundColor,
    border: "none",
    textShadow: "none",
    display: "inline-block",
    cursor: "pointer",
    textDecoration: "none",
    width: "100%"
}
export const cardStyle: CSS.Properties = {
    borderRadius: "22px",
    margin: ".5rem",
    border: "2px solid " + borderColor,
    padding: "22px",
    backgroundColor: paperColor,
    display: "inline-block"
}
export const inputStyle: CSS.Properties = {
    boxShadow: "0px 0px 0px -1px #1c1b18",
    background: "linear-gradient(to top, #eae0c2 5%, #ccc2a6 100%)",
    backgroundColor: "#eae0c2",
    borderRadius: "22px",
    border: "2.5px solid #706752",
    display: "inline-block",
    cursor: "pointer",
    color: "#505739",
    fontFamily: "Arial",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "11px 22px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #ffffff",
}
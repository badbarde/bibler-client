import CSS from "csstype";
import React from "react";
import { inputStyle, textDarkStyle } from "../style";
import { BooksTable } from "./Book/BooksTable";
import { UsersTable } from "./User/UsersTable";

export class ReturnForm extends React.Component {
    render(): JSX.Element {
        const hiddenInputStyle: CSS.Properties = {
            visibility: "hidden",
            pointerEvents: "none",
            display: "none"

        }
        const selectTableFormStyle: CSS.Properties = {
            margin: "1rem",
            height: "12rem",
            overflow: "auto"
        }
        const formStyle: CSS.Properties = {
            padding: "1rem"
        }
        const formLabelStyle: CSS.Properties = {
            paddingBottom: "2rem",
            paddingTop: "2rem",
        }
        return <div className="borrow-form-workflow">
            <form style={formStyle}>
                <h3 style={textDarkStyle}>Benutzer</h3>
                <input id="user-key" name="user-key" style={hiddenInputStyle}></input>
                <label htmlFor="fname" style={textDarkStyle}>Vorname </label><br></br>
                <input name="firstname" id="fname" type="text" placeholder="Pipi" style={inputStyle}>
                </input><br></br>
                <label htmlFor="lname" style={textDarkStyle}>Nachname </label><br></br>
                <input name="lastname" id="lname" type="text" placeholder="Langstrumpf" style={inputStyle}>
                </input>
                <h4 style={textDarkStyle}>Benutzerauswahl</h4>
                <div style={selectTableFormStyle}>
                    <UsersTable></UsersTable>
                </div>

                <h3 style={textDarkStyle}>Buch</h3>
                <input id="book-key" name="book-key" style={hiddenInputStyle}></input>
                <label htmlFor="Buch" style={textDarkStyle}>Buchtitel</label><br></br>
                <input name="book-name" id="Buch" type="text" placeholder="Pipi Im Tackatucka Land" style={inputStyle}>
                </input><br></br>
                <h4 style={textDarkStyle}>Buchauswahlliste</h4>
                <div style={selectTableFormStyle}>
                    <BooksTable></BooksTable>
                </div>
            </form>

        </div>
    }
}
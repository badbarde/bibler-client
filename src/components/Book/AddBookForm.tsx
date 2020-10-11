import CSS from "csstype";
import React from "react";
import { DefaultBibler } from "../../apis";
import { bookI18N } from "../../i18n";
import { Book, BookFromJSON } from "../../models/Book";
import { inputStyle, textDarkStyle } from "../../style";

const api = new DefaultBibler()
type addBookFormState = {
    record: Book
}
export interface IAddBookForm {
    record?: Book
}
export class AddBookForm extends React.Component<IAddBookForm, addBookFormState> {
    constructor(props: Readonly<IAddBookForm>) {
        super(props)
        this.state = {
            record: {
                key: 0,
                author: "",
                category: "",
                isbn: "",
                number: "",
                publisher: "",
                shorthand: "",
                title: ""
            }
        }
    }
    save = async (): Promise<void> => {
        const { record } = this.state
        const response = await api.putBookBookPut({ book: BookFromJSON(record) })
        console.log(response)
    }


    render(): JSX.Element {
        const { record } = this.state
        const hiddenInputStyle: CSS.Properties = {
            visibility: "hidden",
            pointerEvents: "none",
            display: "none"

        }
        const formStyle: CSS.Properties = {
            padding: "1rem"
        }
        const capitalize = (s: string | undefined): string | undefined => s ? s.replace(/^\w/, (c) => c.toUpperCase()) : s;
        return <div className="borrow-form-workflow">
            <form style={formStyle}>
                <input id="book-key" name="book-key" style={hiddenInputStyle}></input>
                {Object.keys(record)
                    .filter(el => el != "key")
                    .map(el => <div key={el}>
                        <label htmlFor={el} style={textDarkStyle}>{capitalize(bookI18N.get(el))}</label><br></br>
                        <input name={`book-${el}`} id={el} type="text" placeholder={capitalize(bookI18N.get(el))} style={inputStyle}>
                        </input><br></br>
                    </div>)}
            </form>

        </div>
    }
}
import { Button, Input, Space } from "antd";
import CSS from "csstype";
import React from "react";
import { DefaultBibler } from "../../apis";
import { Book, BookFromJSON } from "../../models/Book";

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
                <Space direction="vertical">
                    <h1>Buch hinzufügen</h1>
                    <input id="book-key" name="book-key" style={hiddenInputStyle}></input>
                    <label>Titel</label>
                    <Input placeholder="Titel"></Input>
                    <label>Autor</label>
                    <Input placeholder="Autor"></Input>
                    <label>Kategorie</label>
                    <Input placeholder="Kategorie"></Input>
                    <label>Verlag</label>
                    <Input placeholder="Verlag"></Input>
                    <label>Kürzel</label>
                    <Input placeholder="Kürzel"></Input>
                    <label>Nummer</label>
                    <Input placeholder="Nummer"></Input>
                    <label>Etikett</label>
                    <Input placeholder="Etikett"></Input>
                    <label>ISBN</label>
                    <Input placeholder="ISBN"></Input>
                    <Button type="primary">Speichern</Button>
                </Space>
            </form>

        </div>
    }
}
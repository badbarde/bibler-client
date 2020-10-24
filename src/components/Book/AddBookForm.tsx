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
        const response = await api.dbPutBookBookPut({ book: BookFromJSON(record) })
        console.log(response)
    }


    render(): JSX.Element {
        const hiddenInputStyle: CSS.Properties = {
            visibility: "hidden",
            pointerEvents: "none",
            display: "none"

        }
        const formStyle: CSS.Properties = {
            padding: "1rem"
        }
        return <div className="borrow-form-workflow">
            <form style={formStyle}>
                <h1 style={{ fontSize: "2rem" }}>Buch hinzufügen</h1>
                <input id="book-key" name="book-key" style={hiddenInputStyle}></input>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                    <div style={{ display: "1/2" }}>
                        <Space direction="vertical">
                            <label>Titel</label>
                            <Input placeholder="Titel"></Input>
                            <label>Autor</label>
                            <Input placeholder="Autor"></Input>
                            <label>Kategorie</label>
                            <Input placeholder="Kategorie"></Input>
                            <label>Verlag</label>
                            <Input placeholder="Verlag"></Input>
                        </Space>
                    </div>
                    <div style={{ display: "2/3", marginInline: "1rem" }}>
                        <Space direction="vertical">
                            <label>Kürzel</label>
                            <Input placeholder="Kürzel"></Input>
                            <label>Nummer</label>
                            <Input placeholder="Nummer"></Input>
                            <label>Etikett</label>
                            <Input placeholder="Etikett"></Input>
                            <label>ISBN</label>
                            <Input placeholder="ISBN"></Input>
                            <Button size="large" shape="round" type="primary">Speichern</Button>
                        </Space>
                    </div>
                </div>
            </form>

        </div>
    }
}
import { Button, Input, message, Space } from "antd";
import CSS from "csstype";
import React from "react";
import { DefaultBibler } from "../../apis";
import { Book, BookFromJSON } from "../../models/Book";
import { PutBookResponseStatus } from "../../models/PutBookResponseStatus";

const api = new DefaultBibler()
type addBookFormState = {
    record: Book
    loading: boolean
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
            },
            loading: false
        }
    }
    save = async (): Promise<void> => {
        const { record } = this.state
        let fail = false
        if (record.title == "") {
            message.error("Titel darf nicht leer sein")
            fail = true
        }
        if (record.author == "") {
            message.error("Autor darf nicht leer sein")
            fail = true
        }
        if (record.number == "") {
            message.error("Nummer darf nicht leer sein")
            fail = true
        }
        if (record.publisher == "") {
            message.error("Verlag darf nicht leer sein")
            fail = true
        }
        if (record.shorthand == "") {
            message.error("Kürzel darf nicht leer sein")
            fail = true
        }
        if (fail) {
            return
        }
        const response = await api.dbPutBookBookPut({ book: BookFromJSON(record) })
        switch (response.status) {
            case PutBookResponseStatus.Created:
                message.success("Buch wurde gespeichert")
                break;
            case PutBookResponseStatus.NotCreated:
                message.error("Buch konnte nicht gespeichert werden")
                break;
            default:
                message.error("Es ist ein Fehler aufgetreten")
                break;
        }
        setTimeout(() => this.setState({
            loading: false,
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
        }), 1000)
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
                            <Input required placeholder="Titel"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.title = e.target.value
                                    this.setState({ record: record })
                                }}></Input>
                            <label>Autor</label>
                            <Input required placeholder="Autor"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.author = e.target.value
                                    this.setState({ record: record })
                                }}></Input>
                            <label>Verlag</label>
                            <Input required placeholder="Verlag"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.publisher = e.target.value
                                    this.setState({ record: record })
                                }}></Input>
                            <label>Kategorie</label>
                            <Input placeholder="Kategorie"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.category = e.target.value
                                    this.setState({ record: record })
                                }} ></Input>
                        </Space>
                    </div>
                    <div style={{ display: "2/3", marginInline: "1rem" }}>
                        <Space direction="vertical">
                            <label>Kürzel</label>
                            <Input required placeholder="Kürzel"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.shorthand = e.target.value
                                    this.setState({ record: record })
                                }} ></Input>
                            <label>Nummer</label>
                            <Input required placeholder="Nummer"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.number = e.target.value
                                    this.setState({ record: record })
                                }} ></Input>
                            <label>ISBN</label>
                            <Input placeholder="ISBN"
                                onChange={(e) => {
                                    const { record } = this.state
                                    record.isbn = e.target.value
                                    this.setState({ record: record })
                                }} ></Input>
                        </Space>
                    </div>
                </div>
                <div style={{
                    marginBlock: "1rem",
                    justifySelf: "end"
                }}>
                    <Button size="large" shape="round" type="primary" onClick={this.save}>Speichern</Button>
                </div>
            </form>

        </div>
    }
}
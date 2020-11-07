import { Button, Input, message, Space } from "antd";
import CSS from "csstype";
import React from "react";
import { DefaultBibler } from "../../apis";
import { PutUserResponseStatus, UserInFromJSON } from "../../models";
import { User } from "../../models/User";

const api = new DefaultBibler()
type addUserFormState = {
    record: User,
    loading: boolean
}
export class AddUserForm extends React.Component<unknown, addUserFormState> {
    state: addUserFormState = {
        record: {
            key: 0,
            firstname: "",
            lastname: "",
            classname: "",
        },
        loading: false
    }
    save = async (event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
        event.preventDefault()
        const key = 'updatable';
        const { record } = this.state
        let fail = false
        if (record.firstname == "") {
            message.error("Vorname darf nicht leer sein")
            fail = true
        }
        if (record.lastname == "") {
            message.error("Nachname darf nicht leer sein")
            fail = true
        }
        if (record.classname == "") {
            message.error("Klasse darf nicht leer sein")
            fail = true
        }
        if (fail) {
            return
        }
        const cleanedRecord: User = {
            key: -1, //this will be ignored
            firstname: record.firstname.trim(),
            lastname: record.lastname.trim(),
            classname: record.classname?.trim()
        }
        message.loading({ content: 'Speichern...', key });
        setTimeout(() => {
            message.success({ content: 'Neue Benutzer*in gespeichert!', key, duration: 2 });
        }, 1000);
        this.setState({
            loading: true
        })
        const response = await api.putUserUserPut({ userIn: UserInFromJSON(cleanedRecord) })
        console.log(response)
        switch (response.status) {
            case PutUserResponseStatus.Created:
                message.success("Benutzer wurde gespeichert")
                break;
            case PutUserResponseStatus.NotCreated:
                message.error("Benutzer konnte nicht gespeichert werden")
                break;
            default:
                message.error("Es ist ein Fehler aufgetreten")
                break;
        }
        setTimeout(() => this.setState({
            loading: false,
            record: {
                lastname: "",
                firstname: "",
                key: 0,
                classname: ""
            }
        }), 1000)
    }
    render(): JSX.Element {
        const hiddenInputStyle: CSS.Properties = {
            visibility: "hidden",
            pointerEvents: "none",
            display: "none"

        }
        return <div style={{ padding: "1rem" }}>
            <Space direction="vertical">
                <h1 style={{ fontSize: "2rem" }}>Benutzer hinzufügen</h1>
                <input id="book-key" name="book-key" style={hiddenInputStyle} value={this.state.record.key}></input>
                <label>Vorname</label>
                <Input placeholder="Vorname" value={this.state.record.firstname}
                    onChange={(e) => {
                        const { record } = this.state
                        record.firstname = e.target.value
                        this.setState({ record: record })
                    }
                    }></Input>
                <label>Nachname</label>
                <Input placeholder="Nachname" value={this.state.record.lastname}
                    onChange={(e) => {
                        const { record } = this.state
                        record.lastname = e.target.value
                        this.setState({ record: record })
                    }
                    } ></Input>
                <label>Klasse</label>
                <Input placeholder="Klasse" value={this.state.record.classname}
                    onChange={(e) => {
                        const { record } = this.state
                        record.classname = e.target.value
                        this.setState({ record: record })
                    }
                    } ></Input>
                <Button type="primary" size="large" shape="round" loading={this.state.loading} onClick={this.save}>Speichern</Button>
            </Space>
        </div>
    }
}
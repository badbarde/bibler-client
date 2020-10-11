import CSS from "csstype";
import React from "react";
import { DefaultBibler } from "../apis";
import { userI18N } from "../i18n";
import { User, UserFromJSON } from "../models";
import { inputStyle, textDarkStyle } from "../style";

const api = new DefaultBibler()
interface IUser extends User {
    [key: string]: string | number | undefined
}
type addUserFormState = {
    record: IUser
}
export class AddUserForm extends React.Component {
    state: addUserFormState = {
        record: {
            firstname: "",
            key: 0,
            lastname: "",
            _class: ""
        }
    }
    save = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        const { record } = this.state
        const response = await api.putUserUserPut({ user: UserFromJSON(record) })
        console.log(response)
        event.preventDefault()
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
            <form style={formStyle} onSubmit={this.save}>
                <input id="book-key" name="book-key" style={hiddenInputStyle}></input>
                {Object.keys(record)
                    .filter(el => el != "key")
                    .map(el => <div key={el}>
                        <label htmlFor={el} style={textDarkStyle}>{capitalize(userI18N.get(el))}</label><br></br>
                        <input name={`book-${el}`} id={el} type="text" placeholder={capitalize(userI18N.get(el))}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { record } = this.state
                                record[el] = event.target.value
                                console.log(record)
                                this.setState({
                                    record: record
                                })
                            }} style={inputStyle}>
                        </input><br></br>
                    </div>)}
                <input type="submit" value="Submit"></input>
            </form>

        </div>
    }
}
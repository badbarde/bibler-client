import React from "react";
import { inputStyle } from "../style";

export interface IInput {
    placeholder?: string,
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}
export class Input extends React.Component<IInput>{
    render(): JSX.Element {
        return <input style={inputStyle} placeholder={this.props.placeholder}>{this.props.children}</input>
    }
}
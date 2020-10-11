import { Button } from 'antd';
import 'antd/dist/antd.css';
import React from "react";
//import "./Button.module.css";
import './index.css';

export interface IBButton {
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}
export class BButton extends React.Component<IBButton>{
    render(): JSX.Element {
        return <Button onClick={this.props.onClick} >{this.props.children}</Button>
    }
}
import { Button, Modal } from "antd";
import CSS from 'csstype';
import React, { SyntheticEvent } from "react";

export interface IModal {
    name: string,
    icon?: JSX.Element,
    actions?: Array<JSX.Element>

}

type ModalState = {
    open: boolean,
    confirmLoading: boolean
}
export class BModal extends React.Component<IModal> {
    state: ModalState = {
        open: false,
        confirmLoading: false
    }
    open = (e: SyntheticEvent): void => {
        console.log(e.target)
        this.setState({
            open: true
        })
    }
    close = (e: SyntheticEvent): void => {
        console.log(e.target)
        this.setState({
            open: false
        })
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    render(): JSX.Element {
        const { open, confirmLoading } = this.state

        const buttonGroupStyle: CSS.Properties = {
            width: "34rem",
            flex: "0 1 150px", /*  No stretching: */
            margin: "1rem",
        }
        return <div>
            <Button type="primary" onClick={this.open}>
                Open Modal with async logic
        </Button>
            <Modal
                title="Title"
                visible={open}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                {this.props.children}
            </Modal>
        </div>
    }
}
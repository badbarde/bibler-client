import { Button, Divider, Image, Modal } from "antd";
import React from "react";
import { GiBookCover } from "react-icons/gi";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { BorrowResponseModel, User } from "../../models";
import { Book } from "../../models/Book";
import { Record } from "../BTable";
import { UserSelectTable, userSelectTableSubject } from "../User/UserSelectTable";

export interface IBookItem {
    book: Book,
    user?: User
}
interface BookItemState {
    selectedUser?: Record,
    loading: boolean,
    visible: boolean,
    buttonDisabled: boolean,
    response?: BorrowResponseModel,
    borrowingUser?: User

}

const api = new DefaultBibler()
export class BookItem extends React.Component<IBookItem> {
    state: BookItemState = {
        loading: false,
        visible: false,
        buttonDisabled: false
    };
    usersTableSubscription = userSelectTableSubject.subscribe(el => {
        this.setState({
            selectedUser: el[0]
        })
    })
    constructor(props: Readonly<IBookItem>) {
        super(props)
        this.state.borrowingUser = props.user
    }
    componentWillUnmount(): void {
        this.usersTableSubscription.unsubscribe()
    }
    showBorrowingModal = (): void => {
        this.setState({
            visible: true,
        });
    };
    returnBook = async (): Promise<void> => {
        this.setState({
            buttonDisabled: true,
            loading: true
        })
        if (this.props.user != null) {
            const response = await api.returnBookReturnUserKeyBookKeyPatch({
                bookKey: this.props.book.key,
                userKey: this.props.user.key
            })
            console.log(response)
            if (response != null) {
                setTimeout(() => {
                    this.setState({
                        borrowingUser: null,
                        loading: false,
                        buttonDisabled: false
                    });
                }, 3000);
            }
        }
    };

    handleOk = async (): Promise<void> => {
        const { selectedUser } = this.state
        this.setState({ loading: true });
        if (selectedUser != null) {
            console.log("borrowing user", selectedUser)
            const response = await api.borrowBookBorrowUserKeyBookKeyPatch({
                bookKey: this.props.book.key,
                userKey: +selectedUser.key,
            })
            console.log(response)
            setTimeout(() => {
                this.setState({
                    loading: false,
                    visible: false,
                    response: response,
                    buttonDisabled: false,
                    borrowingUser: selectedUser
                });
            }, 3000);
        }
    };

    handleCancel = (): void => {
        this.setState({
            visible: false
        });
    };
    render(): JSX.Element {
        const { visible, loading, selectedUser, borrowingUser, buttonDisabled } = this.state;
        let action, userLabel
        if (borrowingUser != null) {
            action = <Button
                disabled={buttonDisabled}
                type="primary"
                onClick={this.returnBook}
                loading={loading}
                shape="round"
                icon={<GiBookCover />}
                size="large"> Zurückgeben</Button>
            userLabel = <div>
                <Divider />
                <div ><span>Aktuell ausgeliehen an </span>{`${borrowingUser.firstname} ${borrowingUser.lastname}`}</div>
            </div>
        }
        else {
            action = <Button
                disabled={buttonDisabled}
                type="primary"
                onClick={this.showBorrowingModal}
                loading={loading}
                shape="round"
                icon={<GiBookCover />}
                size="large">Ausleihen</Button>
            userLabel = <></>
        }
        return <div style={{
            padding: "1.5rem"
        }}>
            <h1 style={{ fontSize: "2rem" }}>{this.props.book.title}</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr"
            }}>
                <div style={{ height: "24rem", display: "inline-block" }}>
                    <Image alt="example" src=""
                        height="100%"
                        fallback="data:image/png;base64,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"
                    />

                </div>
                <div style={{ display: "inline-block", marginTop: "1rem", fontSize: "1rem" }}>
                    <div ><span>Titel: </span>{this.props.book.title}</div>
                    <div ><span>Autor: </span>{this.props.book.author}</div>
                    <div ><span>Verlag: </span>{this.props.book.publisher}</div>
                    <div ><span>Kategorie: </span>{this.props.book.category}</div>
                    <div ><span>ISBN: </span>{this.props.book.isbn}</div>
                    <div ><span>Etikett: </span>{this.props.book.shorthand} {this.props.book.number}</div>
                    <div ><span>key: </span>{this.props.book.key}</div>
                    {userLabel}
                </div>
                <div style={{ paddingBlock: "1rem" }}>
                    {action}
                    <Modal
                        visible={visible}
                        title={"Wer möchte " + this.props.book.title + " ausleihen?"}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}> Return </Button>,
                            <Button disabled={selectedUser == null} key="submit" type="primary" loading={loading} onClick={this.handleOk}> Submit </Button>,
                        ]}
                    >
                        <UserSelectTable key="user-borrow-select"></UserSelectTable>
                    </Modal>
                </div>
            </div>
        </div>
    }
}
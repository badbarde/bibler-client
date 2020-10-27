import { FieldTimeOutlined } from "@ant-design/icons";
import { Button, Divider, Image, message, Modal, Space } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { GiBookCover } from "react-icons/gi";
import { Subject, Subscription } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { BorrowResponseStatus, ExtendingResponseStatus, ReturningResponseStatus } from "../../models";
import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { BASE_PATH } from "../../runtime";
import { UserSelectCards, userSelectCardsSubject } from "../User/UserSelectCards";

export interface IBookItem {
    /**
     * The displayed book.
     */
    book: Book,
    /**
     * The preselected user borrowing the book.
     */
    user?: User
}
interface BookItemState {
    /**
     * User selected from the borrow modal.
     */
    selectedUser?: User
    /**
     * State of the loading Icon on the borrow button.
     */
    loading: boolean
    /**
     * State of the borrow modal.
     */
    borrowModalVisible: boolean
    /**
     * State of the borrow button.
     */
    borrowButtonDisabled: boolean
    /**
     * User currently borrowing the displayed book.
     */
    borrowingUser?: User | null
    /**
     * Flag indicating that the book cant be borrowed.
     */
    isAlreadyBorrowed: boolean,
    /**
     * Flag indicating if a picture for the book exists.
     */
    mediaExists: boolean

}

const api = new DefaultBibler()
export const borrowModalSeachFilterSubject = new Subject<string>()
export class BookItem extends React.Component<IBookItem, BookItemState> {
    state: BookItemState = {
        loading: false,
        borrowModalVisible: false,
        borrowButtonDisabled: false,
        isAlreadyBorrowed: false,
        mediaExists: false
    };
    usersTableSub: Subscription | null = null
    constructor(props: Readonly<IBookItem>) {
        super(props)
        if (props.user != null) {
            this.state.borrowingUser = props.user
        }
    }

    async componentDidMount(): Promise<void> {
        const mediaExists = await api.bookCoverExistesMediaExistsBookKeyGet({ bookKey: this.props.book.key })
        const borrowed = await api.isBorrowedBookBorrowedBookKeyGet({ bookKey: this.props.book.key })
        this.setState({
            isAlreadyBorrowed: borrowed.replaceAll("\"", "").toLowerCase() == "false" ? false : true,
            mediaExists: mediaExists.replaceAll("\"", "").toLowerCase() == "false" ? false : true
        })
        this.usersTableSub = userSelectCardsSubject.subscribe(el => {
            this.setState({
                selectedUser: el.user
            })
        })
    }
    componentWillUnmount(): void {
        this.usersTableSub?.unsubscribe()
    }

    showBorrowingModal = (): void => {
        this.setState({
            borrowModalVisible: true,
        });
    }

    extendBorrowPeriod = async (): Promise<void> => {
        console.log("extend book")
        if (this.state.borrowingUser != null) {
            const resonse = await api.extendBorrowPeriodExtendUserKeyBookKeyPatch({ bookKey: this.props.book.key, userKey: this.state.borrowingUser.key })
            switch (resonse.status) {
                case ExtendingResponseStatus.SuccessfullyExtended:
                    message.success("Buch erfolgreich verlängert bis " + resonse.returnDate)
                    break;
                case ExtendingResponseStatus.MaximumBorrowPeriodReached:
                    message.error("Das Buch kann nicht weiter verlängert werden")
                    break;
                default:
                    message.error("Ein fehler ist aufgetreten")
                    break;
            }
        }
    }
    returnBookAction = async (): Promise<void> => {
        this.setState({
            borrowButtonDisabled: true,
            loading: true
        })
        if (this.state.borrowingUser != null) {
            const response = await api.returnBookReturnUserKeyBookKeyPatch({
                bookKey: this.props.book.key,
                userKey: this.state.borrowingUser.key
            })
            console.log(response)
            if (response != null && response.status == ReturningResponseStatus.SuccessfullyReturned) {
                setTimeout(() => {
                    message.success("Das Buch wurde erfolgreich zurück gegeben");
                    this.setState({
                        borrowingUser: null,
                        isAlreadyBorrowed: false,
                        loading: false,
                        borrowButtonDisabled: false
                    });
                }, 1000);
            } else {
                message.error("Es ist ein Problem aufgetreten:" + response.status);
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
            if (response != null && response.status == BorrowResponseStatus.SuccessfullyBorrowed) {
                setTimeout(() => {
                    message.success("Das Buch wurde erfolgreich ausgeliehen");
                    this.setState({
                        loading: false,
                        borrowModalVisible: false,
                        borrowButtonDisabled: false,
                        borrowingUser: selectedUser
                    });
                }, 1000);
            }
            else {
                message.success("Es ist ein Problem aufgetreten:" + response.status);
            }
        }
    };

    handleCancel = (): void => {
        this.setState({
            borrowModalVisible: false,
        });
    };
    onSearch = (): void => {
        console.log("seach")
    }
    onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const searchString = event.target.value
        console.log(`changes: ${searchString}`)
        borrowModalSeachFilterSubject.next(searchString)
    }
    render(): JSX.Element {
        const { borrowModalVisible: visible, loading, selectedUser, borrowingUser, borrowButtonDisabled: buttonDisabled } = this.state;
        let actions, userLabel
        if (borrowingUser != null) {
            actions = [
                <Button
                    key="action Zurückgeben"
                    disabled={buttonDisabled}
                    type="primary"
                    onClick={this.returnBookAction}
                    loading={loading}
                    shape="round"
                    icon={<GiBookCover />}
                    size="large"> Zurückgeben</Button>,
                <Button
                    key="action Verlängern"
                    shape="round"
                    onClick={this.extendBorrowPeriod}
                    icon={<FieldTimeOutlined />}
                    type="primary"
                    size="large"
                >Verlängern</Button>
            ]
            userLabel = <div>
                <Divider />
                <div ><span>Aktuell ausgeliehen an </span>{`${borrowingUser.firstname} ${borrowingUser.lastname}`}</div>
            </div>
        }
        else if (this.state.isAlreadyBorrowed) {
            actions = [
                <Button
                    key="action Verliehen"
                    disabled={true}
                    type="primary"
                    loading={false}
                    shape="round"
                    icon={<GiBookCover />}
                    size="large">Verliehen</Button>,
            ]
            userLabel = <></>

        }
        else {
            actions = [
                <Button
                    key="action Ausleihen"
                    disabled={buttonDisabled}
                    type="primary"
                    onClick={this.showBorrowingModal}
                    loading={loading}
                    shape="round"
                    icon={<GiBookCover />}
                    size="large">Ausleihen</Button>
            ]
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
                <div style={{ height: "24rem", display: "inline-block", margin: ".5rem" }}>
                    <Image alt="example" src={`${BASE_PATH}/media/${this.props.book.key}`}
                        height="100%"
                        fallback="data:image/png;base64,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"
                    />

                </div>
                <div style={{ display: "inline-block", marginTop: "1rem", fontSize: "1rem" }}>
                    <div><span>Autor: </span>{this.props.book.author}</div>
                    <div><span>Verlag: </span>{this.props.book.publisher}</div>
                    <div><span>Kategorie: </span>{this.props.book.category}</div>
                    <div><span>ISBN: </span>{this.props.book.isbn}</div>
                    <div><span>Etikett: </span>{this.props.book.shorthand} {this.props.book.number}</div>
                    {userLabel}
                </div>
                <div style={{ paddingBlock: "1rem" }}>
                    <Space direction="vertical">
                        {actions}
                    </Space>
                    <Modal
                        visible={visible}
                        title={"Wer möchte " + this.props.book.title + " ausleihen?"}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}> Abbrechen </Button>,
                            <Button disabled={selectedUser == null} key="submit" type="primary" loading={loading} onClick={this.handleOk}> Ausleihen </Button>,
                        ]}
                    >
                        <Search
                            placeholder="Suchen"
                            size="large"
                            onChange={this.onSearchChanged}
                            onSearch={this.onSearch}
                        ></Search>
                        <div style={{ marginBlock: "1rem" }}>
                            <UserSelectCards key="user-borrow-select"></UserSelectCards>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    }
}
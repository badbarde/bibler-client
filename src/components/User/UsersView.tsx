import React from "react";
import { Subscription } from "rxjs";
import { Book } from "../..";
import { User } from "../../models/User";
import { BookItem } from "../Book/BookItem";
import { BooksTable, booksTableSubject } from "../Book/BooksTable";
import { viewTypeSubject } from "../TitleBarMenu";
import { ViewTypes } from "../ViewTypes";
import { ExtendedUser, UserCards, userCardsSubject } from "./UserCards";
import { UsersTable, userTableSubject } from "./UsersTable";


interface BookViewState {
    bookViewType: ViewTypes,
    selectedUser: User | null
    selectedBook: Book | null
}
export class UsersView extends React.Component {
    state: BookViewState = {
        bookViewType: ViewTypes.CARD,
        selectedUser: null,
        selectedBook: null
    }
    viewTypeSub: Subscription | null = null
    usersTableSub: Subscription | null = null
    usersCardsSub: Subscription | null = null
    bookTableSub: Subscription | null = null
    componentDidMount(): void {
        this.viewTypeSub = viewTypeSubject.subscribe(viewType => {
            console.log("change vietype to: " + viewType)
            this.setState({
                bookViewType: viewType
            })
        })
        this.usersTableSub = userTableSubject.subscribe(user => {
            console.log("selected " + user[0].key)
            this.setState({
                selectedUser: user[0]
            })
        })
        this.usersCardsSub = userCardsSubject.subscribe((user: ExtendedUser) => {
            console.log("selected " + user.user.key)
            this.setState({
                selectedUser: user.user
            })
        })
        this.bookTableSub = booksTableSubject.subscribe(book => {
            console.log("selected " + book.title)
            this.setState({
                selectedBook: book
            })
        })
    }
    componentWillUnmount(): void {
        if (this.viewTypeSub != null) {
            this.viewTypeSub.unsubscribe()
        }
        if (this.usersTableSub != null) {
            this.usersTableSub.unsubscribe()
        }
        if (this.bookTableSub != null) {
            this.bookTableSub.unsubscribe()
        }
    }
    render(): JSX.Element {
        const { bookViewType, selectedUser, selectedBook } = this.state
        if (selectedBook != null && selectedUser != null) {
            return <BookItem book={selectedBook} user={selectedUser} key={`borrowedBook-${selectedUser.key}-${selectedBook.key}`} ></BookItem>
        }
        if (selectedUser != null) {
            return <BooksTable userFilter={selectedUser} key={`borrowedBooks${selectedUser.firstname}-${selectedUser.lastname}`} ></BooksTable>
        }
        switch (bookViewType) {
            case ViewTypes.TABLE:
                return <UsersTable key="BooksTable"></UsersTable>
            case ViewTypes.CARD:
                return <UserCards key="BookCards"></UserCards>
            default:
                return <BooksTable key="BooksTable"></BooksTable>
        }
    }
}
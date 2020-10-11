import React from "react";
import { Subscription } from "rxjs";
import { Book, User } from "../..";
import { BookItem } from "../Book/BookItem";
import { BooksTable, booksTableSubject } from "../Book/BooksTable";
import { viewTypeSubject } from "../Menu";
import { ViewTypes } from "../ViewTypes";
import { UserCards } from "./UserCards";
import { UsersTable, userTableSubject } from "./UsersTable";


interface BookViewState {
    bookViewType: ViewTypes,
    selectedUser: User | null
    selectedBook: Book | null
}
export class UsersView extends React.Component {
    state: BookViewState = {
        bookViewType: ViewTypes.TABLE,
        selectedUser: null,
        selectedBook: null
    }
    viewTypeSub: Subscription = viewTypeSubject.subscribe(viewType => {
        console.log("change vietype to: " + viewType)
        this.setState({
            bookViewType: viewType
        })
    })
    usersTableSub: Subscription = userTableSubject.subscribe(user => {
        console.log("selected " + user[0].key)
        this.setState({
            selectedUser: user[0]
        })
    })
    bookTableSub: Subscription = booksTableSubject.subscribe(book => {
        console.log("selected " + book.title)
        this.setState({
            selectedBook: book
        })
    })
    componentWillUnmount(): void {
        this.viewTypeSub.unsubscribe()
        this.usersTableSub.unsubscribe()
        this.bookTableSub.unsubscribe()
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
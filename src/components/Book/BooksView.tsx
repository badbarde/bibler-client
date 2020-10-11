import React from "react"
import { Subscription } from "rxjs"
import { Book } from "../../models/Book"
import { viewTypeSubject } from "../Menu"
import { ViewTypes } from "../ViewTypes"
import { bookCardsSubject } from "./BookCard"
import { BookCards } from "./BookCards"
import { BookItem } from "./BookItem"
import { BooksTable, booksTableSubject } from "./BooksTable"

interface BookViewState {
    bookViewType: ViewTypes,
    selectedBook: Book | null
}
export class BooksView extends React.Component {
    state: BookViewState = {
        bookViewType: ViewTypes.TABLE,
        selectedBook: null
    }
    viewTypeSub: Subscription = viewTypeSubject.subscribe(viewType => {
        console.log("change vietype to: " + viewType)
        this.setState({
            bookViewType: viewType
        })
    })
    bookCardSub: Subscription = bookCardsSubject.subscribe(book => {
        console.log("selected " + book.title)
        this.setState({
            selectedBook: book
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
        this.bookCardSub.unsubscribe()
    }
    render(): JSX.Element {
        const { bookViewType, selectedBook } = this.state
        if (selectedBook != null) {
            return <BookItem key={"BookItem" + selectedBook.title} book={selectedBook} ></BookItem>
        }
        switch (bookViewType) {
            case ViewTypes.TABLE:
                return <BooksTable key="BooksTable"></BooksTable>
            case ViewTypes.CARD:
                return <BookCards key="BookCards"></BookCards>
        }
        return <></>
    }
}
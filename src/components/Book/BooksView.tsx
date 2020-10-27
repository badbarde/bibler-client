import React from "react"
import { Subscription } from "rxjs"
import { Book } from "../../models/Book"
import { viewTypeSubject } from "../TitleBarMenu"
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
        bookViewType: ViewTypes.CARD,
        selectedBook: null
    }
    viewTypeSub: Subscription | null = null
    bookCardSub: Subscription | null = null
    bookTableSub: Subscription | null = null
    componentDidMount(): void {
        this.viewTypeSub = viewTypeSubject.subscribe(viewType => {
            console.log("change vietype to: " + viewType)
            this.setState({
                bookViewType: viewType
            })
        })
        this.bookTableSub = bookCardsSubject.subscribe(book => {
            console.log("selected " + book.title)
            this.setState({
                selectedBook: book
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
        this.viewTypeSub?.unsubscribe()
        this.bookTableSub?.unsubscribe()
        this.bookCardSub?.unsubscribe()
    }
    render(): JSX.Element {
        const { bookViewType, selectedBook } = this.state
        if (selectedBook != null) {
            return <BookItem key={"BookItem" + selectedBook.title} book={selectedBook} ></BookItem>
        }
        switch (bookViewType) {
            case ViewTypes.TABLE:
                return <BooksTable key="BorrowBooksTable"></BooksTable>
            case ViewTypes.CARD:
                return <BookCards key="BookCards"></BookCards>
        }
        return <></>
    }
}
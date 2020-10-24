import React from "react";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { Book } from "../../models/Book";
import { User } from '../../models/User';
import { BookCards } from './BookCards';
type BookCardsState = {
    data?: Array<Book>,
    insertRecord?: Book,
    page: number,
    pageSize: number,
}
interface IconText {
    icon: React.ReactElement,
    text: string
}
interface IBookCards {
    userFilter?: User
}
const api = new DefaultBibler()

export class BorrowBookCards extends BookCards {
    loadData = async (): Promise<void> => {
        const data = await api.getAvailableBooksBooksAvailableGet()
        console.log(data)
        this.setState({
            data: data
        })
    }


}
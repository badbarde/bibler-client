import { DefaultBibler } from "../../apis/DefaultBibler";
import { BooksTable } from "./BooksTable";


const api = new DefaultBibler()

export class BorrowBooksTable extends BooksTable {
    async loadData(): Promise<void> {
        const data = await api.getAvailableBooksBooksAvailableGet()
        console.log(data)
        this.setState({
            data: data,
            filteredData: data
        })
    }
}
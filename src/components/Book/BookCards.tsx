import { Empty, Pagination } from 'antd';
import React from "react";
import { Subscription } from 'rxjs';
import { DefaultBibler } from "../../apis/DefaultBibler";
import { Book } from "../../models/Book";
import { User } from '../../models/User';
import { searchFilterSubject } from '../TitleBarMenu';
import { BookCard } from './BookCard';
type BookCardsState = {
    data?: Array<Book>,
    filteredData?: Array<Book>,
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

export class BookCards extends React.Component<IBookCards> {
    state: BookCardsState = {
        data: [],
        page: 1,
        pageSize: 12,
        filteredData: []
    }
    searchFilterSub: Subscription | null = null
    loadData = async (): Promise<void> => {
        const data = await api.getBooksBooksGet({})
        console.log(data)
        this.setState({
            data: data,
            filteredData: data
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
        this.searchFilterSub = searchFilterSubject.subscribe((search: string) => {
            console.log("filtering by: " + search)
            const regex = new RegExp(".*" + search + ".*")
            const filterdData = this.state.data?.filter(e => Object.values(e)
                .some(i => i != null ? regex.test(i.toString()) : false))
            console.log("filterd books", filterdData)
            this.setState({
                filteredData: filterdData
            })
        })
    }
    componentWillUnmount(): void {
        this.searchFilterSub?.unsubscribe()
    }
    render(): JSX.Element {
        if (this.state.filteredData != null) {

            return <div>
                <div style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
                }
                }>
                    {this.state.filteredData.slice(this.state.page - 1, this.state.page + this.state.pageSize).map(el =>
                        <BookCard key={"book-card" + el.key} book={el}></BookCard>
                    )}

                </div >
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Pagination style={{
                    }} defaultCurrent={1} current={this.state.page} onChange={(page, pageSize) => this.setState({ page: page, pageSize: pageSize })} total={this.state.filteredData.length} />
                </div>
            </div>
        }
        return <Empty />
    }


}
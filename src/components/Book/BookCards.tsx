import { Empty, Pagination } from 'antd';
import React from "react";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { Book } from "../../models/Book";
import { User } from '../../models/User';
import { BookCard } from './BookCard';
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

export class BookCards extends React.Component<IBookCards> {
    state: BookCardsState = {
        data: [],
        page: 1,
        pageSize: 12
    }

    loadData = async (): Promise<void> => {
        const data = await api.getBooksBooksGet({ userKey: this.props.userFilter?.key })
        console.log(data)
        this.setState({
            data: data
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
    }
    render(): JSX.Element {
        if (this.state.data) {
            return <div>
                <div style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
                }
                }>
                    {this.state.data.slice(this.state.page, this.state.page + this.state.pageSize).map(el =>
                        <BookCard key={"book-card" + el.key} book={el}></BookCard>
                    )}

                </div >
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Pagination style={{
                    }} defaultCurrent={1} current={this.state.page} onChange={(page, pageSize) => this.setState({ page: page, pageSize: pageSize })} total={this.state.data.length} />
                </div>
            </div>
        }
        return <Empty />
    }


}
import { Space, Statistic } from "antd";
import React from "react";
import { DefaultBibler } from "../apis";

const api = new DefaultBibler()
export class StatusBar extends React.Component {
    state = {
        booksBorrowed: 0,
        booksOverdue: 0,
        bookCount: 0,
        userCount: 0
    }
    async componentDidMount(): Promise<void> {
        const borrowedBooks = await api.getBorrowedCountStatsBooksBorrowedGet()
        const booksOverdue = await api.getOverdueCountStatsBooksOverdueGet()
        const bookCount = await api.getBooksCountStatsBooksCountGet()
        const userCount = await api.getBooksCountStatsUsersCountGet()
        this.setState({
            booksBorrowed: borrowedBooks,
            booksOverdue: booksOverdue,
            bookCount: bookCount,
            userCount: userCount
        })
    }
    render(): JSX.Element {
        return <div style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
        }}>
            <div>
                <Space>
                    <Statistic
                        style={{ scale: ".5rem", transform: "scale(.7, .7)" }}
                        title="Aktuell verliehende Bücher"
                        value={this.state.booksBorrowed} />
                    <Statistic
                        style={{ scale: ".5rem", transform: "scale(.7, .7)" }}
                        title="Überfällige Bücher"
                        value={this.state.booksOverdue} />
                </Space>

            </div>

            <div style={{
                justifySelf: "end"
            }}>
                <Space>
                    <Statistic
                        style={{ scale: ".5rem", transform: "scale(.7, .7)" }}
                        title="Bücher"
                        value={this.state.bookCount} />
                    <Statistic
                        style={{ scale: ".5rem", transform: "scale(.7, .7)" }}
                        title="Benutzer*innen"
                        value={this.state.userCount} />

                </Space>
            </div>
        </div>
    }
}
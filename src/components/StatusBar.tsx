import { Space, Statistic } from "antd";
import React from "react";
import { DefaultBibler } from "../apis";

const api = new DefaultBibler()
export class StatusBar extends React.Component {
    state = {
        booksBorrowed: 0
    }
    async componentDidMount() {
        const borrowedBooks = await api.getStatsStatsBooksBorrowedGet()
        this.setState({
            booksBorrowed: borrowedBooks
        })
    }
    render(): JSX.Element {
        return <div><Space><Statistic style={{ scale: ".5rem", transform: "scale(.7, .7)" }} title="Aktuell verliehende Bücher" value={this.state.booksBorrowed} /></Space></div>
    }
}
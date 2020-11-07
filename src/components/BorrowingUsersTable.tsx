import { Table, Tag } from "antd";
import React from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../apis/DefaultBibler";
import { borrowingUserI18N } from "../i18n";
import { BorrowingUserRecord } from "../models";


export interface IBorrowingUsersTable {
    name?: string
}
type Record = {
    [index: string]: string | number
}
type BorrowingUsersTableState = {
    data?: Array<BorrowingUserRecord>,
    insertRecord?: Record
}
const api = new DefaultBibler()

export const usersTableSubject = new Subject<Record[]>()

export class BorrowingUsersTable extends React.Component<IBorrowingUsersTable, BorrowingUsersTableState> {
    state: BorrowingUsersTableState = {
        data: []
    }
    columnFilter: Array<string> = [
        "expirationDate",
        "startDate",
        "firstname",
        "lastname",
        "classname",
        "title",
        "author",
        "number",
    ]
    constructor(props: Readonly<IBorrowingUsersTable>) {
        super(props)
    }
    loadData = async (): Promise<void> => {
        const data = (await api.getBorrowingUsersUsersBorrowingGet())
        console.log(data)
        this.setState({
            data: data
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
    }
    handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string): void => {
        let { insertRecord } = this.state
        console.log(field, event.target.value)
        if (insertRecord == null) {
            insertRecord = {}
        }
        insertRecord[field] = event.target.value
        this.setState({
            insertRecord: insertRecord
        })
    }
    handleRightClickRecord = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
        event.preventDefault()
        console.log("rightlick on " + event.target)
    }
    renderColumns = (text: string, column: string): string | JSX.Element => {
        switch (column) {
            case "startDate":
            case "expirationDate":
                if (new Date(text) < new Date())
                    return <Tag color="red">{new Date(text).toLocaleDateString()}</Tag>
                return <Tag color="green">{new Date(text).toLocaleDateString()}</Tag>
            default:
                return text

        }
    }

    render(): JSX.Element {
        const { data } = this.state
        let cols
        if (data != null && data.length > 0) {
            console.log(data)
            cols = Object.keys(data[0])
                .filter(el => this.columnFilter.includes(el))
                .map(el => ({
                    title: borrowingUserI18N.get(el),
                    dataIndex: el,
                    key: el,
                    render: (text: string) => this.renderColumns(text, el)
                }))
        }
        return <Table columns={cols} dataSource={data} ></Table >
    }

}
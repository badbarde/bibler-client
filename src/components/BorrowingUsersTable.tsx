import { Table, Tag } from "antd";
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../apis/DefaultBibler";
import { borrowingUserI18N } from "../i18n";


export interface IBorrowingUsersTable {
    name?: string
}
type Record = {
    [index: string]: string | number
}
type TableState = {
    data?: Array<Record>,
    insertRecord?: Record
}
const api = new DefaultBibler()

export const usersTableSubject = new Subject<Record[]>()

export class BorrowingUsersTable extends React.Component<IBorrowingUsersTable> {
    state: TableState = {
        data: []
    }
    columnFilter: Array<string> = [
        "return_date",
        "expiration_date",
        "start_date",
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
        const data = (await api.getBorrowingUsersUsersBorrowingGet()) as Array<[Record, Record, Record]>
        console.log(data)
        this.setState({
            data: data.map(el => ({ ...el[0], ...el[1], ...el[2] }))
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
    }

    handleRecordClick = (event: SyntheticEvent, index: number | undefined): void => {
        console.log("books table record clicked")
        const { data } = this.state
        event.preventDefault()
        console.log(index, event)
        if (data && index != null) {
            this.setState({
                selectedRecord: data[index]
            })
        }
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
            case "expiration_date":
                if (new Date(text) < new Date())
                    return <Tag color="red">{text}</Tag>
                return <Tag color="green">{text}</Tag>
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
        return <Table columns={cols} dataSource={data?.map(el => {
            el.children = el.borrowed_books
            return el
        })} onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, rowIndex),
                onClick: event => this.handleRecordClick(event, rowIndex),
            }
        }}></Table>
    }

}
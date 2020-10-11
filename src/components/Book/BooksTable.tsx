import { Table } from 'antd';
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { bookI18N } from '../../i18n';
import { BookFromJSON, User } from "../../models";
import { Record } from "./../types";


export interface IBooksTable {
    name?: string,
    userFilter?: User
}
type TableState = {
    data?: Array<Record>,
    insertRecord?: Record
}
const api = new DefaultBibler()

export const booksTableSubject = new Subject<Record>()
const publish = (data: Record) => booksTableSubject.next(data)

export class BooksTable extends React.Component<IBooksTable> {
    state: TableState = {
        data: []
    }

    handleRecordClick = (event: SyntheticEvent, record: Record | undefined): void => {
        console.log("books table record clicked")
        const { data } = this.state
        event.preventDefault()
        console.log(record, event)
        if (data && record != null) {
            publish(record)
            this.setState({
                selectedRecord: record
            })
        }
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
    insertRecord = async (): Promise<void> => {
        const { insertRecord, data } = this.state
        if (insertRecord != null) {
            console.log(insertRecord)
            try {
                const response = await api.putBookBookPut({ book: BookFromJSON(insertRecord) })
                console.log(response)
                data?.unshift(BookFromJSON(insertRecord) as unknown as Record)
                this.setState({
                    data: data
                })
            } catch (e) {
                console.log(e)
            }

        }
    }
    handleRightClickRecord = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
        event.preventDefault()
        console.log("rightlick on " + event.target)
    }
    handleRowClick = (e: SyntheticEvent): void => {
        console.log(e)
    }
    render(): React.ReactNode {
        const { data } = this.state
        let cols
        if (data != null && data.length > 0) {
            console.log(data)
            cols = Object.keys(data[0]).map(el => ({
                title: bookI18N.get(el),
                dataIndex: el,
                key: el,
                //render: (text: string) => <a>{text}</a>,
            }))
        }
        return <Table columns={cols} dataSource={data} pagination={{ defaultPageSize: 100 }
        } onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, record),
                onClick: event => this.handleRecordClick(event, record),
            }
        }}></Table >

    }
}
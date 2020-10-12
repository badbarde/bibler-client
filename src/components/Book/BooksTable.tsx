import { Table, Tag } from 'antd';
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { bookI18N } from '../../i18n';
import { BookFromJSON, User } from "../../models";
import { searchFilterSubject } from '../Menu';
import { Record } from "./../types";


export interface IBooksTable {
    name?: string,
    userFilter?: User
}
type TableState = {
    data?: Array<Record>,
    filteredData?: Array<Record>,
    insertRecord?: Record,
    colors: Map<string, string>
}
const api = new DefaultBibler()

export const booksTableSubject = new Subject<Record>()
const publish = (data: Record) => booksTableSubject.next(data)

export class BooksTable extends React.Component<IBooksTable> {
    state: TableState = {
        data: [],
        colors: new Map<string, string>()
    }

    searchFilterSub = searchFilterSubject.subscribe(search => {
        console.log("filtering by: " + search)
        const regex = new RegExp(".*" + search + ".*")
        const filterdData = this.state.data?.filter(e => Object.values(e)
            .some(i => regex.test(i.toString())))
        console.log("filterd books", filterdData)
        this.setState({
            filteredData: filterdData
        })
    })
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
            data: data,
            filteredData: data
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
    componentWillUnmount() {
        this.searchFilterSub.unsubscribe()
    }
    getCategoryColor(value: string): string {
        const { colors } = this.state
        const existingCol = colors.get(value)
        if (existingCol != null) {
            return existingCol
        }
        const col = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
        colors.set(value, col)
        this.setState({
            colors: colors
        })
        return col
    }
    renderCol(col: string, value: string) {
        if (value != null && value != "") {
            switch (col) {
                case "category":
                    return <Tag color={this.getCategoryColor(value)} >{value}</Tag>
                default:
                    return value
            }
        }
        return null;
    }
    render(): React.ReactNode {
        const { filteredData } = this.state
        let cols
        if (filteredData != null && filteredData.length > 0) {
            console.log("redering table with: ", filteredData)
            cols = Object.keys(filteredData[0]).map(el => ({
                title: bookI18N.get(el),
                dataIndex: el,
                key: el,
                render: (text: string) => this.renderCol(el, text),
            }))
        }
        return <Table size="small" columns={cols} dataSource={filteredData} pagination={{ defaultPageSize: 100 }
        } onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, record),
                onClick: event => this.handleRecordClick(event, record),
            }
        }}></Table >

    }
}
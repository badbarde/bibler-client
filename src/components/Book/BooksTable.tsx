import { Table, Tag } from 'antd';
import React, { SyntheticEvent } from "react";
import { Subject, Subscription } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { bookI18N } from '../../i18n';
import { BookFromJSON, Category } from "../../models";
import { User } from '../../models/User';
import { searchFilterSubject } from '../TitleBarMenu';
import { Record } from "./../types";


export interface IBooksTable {
    name?: string,
    userFilter?: User
}
type TableState = {
    data?: Array<Record>
    filteredData?: Array<Record>
    insertRecord?: Record
    categoryColors?: Array<Category>
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
    searchFilterSub: Subscription | null = null
    columnFilter: Array<string> = [
        "key"
    ]
    handleRecordClick = (event: SyntheticEvent, record: Record | undefined): void => {
        console.log("books table record clicked")
        const { filteredData } = this.state
        event.preventDefault()
        console.log(record, event)
        if (filteredData && record != null) {
            publish(record)
            this.setState({
                selectedRecord: record
            })
        }
    }
    async loadData(): Promise<void> {
        const data = await api.getBooksBooksGet({ userKey: this.props.userFilter?.key })
        console.log(data)
        this.setState({
            data: data,
            filteredData: data
        })
    }
    loadCategoryColors = async (): Promise<void> => {
        const categories = await api.getCategoryCategoryGet()
        this.setState({
            categoryColors: categories
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadCategoryColors()
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
                const response = await api.dbPutBookBookPut({ book: BookFromJSON(insertRecord) })
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
    componentWillUnmount(): void {
        this.searchFilterSub?.unsubscribe()
    }
    getCategoryColor(value: string): string | undefined {
        const { categoryColors } = this.state
        if (categoryColors != null) {
            return categoryColors.find(el => el.name == value)?.color
        }
    }
    renderCol(col: string, value: string): React.ReactElement | string | null {
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
            cols = Object.keys(filteredData[0])
                .filter(el => !this.columnFilter.includes(el))
                .map(el => ({
                    title: bookI18N.get(el),
                    dataIndex: el,
                    key: el,
                    render: (text: string) => this.renderCol(el, text),
                }))
        }
        return <Table size="small" columns={cols} dataSource={filteredData} pagination={{ defaultPageSize: 100 }
        } onRow={(record) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, record),
                onClick: event => this.handleRecordClick(event, record),
            }
        }}></Table >

    }
}
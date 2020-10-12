import { Table } from "antd";
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { userI18N } from "../../i18n";
import { BookFromJSON, UserFromJSON } from "../../models";
import { searchFilterSubject } from "../Menu";


export interface IUsersTable {
    name?: string,
    filter?: string
}
type Record = {
    [index: string]: string | number
}
type TableState = {
    data?: Array<Record>,
    filteredData?: Array<Record>,
    insertRecord?: Record
    selectedRecord?: Record[]
}
const api = new DefaultBibler()

export const userTableSubject = new Subject<Record[]>()
const publish = (data: Record[]) => userTableSubject.next(data)

export class UsersTable extends React.Component<IUsersTable> {
    state: TableState = {
        data: [],
    }
    searchFilterSub = searchFilterSubject.subscribe(search => {
        console.log("filtering by: " + search)
        const regex = new RegExp(".*" + search + ".*")
        const filterdData = this.state.data?.filter(e => regex.test(Object.values(e)[0].toString()))
        this.setState({
            filterdData: filterdData
        })
    })
    loadData = async (): Promise<void> => {
        const data = await api.getUsersUsersGet()
        console.log(data)
        this.setState({
            data: data
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
    }
    componentWillUnmount() {
        this.searchFilterSub.unsubscribe()
    }
    handleRecordClick = (event: SyntheticEvent, index: number | undefined): void => {
        console.log("books table record clicked")
        const { data } = this.state
        event.preventDefault()
        if (data != null && index != null) {
            publish([data[index]])
            console.log(index, event)
            if (data && index != null) {
                this.setState({
                    selectedRecord: data[index]
                })
            }

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
    insertRecord = async (): Promise<void> => {
        const { insertRecord, data } = this.state
        if (insertRecord != null) {
            console.log(insertRecord)
            try {
                const response = await api.putUserUserPut({ user: UserFromJSON(insertRecord) })
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
    render(): JSX.Element {
        const { filteredData } = this.state
        let cols
        if (filteredData != null && filteredData.length > 0) {
            console.log(filteredData)
            cols = Object.keys(filteredData[0]).map(el => ({
                title: userI18N.get(el),
                dataIndex: el,
                key: el,
                //render: (text: string) => <a>{text}</a>,
            }))
        }
        return <Table columns={cols} dataSource={filteredData} onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, rowIndex),
                onClick: event => this.handleRecordClick(event, rowIndex),
            }
        }}></Table>
    }
}
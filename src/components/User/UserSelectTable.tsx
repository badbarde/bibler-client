import { Table } from "antd";
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { userI18N } from "../../i18n";
import { BookFromJSON, UserFromJSON } from "../../models";


export interface IUserSelectTable {
    name?: string,
    filter?: string
}
type Record = {
    [index: string]: string | number
}
type TableState = {
    data?: Array<Record>,
    insertRecord?: Record
    selectedRecord?: Record[]
}
const api = new DefaultBibler()

export const userSelectTableSubject = new Subject<Record[]>()
const publish = (data: Record[]) => userSelectTableSubject.next(data)

export class UserSelectTable extends React.Component<IUserSelectTable> {
    state: TableState = {
        data: [],
    }
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
        const { data } = this.state
        let cols
        if (data != null && data.length > 0) {
            console.log(data)
            cols = Object.keys(data[0]).map(el => ({
                title: userI18N.get(el),
                dataIndex: el,
                key: el,
                //render: (text: string) => <a>{text}</a>,
            }))
        }
        return <Table columns={cols} dataSource={data} rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                publish(selectedRows)
                this.setState({
                    selectedRecord: selectedRows
                })
            },
        }} ></Table>
    }
}
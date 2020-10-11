import { Table } from 'antd';
import React, { SyntheticEvent } from "react";
import { Subject } from "rxjs";

export const tableSubject = new Subject<Record>()

const publish = (data: Record) => tableSubject.next(data)

export interface ITable {
    name?: string,
    filter?: string
}
export interface Record {
    [index: string]: string | number
}
type TableState = {
    data?: Array<Record>,
    insertRecord?: Record,
    selectedRecord?: number
}
export abstract class BTable extends React.Component<ITable> {
    state: TableState = {
        data: []
    }
    columnI18N: Map<string, string>;
    constructor(props: Readonly<ITable>, i18n: Map<string, string>) {
        super(props)
        this.columnI18N = i18n
    }

    handleRecordClick = (event: SyntheticEvent, index: number | undefined): void => {
        const { data } = this.state
        event.preventDefault()
        console.log(index, event)
        if (data && index != null) {
            publish(data[index])
            this.setState({
                selectedRecord: index
            })
        }
    }
    render(): React.ReactNode {
        const { data } = this.state
        let cols
        if (data != null && data.length > 0) {
            console.log(data)
            cols = Object.keys(data[0]).map(el => ({
                title: this.columnI18N.get(el),
                dataIndex: el,
                key: el,
                render: (text: string) => <a>{text}</a>,
            }))
        }
        return <Table columns={cols} dataSource={data} onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, rowIndex)
            }
        }}></Table>
    }
}
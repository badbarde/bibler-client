import { Table } from "antd";
import React, { SyntheticEvent } from "react";
import { Subject, Subscription } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { userI18N } from "../../i18n";
import { User } from "../../models/User";
import { searchFilterSubject } from "../TitleBarMenu";
import { ExtendedUser } from "./UserCards";


export interface IUsersTable {
    name?: string,
    filter?: string
}
type Record = {
    [index: string]: unknown
}
type TableState = {
    data?: Array<ExtendedUser>,
    filteredData?: Array<ExtendedUser>,
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
    searchFilterSub: Subscription | null = null
    loadData = async (): Promise<void> => {
        const data = (await api.getUsersUsersGet()) as Array<[User, number]>
        console.log(data)
        this.setState({
            data: data.map(el => ({ user: el[0], borrowedBooks: el[1] }))
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
        this.searchFilterSub = searchFilterSubject.subscribe((search: string) => {
            console.log("filtering by: " + search)
            const regex = new RegExp(".*" + search + ".*")
            const filteredData = this.state.data?.filter(e => {
                return Object.values(e.user)
                    .some(i => i != null ? regex.test(i.toString()) : false)
            })
            this.setState({
                filteredData: filteredData
            })
        })
    }
    componentWillUnmount(): void {
        if (this.searchFilterSub != null) {
            this.searchFilterSub.unsubscribe()
        }
    }
    handleRecordClick = (event: SyntheticEvent, index: number | undefined): void => {
        const { filteredData } = this.state
        event.preventDefault()
        if (filteredData != null && index != null) {
            console.log("user: " + filteredData[index] + " selected")
            publish([filteredData[index].user as unknown as Record])
            console.log(index, event)
            if (filteredData && index != null) {
                this.setState({
                    selectedRecord: filteredData[index]
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
    mapExtendedUserToRecord(extendedUser: ExtendedUser): Record {
        return { ...extendedUser.user, borrowedBooks: extendedUser.borrowedBooks }
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
            cols = Object.keys(filteredData[0].user).concat(["borrowedBooks"]).map(el => ({
                title: userI18N.get(el),
                dataIndex: el,
                key: el,
                //render: (text: string) => <a>{text}</a>,
            }))
        }
        console.log("rendering: ", filteredData?.map(el => el.user as unknown as Record))
        return <Table columns={cols} dataSource={filteredData?.map(el => ({ ...(el.user as unknown as Record), borrowedBooks: el.borrowedBooks }))} onRow={(record, rowIndex) => {
            return {
                onDoubleClick: event => this.handleRecordClick(event, rowIndex),
                onClick: event => this.handleRecordClick(event, rowIndex),
            }
        }}></Table>
    }
}
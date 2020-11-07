import { LikeOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Space } from "antd";
import CSS from "csstype";
import React from "react";
import { GiBookCover } from "react-icons/gi";
import { Subject, Subscription } from "rxjs";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { User } from "../../models/User";
import { searchFilterSubject } from "../TitleBarMenu";


export interface ExtendedUser {
    user: User
    borrowedBooks: number

}
export interface UserCardsState {
    data: Array<ExtendedUser>
    filteredData: Array<ExtendedUser>
    selectedRecord?: ExtendedUser
}
interface IIconText {
    icon: React.ReactElement
    text: string
}
interface IListItem {
    key: number
    title: string
    icon: React.ReactElement
    avatar: string
    href: string
    description: string
    borrowedBooks: number
    content: React.ReactElement
    selected: boolean
}
const api = new DefaultBibler()

export const userCardsSubject = new Subject<ExtendedUser>()
const publish = (data: ExtendedUser) => userCardsSubject.next(data)
export class UserCards extends React.Component<unknown, UserCardsState> {
    state: UserCardsState = {
        data: [],
        filteredData: []
    }
    searchFilterSub: Subscription | null = null
    loadData = async (): Promise<void> => {
        const data = (await api.getUsersUsersGet()) as Array<[User, number]>
        console.log("UserCards loaded:", data)
        const mappedData = data.map(el => ({ user: el[0], borrowedBooks: el[1] }))
        this.setState({
            data: mappedData,
            filteredData: mappedData
        })
    }
    async componentDidMount(): Promise<void> {
        await this.loadData()
        this.searchFilterSub = searchFilterSubject.subscribe(this.filterData)
    }
    filterData = (search: string): void => {
        console.log("filtering by: " + search)
        const regex = new RegExp(".*" + search + ".*")
        const filteredData = this.state.data?.filter(e => {
            console.log("scanning: ", e)
            return Object.values(e.user)
                .some(i => i != null ? regex.test(i.toString()) : false)
        })
        console.log("filtered data: ", filteredData)
        this.setState({
            filteredData: filteredData
        })
    }
    componentWillUnmount(): void {
        this.searchFilterSub?.unsubscribe()
    }
    handleClick(userKey: number): void {
        const { data } = this.state
        if (data != null && userKey != null) {
            const selectedUser = data.find(el => el.user.key == userKey)
            if (selectedUser != null) {
                console.log(`user: ${selectedUser} selected`)
                publish(selectedUser)
                console.log(selectedUser)
                this.setState({
                    selectedRecord: selectedUser
                })
            }
        }
    }
    render(): JSX.Element {
        const IconText = ({ icon, text }: IIconText) => (
            <Space>
                {icon}
                {text}
            </Space>
        );
        console.log("rendering: ", this.state.filteredData)
        if (this.state.filteredData != null && this.state.filteredData.length != 0) {
            console.log("rendering: ", this.state.filteredData)
            const listData: Array<IListItem> = this.state.filteredData.map(el => ({
                key: el.user.key,
                avatar: "",
                content: <div></div>,
                description: el.user.classname != null ? el.user.classname : "",
                href: "",
                icon: <UserOutlined></UserOutlined>,
                title: el.user.firstname + " " + el.user.lastname,
                borrowedBooks: el.borrowedBooks,
                selected: this.state.selectedRecord != null ? this.state.selectedRecord.user.key == el.user.key : false
            }))
            return <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={listData}
                renderItem={item => {
                    const highlight: CSS.Properties = item.selected ? { backgroundColor: "lightgray" } : { backgroundColor: "white" }
                    return <List.Item
                        style={highlight}
                        onClick={() => this.handleClick(item.key)}
                        key={item.title}
                        actions={[
                            <IconText icon={<LikeOutlined />} text="0" key="list-vertical-like-o" />,
                            <IconText icon={<MessageOutlined />} text="0" key="list-vertical-message" />,
                            <IconText icon={<GiBookCover />} text={item.borrowedBooks.toString()} key="list-vertical-message" />,
                        ]}
                        extra={<div></div>}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} src={item.avatar} />}
                            title={<a onClick={() => this.handleClick(item.key)}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                }}
            />

        }
        return <Empty></Empty>
    }
}
import { Avatar, List } from "antd";
import React from "react";
import { DefaultBibler } from "../../apis/DefaultBibler";
import { User } from "../../models";

export interface UserCardsState {
    data: Array<User>
}
const api = new DefaultBibler()
export class UserCards extends React.Component {
    state: UserCardsState = {
        data: []
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
    render(): JSX.Element {
        return <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<>{item.firstname} {item.lastname}</>}
                        description={item._class}
                    />
                </List.Item>
            )}
        />
    }
}
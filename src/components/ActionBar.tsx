import { Menu } from 'antd';
import React, { ReactNode } from "react";

export interface Action {
    name: string,
    icon?: ReactNode,
    action: (event: any) => void,
}
export interface IActionBar {
    actions: Array<Action>
}
export class ActionBar extends React.Component<IActionBar> {
    state = {
        collapsed: false,
    };
    render(): JSX.Element {
        return <div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >
                {this.props.actions.map(el => <Menu.Item
                    key={el.name}
                    icon={el.icon}
                    onClick={el.action}>
                    <span style={{ paddingLeft: ".5rem" }}>{el.name}</span>
                </Menu.Item>)}
            </Menu>
        </div>
    }
}
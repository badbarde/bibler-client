import { Menu } from 'antd';
import React, { ReactNode } from "react";
// Copied from antd since its not importable
export interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}
// Copied from antd since its not importable
export declare type MenuClickEventHandler = (info: MenuInfo) => void;
export interface Action {
    name: string,
    icon?: ReactNode,
    action: (info: MenuInfo) => void,
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
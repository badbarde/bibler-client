import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Space } from "antd";
import React from "react";
import { GiBookshelf } from "react-icons/gi";
import { BehaviorSubject } from "rxjs";
import { ViewTypes } from "./ViewTypes";
const { Search } = Input;


export const viewTypeSubject = new BehaviorSubject<ViewTypes>(ViewTypes.CARD)

export const searchFilterSubject = new BehaviorSubject<string>("")

export class TitleBarMenu extends React.Component {
    state = {
        showAsTable: true,
        title: "Bibler",
        subtitle: "Bücherei App"
    }

    getViewTypeToggleIcon = (): React.ReactNode => {
        if (this.state.showAsTable) {
            return <TableOutlined style={{}} />
        }
        return <AppstoreOutlined style={{}} />
    }
    handleViewTypeToggle = (): void => {
        const { showAsTable } = this.state
        const viewType = showAsTable ? ViewTypes.TABLE : ViewTypes.CARD
        viewTypeSubject.next(viewType)
        this.setState({ showAsTable: !showAsTable })

    }
    onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const searchString = event.target.value
        console.log(`changes: ${searchString}`)
        searchFilterSubject.next(searchString)
    }
    onSearch = (searchString: string): void => {
        console.log(`seaching for: ${searchString}`)
        searchFilterSubject.next(searchString)
    }

    render(): React.ReactNode {
        return <PageHeader
            onBack={() => null}
            title={this.state.title}
            subTitle={this.state.subtitle}
            style={{ color: "white", backgroundColor: "white", paddingTop: ".5rem", paddingBottom: ".3rem" }}
            backIcon={<GiBookshelf size={30} />}
            extra={<div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
            }}>
                <div>
                    <Space>
                        <Button
                            type="text"
                            shape="circle"
                            size="large"
                        />
                        <h1 style={{ color: "white" }}>Bibler</h1>
                    </Space>

                </div>
                <div style={{
                    justifySelf: "end"
                }}>
                    <Space>
                        <Search
                            placeholder="Suchen"
                            size="large"
                            onChange={this.onSearchChanged}
                            onSearch={this.onSearch}
                        ></Search>
                        <Button
                            type="text"
                            shape="circle"
                            size="large"
                            onClick={this.handleViewTypeToggle}
                            icon={this.getViewTypeToggleIcon()}
                        ></Button>
                    </Space>
                </div>

            </div >}
        >

        </PageHeader>

    }
}
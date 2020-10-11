import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Space } from "antd";
import React from "react";
import { GiBookshelf } from "react-icons/gi";
import { Subject } from "rxjs";
import { ViewTypes } from "./ViewTypes";
const { Search } = Input;


export const viewTypeSubject = new Subject<ViewTypes>()

export const searchFilterSubject = new Subject<ViewTypes>()

export class Menu extends React.Component {
    state = {
        showAsTable: false,
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
    }
    onSearch = (searchString: string) => {
        console.log(`seaching for: ${searchString}`)
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
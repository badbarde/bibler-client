import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { ReactElement } from "react";
import { GiBackwardTime, GiBookCover, GiBookPile } from "react-icons/gi";
import { HiUserAdd } from 'react-icons/hi';
import { ActionBar } from "./components/ActionBar";
import { BooksView } from './components/Book/BooksView';
import { BorrowingUsersTable } from "./components/BorrowingUsersTable";
import { MainContentTypes } from './components/MainContentTypes';
import { Menu } from './components/Menu';
import { UsersView } from './components/User/UsersView';

const { Header, Footer, Sider, Content } = Layout;

interface BiblerState {
    mainContentType: MainContentTypes,
    mainContent: ReactElement,
}
export class Bibler extends React.Component {
    state: BiblerState = {
        mainContentType: MainContentTypes.BooksTable,
        mainContent: <BooksView key="BooksView"></BooksView>,
    }
    render(): React.ReactNode {
        const { mainContent } = this.state
        const actions = [
            {
                icon: <GiBookCover />,
                name: "Ausleihen",
                action: (e: any): void => {
                    console.log(e)
                    this.setState({
                        mainContent: <BooksView key="BooksView"></BooksView>
                    })
                }
            },
            {
                icon: <GiBackwardTime />,
                name: "Zurückgeben",
                action: (e: any): void => {
                    console.log(e)
                    this.setState({
                        mainContent: <UsersView key="UserList"></UsersView>
                    })
                }
            },
            {
                icon: <GiBackwardTime />,
                name: "fristen",
                action: (e: any): void => {
                    console.log(e)
                    this.setState({
                        mainContent: <BorrowingUsersTable key="BorrowingUsersTable"></BorrowingUsersTable>
                    })
                }
            },
            {
                icon: <GiBookPile />,
                name: "Buch hinzufügen",
                action: (e: any): void => {
                    console.log("Buch hinzufügen")
                },
            },
            {
                icon: <HiUserAdd />,
                name: "Beutzer*in hinzufügen",
                action: (e: any): void => {
                    console.log("Beutzer*in hinzufügen")
                }
            },
        ]
        return <Layout style={{ height: "100%" }}>
            <Header style={{ paddingInline: "0px" }}>
                <Menu></Menu>
            </Header>
            <Layout>
                <Sider>
                    <ActionBar actions={actions}></ActionBar>
                </Sider>
                <Content >{mainContent}</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>

    }
}
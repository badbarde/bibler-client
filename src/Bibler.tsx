import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { ReactElement } from "react";
import { GiBackwardTime, GiBookCover, GiBookPile } from "react-icons/gi";
import { HiUserAdd } from 'react-icons/hi';
import { AddBookForm } from './components/Book/AddBookForm';
import { AddBooksFileForm } from './components/Book/AddBooksFileForm';
import { BooksView } from './components/Book/BooksView';
import { BorrowBooksView } from './components/Book/BorrowBooksView';
import { BorrowingUsersTable } from "./components/BorrowingUsersTable";
import { MainContentTypes } from './components/MainContentTypes';
import { StatusBar } from './components/StatusBar';
import { TitleBarMenu } from './components/TitleBarMenu';
import { AddUserForm } from './components/User/AddUserForm';
import { AddUsersFileForm } from './components/User/AddUsersFileForm';
import { UsersView } from './components/User/UsersView';

const { Header, Footer, Sider, Content } = Layout;

interface BiblerState {
    mainContentType: MainContentTypes
    mainContent: ReactElement
    collapsed: boolean
}
export class Bibler extends React.Component {
    state: BiblerState = {
        mainContentType: MainContentTypes.BooksTable,
        collapsed: false,
        mainContent: <BooksView key="BooksView"></BooksView>,
    }
    render(): React.ReactNode {
        const { mainContent } = this.state
        return <Layout style={{ height: "100%" }}>
            <Header style={{ paddingInline: "0px" }}>
                <TitleBarMenu></TitleBarMenu>
            </Header>
            <Layout>
                <Sider
                    collapsed={this.state.collapsed}
                    width="30ch">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item
                            key="Ausleihen"
                            icon={<GiBookCover />}
                            onClick={(): void => {
                                this.setState({
                                    mainContent: <BorrowBooksView key={Date.now()}></BorrowBooksView>
                                })
                            }}>
                            <span style={{ paddingLeft: ".5rem" }}>{"Ausleihen"}</span>
                        </Menu.Item>
                        <Menu.Item
                            key="Alle Bücher"
                            icon={<GiBookCover />}
                            onClick={(): void => {
                                this.setState({
                                    mainContent: <BooksView key={Date.now()}></BooksView>
                                })
                            }}>
                            <span style={{ paddingLeft: ".5rem" }}>{"Alle Bücher"}</span>
                        </Menu.Item>
                        <Menu.Item
                            key="Zurückgeben"
                            icon={<GiBackwardTime />}
                            onClick={(): void => {
                                this.setState({
                                    mainContent: <UsersView key={Date.now()}></UsersView>
                                })
                            }}>
                            <span style={{ paddingLeft: ".5rem" }}>{"Zurückgeben"}</span>
                        </Menu.Item>
                        <Menu.Item
                            key="Fristen"
                            icon={<GiBackwardTime />}
                            onClick={(): void => {
                                this.setState({
                                    mainContent: <BorrowingUsersTable key={Date.now()}></BorrowingUsersTable>
                                })
                            }}>
                            <span style={{ paddingLeft: ".5rem" }}>{"Fristen"}</span>
                        </Menu.Item>
                        <SubMenu
                            key="Buch hinzufügen"
                            icon={<GiBookPile />}
                            title={<span style={{ paddingLeft: ".5rem" }}>{"Bücher hinzufügen"}</span>}
                        >
                            <Menu.Item
                                key="5"
                                onClick={(): void => {
                                    console.log("einzelnes Buch")
                                    this.setState({
                                        mainContent: <AddBookForm key={Date.now()}></AddBookForm>
                                    })
                                }} >Neues Buch</Menu.Item>
                            <Menu.Item
                                key="6"
                                onClick={(): void => {
                                    console.log("bulk import")
                                    this.setState({
                                        mainContent: <AddBooksFileForm key={Date.now()}></AddBooksFileForm>
                                    })
                                }} >Bücherliste</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="Benutzer hinzufügen"
                            icon={<HiUserAdd />}
                            title={<span style={{ paddingLeft: ".5rem" }}>{"Benutzer hinzufügen"}</span>}
                        >
                            <Menu.Item
                                key="7"
                                onClick={(): void => {
                                    console.log("Beutzer*in hinzufügen")
                                    this.setState({
                                        mainContent: <AddUserForm key={Date.now()}></AddUserForm>
                                    })
                                }} >Neuen Benutzer</Menu.Item>
                            <Menu.Item
                                key="8"
                                onClick={(): void => {
                                    console.log("bulk import")
                                    this.setState({
                                        mainContent: <AddUsersFileForm key={Date.now()}></AddUsersFileForm>
                                    })
                                }} >Benutzerliste</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content >{mainContent}</Content>
            </Layout>
            <Footer style={{ padding: ".3rem" }}><StatusBar></StatusBar></Footer>
        </Layout>

    }
}
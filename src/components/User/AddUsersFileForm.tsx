import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, message, Space } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import Dragger, { DraggerProps } from "antd/lib/upload/Dragger";
import React from "react";
import { BASE_PATH } from "../../runtime";


export class AddUsersFileForm extends React.Component {
    state = {
        loading: false
    }
    render(): JSX.Element {
        const props: DraggerProps = {
            name: 'file',
            action: '',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info: UploadChangeParam) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return <div className="borrow-form-workflow" style={{ padding: "1rem" }}>
            <Space direction="vertical">
                <Dragger style={{ padding: "1rem" }}{...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <h1>Benutzerliste importieren</h1>
                    <p>Wähle eine CSV datei mit Benutzern aus, die importiert werden sollen. </p>
                    <p>Stelle sicher, dass die Spalten wie folgt benannt sind:</p>
                    <ul>
                        <li>fistname </li>
                        <li>lastname</li>
                        <li>class</li>
                    </ul>
                </Dragger>
                <div>
                    <Button shape="round" type="primary" icon={<DownloadOutlined />} size="large">
                        <a style={{ color: "white" }} href={`${BASE_PATH}/users/export/csv`}>Download Benutzerliste</a>
                    </Button>
                </div>
            </Space>
        </div>
    }
}
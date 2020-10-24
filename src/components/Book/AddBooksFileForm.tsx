import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, message, Space } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import React from "react";
import { BASE_PATH } from "../../runtime";


export class AddBooksFileForm extends React.Component {
    state = {
        loading: false
    }
    render(): JSX.Element {
        const props = {
            name: 'file',
            action: `${BASE_PATH}/books/import/csv`,
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
        return <div style={{ padding: "1rem" }
        }>
            <Space direction="vertical">
                <Dragger style={{ padding: "1rem" }}{...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <h1>Bücherliste importieren</h1>
                    <p>Wähle eine CSV Datei mit Büchern aus, die importiert werden sollen. </p>
                    <p>Stelle sicher, dass die Spalten wie folgt benannt sind:</p>
                    <ul>
                        <li>title: Pflicht</li>
                        <li>author: Pflicht</li>
                        <li>publisher: Pflicht</li>
                        <li>category: Optional</li>
                        <li>shorthand: Pflicht</li>
                        <li>number: Pflicht</li>
                        <li>isbn: Optional</li>
                    </ul>
                </Dragger>
                <div>
                    <Button shape="round" type="primary" icon={<DownloadOutlined />} size="large">
                        <a style={{ color: "white" }} href={`${BASE_PATH}/books/export/csv`}>Download Bücherliste</a>
                    </Button>
                </div>
            </Space>
        </div >
    }
}
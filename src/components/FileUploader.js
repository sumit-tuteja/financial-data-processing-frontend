import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const FileUploaderComponent = (props) => {
    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{props.title}</p>
          <p className="ant-upload-hint">
            {props.subTitle}
          </p>
        </Dragger>
      </div>
    );
  };
  export default FileUploaderComponent;
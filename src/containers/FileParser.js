import React from "react";
import { useNavigate } from "react-router-dom";
import FileUploaderComponent from "../components/FileUploader";
import { message } from "antd";

const FileParser = () => {
  const navigate = useNavigate();
  const props = {
    name: "file",
    multiple: true,
    action: "http://localhost:3000/api/v1/fileparse",
    onChange(info) {
      const { status, response } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        navigate("/map-table", { state: { response } });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    title:'Upload Financial Data',
    subTitle:' Drag or Drop your excel file here or click to select.'
  };
  return (
    <div>
      <h1>Financial Data Processing</h1>
      <FileUploaderComponent {...props}/>
    </div>
  );
};
export default FileParser;

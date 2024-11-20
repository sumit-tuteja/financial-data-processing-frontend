import React, { useState, useEffect } from "react";
import { Table, Select, Button, message } from "antd";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const MapTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const fileParserResponse = location.state.response.firstColumnValues;

  useEffect(() => {
    if (fileParserResponse) {
      const responseDataArray = fileParserResponse.map((key, index) => {
        return {
          key: index,
          id: index,
          name: key,
        };
      });
      setTableData(responseDataArray);
    }
  }, [fileParserResponse]);

  const dropDownGaapOptions = [
    // Income Statement
    "Revenue",
    "Sales",
    "Net Revenue",
    "Total Revenue",
    "Cost of Sales",
    "Cost of Revenue",
    "COGS",
    "Gross Profit",
    "Gross Margin",
    "Operating Expenses",
    "Total Operating Expenses",
    "Operating Income",
    "Operating Profit",
    "EBIT",
    "Net Income",
    "Net Profit",
    "Net Earnings",

    // Balance Sheet - Assets
    "Current Assets",
    "Total Current Assets",
    "Cash and Cash Equivalents",
    "Cash",
    "Accounts Receivable",
    "AR",
    "Inventory",
    "Total Inventory",

    // Balance Sheet - Liabilities
    "Current Liabilities",
    "Total Current Liabilities",
    "Accounts Payable",
    "AP",
    "Short-term Debt",
    "Current Portion of Long-term Debt",

    // Balance Sheet - Equity
    "Total Equity",
    "Shareholders' Equity",
    "Retained Earnings",
    "Common Stock",
    "Share Capital",

    // Cash Flow
    "Cash from Operating Activities",
    "Operating Cash Flow",
    "Cash from Investing Activities",
    "Investing Cash Flow",
    "Cash from Financing Activities",
    "Financing Cash Flow",
  ];

  const handleSelectChange = (id, name, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const isNextButtonEnabled = Object.values(userInputs).some(
    (value) => value !== ""
  );

  const handleNext = async () => {
    const fileName = location.state.response.fileName;
    const mapList = userInputs;
    const payload = {
      mapList,
      fileName,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/map-values", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit data");
      const result = await response.json();
      navigate("/final-table", { state: { result } });
      message.success("Data is successfully added to process");
    } catch (error) {
      message.error("Failed to submit data.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "GAAP Labels",
      key: "dropdown",
      render: (_, record) => (
        <Select
          value={userInputs[record.name] || ""}
          onChange={(value) =>
            handleSelectChange(record.id, record.name, value)
          }
          style={{ width: 200 }}
        >
          {dropDownGaapOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      ),
    },
  ];
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Map Financial Labels</h2>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        bordered
      />
      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={handleNext}
        disabled={!isNextButtonEnabled}
      >
        Next
      </Button>
    </div>
  );
};

export default MapTable;

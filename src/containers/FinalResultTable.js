import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useLocation } from 'react-router-dom';



const FinalResultTable = () => {
    const location = useLocation();
    const finalData = location.state.result;
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (finalData) {
      //this can be dynamic
      //due to time constraints just hardcoding this and column and work for the sample sheet.
      const responseDataArray = finalData.map((key, index) => {
        return {
          'key':index,
          'id':index,
          'name': key.__EMPTY,
          'jan': key['1/31/24'],
          'feb':key['2/29/24'],
          'march':key['3/31/24'],
          'april':key['4/30/24']
          };
      });
      setTableData(responseDataArray);
    }
  }, [finalData]);

  // Define table columns
  const columns = [
    {
      title: 'GAAP Label',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>,
    },
    {
        title: 'Jan',
        dataIndex: 'jan',
        key: 'jan',
        render: (text) => <b>{text?.toLocaleString()}</b>,
      },
      {
        title: 'Feb',
        dataIndex: 'feb',
        key: 'feb',
        render: (text) => <b>{text?.toLocaleString()}</b>,
      },
      {
        title: 'March',
        dataIndex: 'march',
        key: 'march',
        render: (text) => <b>{text?.toLocaleString()}</b>,
      },
      {
        title: 'April',
        dataIndex: 'april',
        key: 'april',
        render: (text) => <b>{text?.toLocaleString()}</b>,
      },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false} 
        bordered
      />
    </div>
  );
};

export default FinalResultTable;

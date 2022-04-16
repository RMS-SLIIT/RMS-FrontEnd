import React from "react";
import { Table, Row, Col, Space } from "antd";

const CustomTable = (props) => {
  const {
    columns,
    dataSource,
    components,
    title,
    addForm,
    size,
    home,
    manageArea,
    pagination,
    onChange,
    expandedRowRender,
    expandable,
    defaultExpandAllRows,
    onExpand,
    onExpandedRowsChange,
    expandedRowKeys,
    style,
    scroll,
    onRow,
    rowSelection,
  } = props;

  return (
    <Table
      defaultExpandAllRows={defaultExpandAllRows}
      onExpand={onExpand}
      onExpandedRowsChange={onExpandedRowsChange}
      expandedRowKeys={expandedRowKeys}
      expandable={expandable}
      expandedRowRender={expandedRowRender}
      columns={columns}
      pagination={pagination}
      dataSource={dataSource}
      onChange={onChange}
      size={size}
      components={components}
      style={style}
      scroll={scroll}
      onRow={onRow}
      rowSelection={rowSelection}
    />
  );
};

export default CustomTable;

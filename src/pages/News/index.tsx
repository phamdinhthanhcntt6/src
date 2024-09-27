import { IDataNews } from "@/pages/News/data";
import { onDeleteNews, queryListNews } from "@/pages/News/services";
import ErrorUtils from "@/utils/ErrorUtils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Avatar, Button, Col, Input, Modal, Row, message } from "antd";
import _, { get } from "lodash";
import React, { useRef, useState } from "react";
import { FormattedMessage, history, useIntl } from "umi";

const NewPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const [search, setSearch] = useState<string>();

  const confirmRemoveItem = (id: string) => {
    Modal.confirm({
      title: formatMessage({ id: "common.confirm_delete" }),
      content: formatMessage({ id: "common.content_delete" }),
      onOk: () => {
        handleRemove(id);
      },
      okText: formatMessage({ id: "common.confirm" }),
      cancelText: formatMessage({ id: "common.cancel" }),
      okButtonProps: { danger: true },
    });
  };

  const handleRemove = async (id: string) => {
    const hide = message.loading(formatMessage({ id: "common.processing" }));
    try {
      await onDeleteNews(id);
      message.success(formatMessage({ id: "common.delete_success" }));
      setTimeout(() => {
        actionRef.current?.reload();
      }, 500);
      hide();
    } catch (error) {
      hide();
      message.error(ErrorUtils.parseError(error));
    }
  };

  const columns: ProColumns<IDataNews>[] = [
    {
      title: <FormattedMessage id="news.title" />,
      render: (_, record) => {
        return "";
      },
      width: 150,
    },
    {
      title: <FormattedMessage id="news.image" />,
      render: (_, record) => {
        return <Avatar size={100} shape="square" src="" />;
      },
      width: 100,
      align: "center",
    },
    {
      title: <FormattedMessage id="news.description" />,
      render: (_, record) => {
        return "";
      },
      width: 200,
    },
    {
      title: "",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <EditOutlined
          style={{ color: "#1890FF" }}
          key={`edit_${record.id}`}
          onClick={() => {
            history.push(`/news/edit/${get(record, "id")}`);
          }}
        />,
        <DeleteOutlined
          key={`delete_${record.id}`}
          style={{ color: "#F5222D" }}
          onClick={() => confirmRemoveItem(record.id!)}
        />,
      ],
      search: false,
      hideInSetting: true,
      width: 70,
      align: "right",
      fixed: "right",
    },
  ];

  const handleSearch = _.debounce((e: any) => {
    const { value } = e.target;
    setSearch(value || undefined);
    setTimeOutFilter();
  }, 500);

  const setTimeOutFilter = () => {
    setTimeout(() => {
      if (actionRef.current?.reloadAndRest) {
        actionRef.current?.reloadAndRest!();
      } else {
        actionRef.current?.reload();
      }
    }, 100);
  };

  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          key="add"
          onClick={() => {
            history.push(`/news/create`);
          }}
        >
          {formatMessage({ id: "common.create" })}
        </Button>
      }
    >
      <ProTable<IDataNews>
        actionRef={actionRef}
        rowKey="id"
        locale={{
          emptyText: formatMessage({ id: "common.emptyText" }),
        }}
        columns={columns}
        search={false}
        options={false}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        tableAlertOptionRender={false}
        tableAlertRender={false}
        request={(params, sorter, filter) =>
          queryListNews({
            ...params,
            sorter,
            filter,
            keyword: search,
          })
        }
        className="toolbar-filter-table"
        toolbar={{
          multipleLine: true,
          filter: (
            <Row className="mb-24">
              <Col span={10}>
                <Input.Search
                  style={{ width: "100%" }}
                  placeholder={formatMessage({ id: "common.search" })}
                  onChange={handleSearch}
                  allowClear
                />
              </Col>
            </Row>
          ),
        }}
        scroll={{ x: "max-content" }}
        bordered
      />
    </PageContainer>
  );
};

export default NewPage;

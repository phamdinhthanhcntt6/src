import { PageContainer } from "@ant-design/pro-layout";
import { Row } from "antd";
import React from "react";

const DashboardPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <Row gutter={16}></Row>
    </PageContainer>
  );
};

export default DashboardPage;

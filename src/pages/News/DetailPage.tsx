import { onCreateNews, onUpdateNews } from "@/pages/News/services";
import { defaultValidateMessages } from "@/utils/messages";
import ProForm, { ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import { Card, Col, Collapse, FormInstance, Row, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { history, useIntl, useParams } from "umi";
const { Panel } = Collapse;

const DetailPage: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      onGetDetailNews(id);
    }
  }, [id]);

  const onGetDetailNews = async (id: string) => {};

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const params = {
        ...values,
      };

      if (id) {
        await onUpdateNews({ ...params, id });
      } else {
        await onCreateNews(params);
      }

      notification.success({
        message: formatMessage({ id: "common.success" }),
      });
      history.push("/news");

      setLoading(false);
      return true;
    } catch (error) {
      notification.error({ message: error.message });
      setLoading(false);
      return false;
    }
  };

  return (
    <PageContainer>
      <Col lg={24}>
        <Card>
          <ProForm
            formRef={formRef}
            className="horizontal-form-item collapse-leave-type"
            onFinish={(values) => {
              onSubmit(values);
              return Promise.resolve();
            }}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              submitButtonProps: {
                loading,
                style: { width: "150px" },
              },
              onReset: async () => {
                history.goBack();
              },
              searchConfig: {
                submitText: formatMessage({ id: "common.save" }),
                resetText: formatMessage({ id: "common.cancel" }),
              },
            }}
            validateMessages={defaultValidateMessages}
          >
            <Row justify="center">
              <Col xl={24} xxl={20}>
                <Collapse defaultActiveKey={["NEWS"]} ghost>
                  <Panel header={formatMessage({ id: "menu.news" })} key="NEWS">
                    <ProFormText
                      name="title"
                      label={formatMessage({ id: "news.title" })}
                      fieldProps={{
                        placeholder: formatMessage({ id: "news.title" }),
                        style: { width: "100%" },
                      }}
                      rules={[{ whitespace: true, required: true }]}
                    />

                    <ProFormTextArea
                      name="description"
                      label={formatMessage({ id: "news.description" })}
                      fieldProps={{
                        placeholder: formatMessage({ id: "news.description" }),
                        style: { width: "100%" },
                      }}
                      rules={[{ whitespace: true, required: true }]}
                    />

                    <ProFormText
                      name="url"
                      label={formatMessage({ id: "news.url" })}
                      fieldProps={{
                        placeholder: formatMessage({
                          id: "news.url_placeholder",
                        }),
                        style: { width: "100%" },
                      }}
                      rules={[
                        { whitespace: true, required: true, type: "url" },
                      ]}
                    />
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </ProForm>
        </Card>
      </Col>
    </PageContainer>
  );
};

export default DetailPage;

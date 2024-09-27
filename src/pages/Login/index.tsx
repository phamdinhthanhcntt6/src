import { IFormLogin } from "@/pages/Login/data";
import Storage, { STORE_KEYS } from "@/utils/Storage";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-form";
import { notification } from "antd";
import React, { useState } from "react";
import { history, useIntl } from "umi";
import styles from "./index.less";

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { formatMessage } = useIntl();

  const handleSubmit = async (values: IFormLogin) => {
    setLoading(true);
    try {
      const MyToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWU3NjZmMGMtNjg2Zi00ZjI4LWIyZjQtOGE0N2I4MTZiMWY0IiwiZ3JhbnRfdHlwZSI6ImFjY2Vzc190b2tlbiIsImlhdCI6MTcyNzM2MzYwMSwiZXhwIjoxNzI3NDUwMDAxLCJpc3MiOiJsaWNobmh1eS52biJ9.dhCYrNUaMOOYCS-GMXPGnbYNFWj5Gy_qMed-OqtMxCewzP26a2M7WJ7vsttS4LaHuXAZ_qrgG8JkR1mFH1Vfw2p2rFSl5DVA2F1uxs0xt8RRRBwUjGLmqwY6IesIxKjrkcSl1w2BZ7u3Xml3qfXuGCKDhRWih3UBczq6LDpvOTCOGCWkDEn_vLF653DcRTau8EPkJ0hUkJfse_ce9OR9dut9zYhvEXODxH4RwdZ_ng9vGBEVgnkVPMmn9aBM547mVguMcRTSWy4l4CUhjV8K7nJVfBvPGGm-4bUfcodKyEXQid4GFnpBuDWUPz2-Nu3oaBa-drg41gNjwY55e4Wp7cMKSU2DyBE_Rcw-3ogu1n4eehdrSXuIXo0nAzhx8dUjV7aa7fOiWuzI33ZaWnx3FsnnYYmCO8HKIdXg8shvWgJ5Wvd1_IxDvLh5ddpiZb8n8koQgzErJXcklUJ8ksWI9tcPDDgoYBeti-Qm9DtfPB0xpYpAk3UACg8E9y1fjJbnbFQF7WHxEY0CssunjGM9KavI-PvsOoM0BFzRH54k-VQrNcPwW2JqagKs6XO5hxJNyy4fxLTsOWmGkuR9pes1wiHltl8d-lrpKCH9DtepEhzgWV-vAa7dt0alokK7BPOO-s5eJs87YJqUyVkdGMMXa1kmau0-A809FSmys9tc1Dk`;

      const dataMock = {
        user_data: {
          id: "9e766f0c-686f-4f28-b2f4-8a47b816b1f4",
          name: "admin",
          avatar: null,
          username: "admin",
          password:
            "$2a$12$y3Gdm7QAEXFNWtWFrFq/luns6cgZ9mHeKVD1zXMSCPGw0UyaNqwBu",
          created_at: "2024-09-24T04:13:47.490Z",
          updated_at: "2024-09-24T04:13:47.490Z",
          deleted_at: null,
        },
        access_token: MyToken,
      };

      if (dataMock) {
        Storage.set(`${STORE_KEYS.USER_TOKEN}`, dataMock);
      }

      //   const res = await loginCMS(values);

      //   if (get(res, "data")) {
      //     Storage.set(`${STORE_KEYS.USER_TOKEN}`, get(res, "data"));
      //   }
      history.replace("/");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: "Tài khoản hoặc mật khẩu không đúng!" });
    }
  };

  return (
    <div className={styles.rightContainer}>
      <div className={styles.formLogin}>
        <div className={styles.title}>
          {" "}
          {formatMessage({ id: "login.title" })}{" "}
        </div>
        <div className={styles.content}>
          {" "}
          {formatMessage({ id: "login.welcome" })}{" "}
        </div>

        <LoginForm
          contentStyle={{
            minWidth: "100%",
          }}
          onFinish={async (values) => {
            await handleSubmit(values as IFormLogin);
          }}
          submitter={{
            submitButtonProps: {
              loading,
            },
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={formatMessage({ id: "login.username" })}
            rules={[
              {
                required: true,
                whitespace: true,
                message: formatMessage({ id: "login.username_required" }),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={formatMessage({ id: "login.password" })}
            rules={[
              {
                required: true,
                whitespace: true,
                message: formatMessage({ id: "login.password_required" }),
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};

export default React.memo(LoginScreen);

import { ConnectState } from "@/models/connect";
import type { CurrentUser } from "@/models/user";
import { STORE_KEYS } from "@/utils/Storage";
import VarHelper from "@/utils/VarHelper";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { get } from "lodash";
import React from "react";
import { Dispatch, connect, useIntl } from "umi";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

interface Props {
  currentUser: CurrentUser;
  dispatch: Dispatch;
}

const AvatarDropdown: React.FC<Props> = (props) => {
  const { dispatch } = props;
  const { formatMessage } = useIntl();
  const userInfo = localStorage.getItem(STORE_KEYS.USER_TOKEN);

  const onLogout = () => {
    if (dispatch) {
      dispatch({
        type: "login/logout",
      });
    }
  };

  const MenuComponent = () => (
    <div className={styles.menuInfo}>
      <div className={styles.listAction}>
        <div onClick={onLogout} className={styles.itemAction}>
          <LogoutOutlined style={{ color: "#8C8C8C" }} />{" "}
          {formatMessage({ id: "common.logout" })}
        </div>
      </div>
    </div>
  );

  return (
    <HeaderDropdown
      overlay={
        // @ts-ignore
        <Menu className={styles.menu} selectedKeys={[]} style={{ width: 250 }}>
          <MenuComponent />
        </Menu>
      }
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size={32}
          className={styles.avatar}
          style={{
            background: `${VarHelper.stringToColour(
              get(JSON.parse(userInfo), "user_data.name")
            )}`,
          }}
        >
          Admin
        </Avatar>
        <span className={`${styles.name} anticon`}>
          {get(JSON.parse(userInfo), "user_data.name")}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);

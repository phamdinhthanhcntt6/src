import User from "@/services/User";
import { Modal } from "antd";
import { history } from "umi";
import TimeHelper from "./TimeHelper";
import Storage, { STORE_KEYS } from "@/utils/Storage";
const qs = require("qs");

class RequestHelper {
  DOMAIN = REACT_APP_API;
  DOMAIN_UPLOAD = this.DOMAIN + "/v1/cms/upload/file";
  token = "";

  setToken = (token: string) => (this.token = token);
  setDomain = (data: string) => {
    this.DOMAIN = data;
  };
  makeSignature = (data: any) => {
    return data;
  };

  stringify = (obj: any) => {
    return JSON.stringify(obj);
  };

  imgUrl = (path: string) =>
    path && path.indexOf("http") === 0 ? path : `${this.DOMAIN}/${path}`;

  querify = (url: string, queryObject: any) => {
    let newUrl = url;
    if (queryObject === undefined) return newUrl;
    newUrl += `?${qs.stringify(queryObject)}`;
    return newUrl;
  };

  getAuthenHeaders = () => {
    return {
      authorization: `Bearer ${
        Storage.get(`${STORE_KEYS.USER_TOKEN}`)?.access_token
      }`,
    };
  };

  handleException = async (res: any) => {
    TimeHelper.runOnceIn(
      "API_EXCEPTION",
      1000
    )(() => {
      switch (res.exception_code) {
        case 1002:
          Modal.confirm({
            content: "Phiên làm việc hết hạn, vui lòng đăng nhập lại",
            onOk: () => {
              history.replace("/user/login");
              // TODO Logout
            },
            okText: "OK",
            okButtonProps: { danger: true },
            cancelButtonProps: { hidden: true },
          });
          break;
        case 1003:
          User.refreshToken();
          break;
        default:
          break;
      }
    });
    throw res;
  };

  get = async ({ url = "", data = {}, headers = {} }) => {
    const apiUrl = this.querify(
      this.DOMAIN + url,
      !data || Object.keys(data).length === 0
        ? this.makeSignature({})
        : this.makeSignature(data)
    );
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${
          Storage.get(`${STORE_KEYS.USER_TOKEN}`)?.access_token
        }`,
        ...headers,
      },
    });
    let res = await response.json();
    if (!res || res.signal !== 1) {
      await this.handleException(res);
    }
    return res;
  };

  post = async ({ url = "", data = {}, headers = {} }) => {
    const response = await fetch(this.DOMAIN + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${
          Storage.get(`${STORE_KEYS.USER_TOKEN}`)?.access_token
        }`,
        ...headers,
      },
      body: this.stringify(this.makeSignature(data)),
    });
    let res = await response.json();

    if (!res || res.signal !== 1) {
      await this.handleException(res);
    }
    return res;
  };

  put = async ({ url = "", data = {}, headers = {} }) => {
    const response = await fetch(this.DOMAIN + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${
          Storage.get(`${STORE_KEYS.USER_TOKEN}`)?.access_token
        }`,
        ...headers,
      },
      body: this.stringify(this.makeSignature(data)),
    });
    let res = await response.json();
    if (!res || res.signal !== 1) {
      await this.handleException(res);
    }
    return res;
  };

  delete = async ({ url = "", data = {}, headers = {} }) => {
    const apiUrl = this.querify(
      this.DOMAIN + url,
      !data || Object.keys(data).length === 0
        ? this.makeSignature({})
        : this.makeSignature(data)
    );
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${
          Storage.get(`${STORE_KEYS.USER_TOKEN}`)?.access_token
        }`,
        ...headers,
      },
    });
    let res = await response.json();
    if (!res || res.signal !== 1) {
      await this.handleException(res);
    }
    return res;
  };
}

export default new RequestHelper();

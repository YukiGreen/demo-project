/**
 * 该文件是对axios请求进行typescript的封装
 */
import Constant from './control.json'; // 常量配置
import LoaderAxios from './MyAxios'; // 封装好的Axios请求
import * as queryString from 'query-string';
import { ResResult } from 'resResult';
// 下面注释的这三行用于下载的请求
// import Tools from "./tools";
// import FileSaver from "file-saver";
// import Fetch from "isomorphic-fetch";

class HttpClientHelper<T> {
  /**
   * http的get方法
   * @param url
   * @param {object} query url的string parameter, 传对象
   * @param {object} h 头部, 传对象
   * @param callback
   * @returns {*|Promise<ResResult>}
   */
  public get = (
    { url, query, h }: { url: string; query?: object; h?: object },
    callback?: (res: ResResult<T>) => any,
  ) => {
    url = query ? `${url}?${queryString.stringify(query)}` : url;
    return LoaderAxios.invokeAPI(url, 'GET', undefined, h || Constant.DEFAULTHEADERS, callback);
  };

  /**
   * http的post方法
   * @param {string} url
   * @param {object} query, url的string parameter
   * @param {object} data, 请求的body内容
   * @param {object} h, 头部, 传对象
   * @param callback
   * @returns {*|Promise<ResResult>}
   */
  public post = (
    { url, query, data, h }: { url: string; query?: object; data: object; h?: object },
    callback?: (res: ResResult<T>) => any,
  ) => {
    url = query ? `${url}?${queryString.stringify(query)}` : url;
    return LoaderAxios.invokeAPI(url, 'POST', data, h || Constant.DEFAULTHEADERS, callback);
  };

  /**
   * http的put方法
   * @param url
   * @param {object} query, url的string parameter
   * @param {object} data, 请求的body内容
   * @param {object} h, 头部, 传对象
   * @param callback
   * @returns {*|Promise<ResResult>}
   */
  public put = (
    { url, query, data, h }: { url: string; query?: object; data: object; h?: object },
    callback?: (res: ResResult<T>) => any,
  ) => {
    url = query ? `${url}?${queryString.stringify(query)}` : url;
    return LoaderAxios.invokeAPI(url, 'PUT', data, h || Constant.DEFAULTHEADERS, callback);
  };

  /**
   * http的delete方法
   * @param url
   * @param {object} query, url的string parameter
   * @param {object} data, 请求的body内容
   * @param {object} h, 头部, 传对象
   * @param callback
   * @returns {*|Promise<ResResult>}
   */
  public delete = (
    { url, query, data, h }: { url: string; query?: object; data?: object; h?: object },
    callback?: (res: ResResult<T>) => any,
  ) => {
    url = query ? `${url}?${queryString.stringify(query)}` : url;
    return LoaderAxios.invokeAPI(url, 'DELETE', data, h || Constant.DEFAULTHEADERS, callback);
  };
  // 下载文件这个先注释，稍后再放出来
  // public downLoadFile = (
  //   url: string,
  //   {
  //     method,
  //     headers,
  //     params,
  //     body,
  //     filename,
  //     callback,
  //     downLoadLog
  //   }: {
  //     method: string;
  //     headers?: { [key in keyof string]: any };
  //     params?: queryString.ParsedQuery;
  //     body?: any;
  //     filename?: string;
  //     callback?;
  //     downLoadLog?: string; // 是否是日志下载
  //   }
  // ) => {
  //   const tokens = localStorage.getItem("access_token");
  //   if (params) {
  //     url += `?${queryString.stringify(params)}`;
  //   }
  //   const req = {
  //     method,
  //     headers: Object.assign(Tools.getHeader(tokens), headers),
  //     body: JSON.stringify(body)
  //   };

  //   // req.headers['Content-Type'] = 'application/json;charset=UTF-8';
  //   // 假设后端提供以json格式导出配置文件的接口为"/get/setting/file?type=json"
  //   Fetch(url, req)
  //     .then(async response => {
  //       // 已经下载文件成功
  //       const myStatus = response.status;
  //       let errorMessage;

  //       if (myStatus !== 200) {
  //         // 要登录
  //         if (myStatus === 403) {
  //           // 判断日志下载,区分日志下载403和其他文件下载403的拦截提示信息
  //           if (downLoadLog === "downLoadLog") {
  //             let res = await response.text();
  //             errorMessage = res;
  //           } else {
  //             // errorMessage = i18n.lackOfCompetence;
  //             errorMessage = "无权限访问";
  //           }
  //         } else if (response.status === 404) {
  //           // errorMessage = i18n.nullUrlTips;
  //           errorMessage = "你所访问的资源不存在";
  //         } else {
  //           errorMessage = `error：${response.status}`;
  //         }
  //         callback && callback(response, errorMessage);
  //         return;
  //       }
  //       const disposition = response.headers.get("content-disposition");
  //       const requestType = response.headers.get("Content-type");
  //       const isCheckJosnType = RegExp(/(application\/json)/).test(requestType);
  //       if (disposition && disposition.match(/attachment/)) {
  //         filename = disposition
  //           .replace(/attachment;.*filename=/, "")
  //           .replace(/"/g, "");
  //         filename = filename && filename !== "" ? filename : "file";
  //       }
  //       response
  //         .blob()
  //         .then(blob => {
  //           console.log("blob", blob);
  //           FileSaver.saveAs(blob, filename);
  //           if (callback) {
  //             if (isCheckJosnType) {
  //               response.json().then(data => {
  //                 data ? callback && callback(data, errorMessage) : "";
  //               });
  //             } else {
  //               callback && callback(response, errorMessage);
  //             }
  //           }
  //         })
  //         .catch(err => {
  //           callback && callback(response, err);
  //         });
  //     })
  //     .catch(res => {
  //       if (callback) {
  //         callback(res);
  //       }
  //     });
  // };
}

export default new HttpClientHelper();

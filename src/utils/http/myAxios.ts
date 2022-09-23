'use strict';
import Controls from './controls.json';
import { LocalDomainHelper } from '@/utils';
import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';
import API from '../services/login/API';
import config from '../utils/config';
import InvalidToken from './InvalidToken';
import loaderJson from './loaderJson';
import Tools from './Tools';
import i18ns from 'DEMO-vue-ui/i18ns';

// import domainStatus from '../../views/platformManagement/domain/statusColor';
// import { urlRootPath } from '@/utils/urlHelper';

// 返回的状态码
let successCode = '200';

class MyAxios {
  invokeAPI() {
    // 使用参数顺序：url, method, data = {}, headers = {}
    const _arguments = arguments;
    return new Promise((resolve, reject) => {
      this.checkOutToken(_arguments, resolve, reject);
    });
  }

  checkOutToken(_arguments, resolve, reject) {
    this.core.apply(this, _arguments).then(
      (res) => resolve(res),
      (res) => reject(res),
    );
  }

  core(url, method, data, headers, callback, noMsg = false) {
    let isJson = _.endsWith(url, '.json');
    if (isJson) {
      return loaderJson.loadUrl(url);
    }

    let fetchOpt = {
      method: method,
      headers: headers,
    };
    let selfParams = data ? Tools.queryParams(data, true) : '';
    if (/^get$/i.test(fetchOpt.method)) {
      url += selfParams;
    }
    fetchOpt['url'] = url;
    // 创建实例
    const instance = axios.create({
      timeout: Controls.timeout,
      headers: fetchOpt.headers,
    });
    return instance({
      url: fetchOpt.url,
      method: fetchOpt.method.toLowerCase(),
      data: data,
    })
      .catch((resp) => {
        debugger;
        const { response } = resp;
        let errorMessage = '';
        if (response && response.status && response.status === 401) {
          errorMessage = `error：用户验证失败，将退出重新登录！`;
          Message({
            message: errorMessage,
            type: 'error',
            duration: 2 * 1000,
            onClose: () => {
              Tools.backupLogin();
            },
          });
          // 无权限跳出登录
          Tools.backupLogin();
          return Promise.reject(resp);
        } else if (response && response.status && response.status === 403) {
          errorMessage = `error：您下一步操作没有权限，请使用有权限的账户登录!`;
          Message({
            message: errorMessage,
            type: 'error',
            duration: 10 * 1000,
            showClose: true,
            onClose: () => {
              // 无权限跳出登录
              // Tools.backupLogin();
              return Promise.reject(resp);
            },
          });
        } else if (callback) {
          const result = callback(response);
          return {
            isExecuteCallback: true,
            result: result || Promise.resolve(response),
          };
        } else {
          return Promise.reject(resp);
        }
      })
      .then((res) => {
        debugger;
        if (res && res.status && res.data && res.data.code === 503) {
          Message.error({
            showClose: true,
            message: res.data.msg,
            type: 'error',
          });
        } else if (res && !res.isExecuteCallback && callback) {
          const result = callback(res);
          return result || Promise.resolve(res);
        } else if (this.isFailed(res)) {
          // Message.error({
          //   showClose: true,
          //   message: res.data.msg || res.data.message || '系统错误！',
          //   type: 'error',
          // });
          // const e = {response:res ,message:`Request failed with DEMO status code ${res.data.code}, reason: ${res.data.msg}'`};
          // console.warn(e);
          // return e
          // throw Error( res.data.msg || res.data.message || '系统错误！');
          const e = new Error(res.data.msg || res.data.message || '系统错误！');
          e.response = res;
          throw e;
        } else {
          return res && res.data;
        }
      })
      .catch((res) => {
        const { response } = res;
        debugger;

        if (response && this.isFailed(response)) {
          Message.error({
            showClose: true,
            message: `${i18ns.t('optionFailure')} ${response.data.msg || response.data.message || '系统错误！'}`,
            type: 'error',
          });
        } else {
          if (res.message.indexOf('403') !== -1) {
            Message({
              message: '您下一步操作没有权限，请使用有权限的账户登录!',
              type: 'error',
              duration: 10 * 1000,
              showClose: true,
              onClose: () => {
                return Promise.reject(res);
              },
            });
          } else {
            if (!noMsg) {
              Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
                onClose: () => {
                  return Promise.reject(res);
                },
              });
            }
          }
        }
      });
  }

  isFailed(resp) {
    // res.data.code 不存在，说明是edsp以外的响应数据，应当为正常
    return resp && resp.data && resp.data.code && parseInt(resp.data.code) !== parseInt(successCode);
  }
}

export default new MyAxios();

/**
 * 根据url动态加载json
 */

class DynaLoadeJson {
  loadUrl(url = '') {
    let start;
    let result;
    let splitUrl = url;
    if (!url) {
      return '';
    } else {
      if (url.substr(0, 1) === '/') {
        splitUrl = url.slice(1);
      }
      start = splitUrl.indexOf('.json');
      if (start > -1) {
        result = splitUrl.substring(0, start);
        return import(`@/${result}.json`);
      }
      return '';
    }
  }
}

export default new DynaLoadeJson();

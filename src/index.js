export default {

  configure(options) {
    if(!options.url) {
      throw 'url not setted';
    }
    if(!options.appid) {
      throw 'appid not setted';
    }
    if(!options.projectid) {
      throw 'projectid not setted';
    }

    this.options = options;

    window.onerror = (msg, url, line, column, errorObj) =>
      this.log(msg, {
        url,
        line,
        column,
        level: 'error',
        stack: JSON.stringify(errorObj)
      });
  },

  extendData(meta) {
    return Object.assign({
      projectid: this.options.projectid,
      appid: this.options.appid
    }, meta);
  },

  log(message, meta) {
    const xhr = new XMLHttpRequest();

    xhr.open('post', this.options.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({
      message,
      meta: this.extendData(meta)
    }));
  }
}

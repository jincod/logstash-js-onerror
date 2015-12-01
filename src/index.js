export default {

  configure(options) {
    if(!options.url) {
      throw 'url not setted';
    }
    if(!options.projectName) {
      throw 'projectName not setted';
    }
    if(!options.projectId) {
      throw 'projectId not setted';
    }

    this.options = options;

    window.onerror = (msg, url, line, column, errorObj) =>
      this.log({url, msg: `${msg} ${line} ${column} ${JSON.stringify(errorObj)}`});
  },

  extendData(data) {
    const level = data.level || 'ERROR';

    return `${new Date().toISOString()}|${this.options.projectName}|
      ${this.options.projectId}|0|${level}|${data.url}|${data.msg}`;
  },

  log(data) {
    fetch(this.options.url, {
      method: 'post',
      body: this.extendData(data)
    });
  }
}
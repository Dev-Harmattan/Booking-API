import util from '../helpers/util.js';

class Template {
  constructor() {
    this.status = 0;
    this.userMessage = '';
    this.developerMessage = '';
    this.moreInfo = '';
    this.data = '';
  }
}

class ApiResponse {
  static OK(data) {
    const template = new Template();
    template.status = 200;
    template.data = data.data;
    template.userMessage = data.userMessage || 'Success';
    template.developerMessage = data.developerMessage || 'Success';
    template.moreInfo = data.moreInfo || '';
    return template;
  }

  static BadRequest(data) {
    const template = new Template();
    template.status = 400; // user bad input / client side problem
    template.userMessage = data.userMessage;
    template.developerMessage = data.developerMessage;
    template.moreInfo = data.moreInfo;
    template.errorCode = data.code;
    return template;
  }

  static Error(data) {
    const template = new Template();
    template.status = 500;
    template.userMessage = data.userMessage;
    template.developerMessage = data.developerMessage;
    template.moreInfo = data.moreInfo;
    return template;
  }

  static NotFound(data) {
    const template = new Template();
    template.status = 404;
    template.userMessage = data.userMessage;
    template.developerMessage = data.developerMessage;
    template.moreInfo = data.moreInfo;
    return template;
  }

  static Forbidden(data) {
    const template = new Template();
    template.status = 403;
    template.userMessage = data.userMessage;
    template.developerMessage = data.developerMessage;
    template.moreInfo = data.moreInfo;
    return template;
  }

  static UnAuthorized(data) {
    const template = new Template();
    template.status = 401;
    template.userMessage = data.userMessage;
    template.developerMessage = data.developerMessage;
    template.moreInfo = data.moreInfo;
    return template;
  }

  static Build(code = 500, userMessage, developerMessage, moreInfo) {
    const template = new Template();
    template.status = code;
    template.userMessage = userMessage || '';
    template.developerMessage = developerMessage || '';
    template.moreInfo = moreInfo;
    template.data = [];
    return template;
  }
}

export { ApiResponse };

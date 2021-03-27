export default class EmailService {
  constructor({ config }) {
    this.config = config;
    this.sendMail = this.sendMail.bind(this);
  }

  sendMail(email, title, body) {
    console.log(email, title, body);
  }
}

export default class EmailService {
  constructor({ config }) {
    this.config = config;
    this.sendMail = this.sendMail.bind(this);
  }

  build() {
    return {
      sendMail: this.sendMail,
    };
  }

  async sendMail(email, title, body) {
    console.log(email, title, body);
  }
}

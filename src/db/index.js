export default class Datasource {
  constructor({ config, logger, mongoose }) {
    this.dbUrl = config.db.url;
    this.logger = logger;
    this.mongoose = mongoose;
  }
  async connect() {
    try {
      await this.mongoose.connect(this.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.logger.info(`Connection to database established`);
    } catch (error) {
      this.logger.error(
        `===============>>Can not connect to DB<<====================`
      );
      this.logger.error(error.message);
    }
  }
}

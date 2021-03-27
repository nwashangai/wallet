import mongoose from 'mongoose';

export default class Datasource {
  constructor({ config, logger }) {
    this.dbUrl = config.db.url;
    this.logger = logger;
  }
  async connect() {
    try {
      await mongoose.connect(this.dbUrl, {
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

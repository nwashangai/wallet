'use strict';

export default class MainRepository {
  constructor(makeDataSource, collection) {
    this.makeDataSource = makeDataSource;
    this.collection = collection;
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
    this.delete = this.delete.bind(this);
    this.updateById = this.updateById.bind(this);
    this.updateAll = this.updateAll.bind(this);
  }

  async create(data) {
    const dataSource = await this.makeDataSource();
    const result = await dataSource
      .collection(this.collection)
      .insertOne({ ...data });
    const { _id: id, ...rest } = result.ops[0];
    return { id, ...rest };
  }

  async find(filter = {}, options = {}) {
    const dataSource = await this.makeDataSource();
    const result = await dataSource
      .collection(this.collection)
      .find(filter, options);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async findById(_id) {
    const dataSource = await this.makeDataSource();
    const result = await dataSource.collection(this.collection).find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async remove(_id) {
    const dataSource = await this.makeDataSource();
    const result = await dataSource
      .collection(this.collection)
      .deleteOne({ _id });
    return result.deletedCount;
  }

  async updateById(_id, data) {
    const dataSource = await this.makeDataSource();
    const result = await dataSource
      .collection(this.collection)
      .updateOne({ _id }, { $set: { ...data } });
    return result.modifiedCount > 0 ? { id: _id, ...data } : null;
  }

  async updateAll(filter, data) {
    const dataSource = await this.makeDataSource();
    const data = await dataSource
      .collection(this.collection)
      .updateMany({ ...filter }, { $set: { ...data } });
    return { count: data.result.nModified };
  }
}

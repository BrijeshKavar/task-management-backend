import { Model } from 'objection';

class BaseModel extends Model {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  $beforeInsert() {
    this.createdAt = new Date();
  }
  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

export default BaseModel;

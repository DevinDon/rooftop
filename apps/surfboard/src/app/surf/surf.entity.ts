import { cleanify } from '@rester/core';
import { Column, Entity, MongoEntity, ObjectId, PaginationParam } from '@rester/orm';
import { Surf, SurfID, SurfInsertParams } from './surf.model';

@Entity({ name: 'surf' })
export class SurfEntity extends MongoEntity<Surf> implements Surf {

  @Column()
  _id: ObjectId;

  @Column({ index: true })
  author?: string;

  @Column()
  content: string;

  @Column()
  like: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(surf: SurfInsertParams) {
    const date = new Date();
    const id = await this.collection
      .insertOne({
        ...surf,
        like: 0,
        createdAt: date,
        updatedAt: date,
      })
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteOne(id: SurfID) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return [id];
  }

  async updateOne(id: SurfID, surf: Partial<Surf>) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: cleanify({
          ...surf,
          updatedAt: new Date(),
        }),
      },
    );
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findOne(id: SurfID) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

}

export type SurfCollection = SurfEntity['collection'];

import { cleanify } from '@rester/core';
import { Column, Entity, MongoEntity, ObjectId, PaginationParam } from '@rester/orm';
import { Aphorism, AphorismID, AphorismInsertParams } from './aphorism.model';

@Entity({ name: 'aphorism' })
export class AphorismEntity extends MongoEntity<Aphorism> implements Aphorism {

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

  async insertOne(aphorism: AphorismInsertParams) {
    const date = new Date();
    const id = await this.collection
      .insertOne({
        ...aphorism,
        like: 0,
        createdAt: date,
        updatedAt: date,
      })
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteOne(id: AphorismID) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return [id];
  }

  async updateOne(id: AphorismID, aphorism: Partial<Aphorism>) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: cleanify({
          ...aphorism,
          updatedAt: new Date(),
        }),
      },
    );
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findOne(id: AphorismID) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

}

export type AphorismCollection = AphorismEntity['collection'];

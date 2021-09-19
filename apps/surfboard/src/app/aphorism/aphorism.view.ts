import { BaseView, DELETE, ExistResponse, GET, PathQuery, PathVariable, POST, PUT, RequestBody, requiredAtLeastOneParam, requiredParams, View } from '@rester/core';
import { getEntity, Pagination } from '@rester/orm';
import { AphorismEntity } from './aphorism.entity';
import { AphorismID, AphorismInsertParams, AphorismUpdateParams } from './aphorism.model';

// create, remove, modify, take, search
// one, more

@View('aphorisms')
export class AphorismView extends BaseView {

  private entity: AphorismEntity;

  async init() {
    this.entity = getEntity(AphorismEntity);
  }

  @POST()
  async create(
    @RequestBody() { author, content }: AphorismInsertParams,
  ) {
    requiredParams({ content });
    return new ExistResponse({
      statusCode: 201,
      data: await this.entity.insertOne({ author, content }),
      message: 'Aphorism created failed.',
    });
  }

  @DELETE(':id')
  async remove(@PathVariable('id') id: AphorismID) {
    return this.entity.deleteOne(id);
  }

  @PUT(':id')
  async modify(
    @PathVariable('id') id: AphorismID,
    @RequestBody() { author, content }: AphorismUpdateParams,
  ) {
    requiredAtLeastOneParam({ author, content });
    return new ExistResponse({
      data: await this.entity.updateOne(id, { author, content }),
      message: 'Aphorism not found.',
    });
  }

  @GET(':id')
  async take(
    @PathVariable('id') id: AphorismID,
  ) {
    return new ExistResponse({
      data: await this.entity.findOne(id),
      message: 'Aphorism not found.',
    });
  }

  @GET()
  async takeMany(
    @PathQuery('random') random: boolean = false,
    @PathQuery('from') from: string = '000000000000000000000000',
    @PathQuery('take') take: number = 10,
  ): Promise<Pagination<string>> {
    return random
      ? this.entity.getRandomList({ take })
      : this.entity.getPagination({ from, take });
  }

}

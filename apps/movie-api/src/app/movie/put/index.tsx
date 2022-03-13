import { Capturer, Http400Exception, Schema, useJsonRequestBody, type Handler, type Router } from '@rester/core';
import { Type } from '@sinclair/typebox';
import { Download } from './download';
import { Record } from './record';

export const routerOfPutMovie: Router = {
  location: {
    method: 'PUT',
    path: '/movies',
  },
  handler: () => <Capturer>
    <PutTask />
  </Capturer>,
};

export default routerOfPutMovie;

enum TaskAction {
  record = 'record',
  download = 'download',
}

export const PutTask: Handler = async (_, { useContext }) => {

  const { body } = await useJsonRequestBody(
    useContext,
    Type.Object({
      action: Type.Enum(TaskAction),
      url: Type.String({ format: 'uri' }),
      concat: Type.Optional(Type.Boolean()),
    }),
  );

  return <Schema>
    {
      (() => {
        switch (body.action) {
          case TaskAction.record:
            return <Record {...body} />;
          case TaskAction.download:
            return <Download {...body} />;
          default:
            throw new Http400Exception('invalid action, allow: "record", "download"');
        }
      })()
    }
  </Schema>;

};

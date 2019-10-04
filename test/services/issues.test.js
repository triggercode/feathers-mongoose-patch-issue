const assert = require('assert');
const app = require('../../src/app');

describe('\'issues\' service', () => {
  it('fails on patch with deletedAt hook', async () => {

    const service = app.service('issues');

    await service.create({
      foo: 'bar'
    });

    const removed = await service.remove(0);

    assert.ok(!!removed);

  });
});

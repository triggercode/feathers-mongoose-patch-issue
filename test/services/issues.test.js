const assert = require('assert');
const app = require('../../src/app');

describe('A \'feathers-mongoose\' base service', () => {

  const service = app.service('issues');

  beforeEach(() => {
    service._remove(null);
  });

  it('has an issue with softDelelete on remove because the record is not found', async () => {

    const issue = await service.create({
      text: 'bar'
    });

    const removedIssue = await service.remove(issue._id);

    assert.ok(removedIssue);

  });

  it('has an issue with any patch where we still got the ID (as with softDelete2) that would uniquely identify the record, but the query fails', async () => {

    const issue = await service.create({
      text: 'bar'
    });

    const patchedIssue = await service.patch(issue._id, {
      text: 'baz'
    }, {
      query: {
        text: 'bar'
      }
    });

    assert.ok(!!patchedIssue);

  });

  it('has an issue with any patch where the query contains the patched key/value', async () => {

    await service.create({
      text: 'bar'
    });

    const patchedIssue = await service.patch(null, {
      text: 'baz'
    }, {
      query: {
        text: 'bar'
      }
    });

    assert.ok(patchedIssue.length > 0);

  });
});

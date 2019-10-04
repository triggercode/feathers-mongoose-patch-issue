const assert = require('assert');
const app = require('../../src/app');

describe('\'issues\' service', () => {

  const service = app.service('issues');

  before(() => {
    service._remove(null);
  });

  it('has an issue with softDelelete on remove because the record is not found', async () => {

    const issue = await service.create({
      text: 'bar'
    });

    const removedIssue = await service.remove(issue._id);

    assert.ok(removedIssue);

  });
});

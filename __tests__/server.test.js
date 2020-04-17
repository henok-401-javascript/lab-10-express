'use strict';

const app = require('../lib/server.js');
const { person } = require('../lib/models/model.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(app.server);

expect('The happy path for signin route', () => {
  it('/signup route', async () => {
    let result = await mockRequest.post('/signup');
    expect(JSON.stringify(result.body)).toBe(
      JSON.stringify([
        {
          username: 'henok',
          password: 'none',
          firstname: 'henok',
          lastname: 'gebre',
        },
      ])
    );
  });
});

import { config } from 'dotenv';
import express from 'express';
import payload from 'payload';

import { Role } from './access';

config();

const app = express();

app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async ({ create, find }) => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);

      const users = await find({
        collection: 'users',
        limit: 1,
      });

      if (users.docs.length === 0) {
        await create({
          collection: 'users',
          data: {
            email: process.env.PAYLOAD_ADMIN_USER,
            password: process.env.PAYLOAD_ADMIN_PASSWORD,
            roles: [Role.Admin],
          },
        });
      }
    },
  });

  app.listen(3000);
};

start();

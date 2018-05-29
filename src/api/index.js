import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import colors from 'colors/safe';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';

import { getRessources, mixIngredients } from './service/ressources';

require('dotenv').config();

const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;

const errorHandler = (err, req, res, next) => {
  const { details, status } = err;
  res.status(status || 404);
  res.json({ details } || 'error happen');
  console.log(colors.red('[ERROR]'), details);
  next();
};

// const swaggerOptions = {
//   explorer: true,
//   swaggerOptions: {
//     validatorUrl: null,
//   },
// };

/**
 *  The Server is actually working and functional once the callback of app.listen is called.
 *  Meaning, without the console.log prompt, you can't tell server is actually functional.
 */
const initServer = (async () => {
  const app = await express();
  const { HOST_API, PORT_API } = process.env;

  await app
    .use(cors())
    .use(compression())
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  await app
  // .use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))
    .get('/ressources', getRessources)
    .post('/ressources', mixIngredients);

  await app
    .use(errorHandler);

  const httpServer = await app.listen(PORT_API, HOST_API, () => {
    console.log(colors.green(`[API] Server running: ${getUrl(httpServer)}`));
    // console.log(colors.yellow(`[API] See documentation: ${getUrl(httpServer)}/doc\n`));
  });
})();

export default initServer;


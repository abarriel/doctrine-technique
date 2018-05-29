import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import colors from 'colors/safe';
// import swaggerUi from 'swagger-ui-express';

// import swaggerDocument from './swagger.json';
require('dotenv').config();

const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;


// const swaggerOptions = {
//   explorer: true,
//   swaggerOptions: {
//     validatorUrl: null,
//   },
// };
// const errorHandler = (err, req, res, next) => {
//   let errMsg = {};
//   if (!err.details)
//     err.details = "check the errror";
//   // if (err.type === 'Auth')
//     // res.redirect('http://localhost:8080', 301);
//   if (err.type === 'validation' || err.type === 'db' || err.type === 'Auth' || err.type === 'Torrent' || err.type === 'Stream') {
//     errMsg = { type: err.type, details: err.details, err: err.err };
//   }
//   else if (err.type === 'JoiSchema')
//     errMsg = { type: err.type, details: err.err.details };
//   else if (err.type === 'dbQuery') {
//     errMsg = {type: err.type, details: err.details.toString().substr('\n') };
//   }
//   res.json(errMsg);
//   console.log(colors.red('[ERROR]'), err.details.toString().substr('\n'));
// }
/**
 *  The Server is actually working and functional once the callback of app.listen is called.
 *  Meaning, without the console.log prompt, you can't tell server is actually functional.
*/
const initServer = (async () => {
  const app = await express();
  // const { server: { host, port } } = config;
  const { HOST_API, PORT_API } = process.env;
  await app
    .use(cors())
    .use(compression())
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  // await app
  // .use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))
  // .use('/api', dispatchRoute({ passport }));

  // await app
  // .use(errorHandler);

  const httpServer = await app.listen(PORT_API, HOST_API, () => {
    console.log(colors.green(`[API] Server running: ${getUrl(httpServer)}`));
    // console.log(colors.yellow(`[API] See documentation: ${getUrl(httpServer)}/doc\n`));
  });
})();

export default initServer;


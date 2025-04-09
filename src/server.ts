import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Exemplos de endpoints de API Rest do Express podem ser definidos aqui.
 * Descomente e defina os endpoints conforme necessário.
 *
 * Exemplo:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Manipule a solicitação da API
 * });
 * ```
 */

/**
 * Servir arquivos estáticos da pasta /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Manipular todas as outras solicitações renderizando a aplicação Angular.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar o servidor se este módulo for o ponto de entrada principal.
 * O servidor escuta na porta definida pela variável de ambiente `PORT`, ou usa 4000 como padrão.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Servidor Node Express escutando em http://localhost:${port}`);
  });
}

/**
 * Manipulador de solicitações usado pelo Angular CLI (para dev-server e durante a build) ou Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

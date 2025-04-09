import { APP_BASE_HREF } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonEngine } from '@angular/ssr/node';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import app from './server';
const commonEngine = new CommonEngine()
// All regular routes use the Angular engine
app.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    commonEngine
        .render({
            bootstrap,
            documentFilePath: 'index.html',
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: './../public',
            providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
});
/** O main.server.ts é responsavel , por subir o servidor de DEV */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

async function main() {
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      provideRouter(routes) // ✅ Esto es lo que faltaba
    ]
  }).then(appRef => {
    const injector = appRef.injector;
    const configService = injector.get(ConfigService);

    configService.loadConfig().then(() => {
      console.log('Config cargada');
    }).catch(console.error);
  }).catch(console.error);
}

main();

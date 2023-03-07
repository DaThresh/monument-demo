import { createApp } from './app';
import { environment } from './boundaries/environment';

void createApp().then(({ server }) => server.listen(environment.port));

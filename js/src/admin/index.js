import app from 'flarum/app';

import Link from '../common/models/Link';
import addLinksPane from './addLinksPane';

app.initializers.add('sijad-links', () => {
  app.store.models.links = Link;
  addLinksPane();
});

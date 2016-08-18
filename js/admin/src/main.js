import app from 'flarum/app';
import Link from 'sijad/links/models/Link';
import addLinksPane from 'sijad/links/addLinksPane';

app.initializers.add('sijad-links', () => {
  app.store.models.links = Link;
  addLinksPane();
});

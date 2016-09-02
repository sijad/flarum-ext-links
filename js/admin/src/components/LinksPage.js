/* global $*/
/* global m*/

import app from 'flarum/app';
import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';

import EditLinkModal from 'sijad/links/components/EditLinkModal';
import sortLinks from 'sijad/links/utils/sortLinks';

function LinkItem(link) {
  return (
    <li data-id={link.id()}>
      <div className="LinkListItem-info">
        <span className="LinkListItem-name">{link.title()}</span>
        {Button.component({
          className: 'Button Button--link',
          icon: 'pencil',
          onclick: () => app.modal.show(new EditLinkModal({ link })),
        })}
      </div>
      <ol className="LinkListItem-children">
        {link.children().map(LinkItem)}
      </ol>
    </li>
  );
}

export default class LinksPage extends Page {
  view() {
    return (
      <div className="LinksPage">
        <div className="LinksPage-header">
          <div className="container">
            <p>
              {app.translator.trans('sijad-links.admin.links.about_text')}
            </p>
            {Button.component({
              className: 'Button Button--primary',
              icon: 'plus',
              children: app.translator.trans('sijad-links.admin.links.create_button'),
              onclick: () => app.modal.show(new EditLinkModal()),
            })}
          </div>
        </div>
        <div className="LinksPage-list">
          <div className="container">
            <div className="LinkItems">
              <label>{app.translator.trans('sijad-links.admin.links.links')}</label>
              <ol className="LinkList">
                {sortLinks(app.store.all('links'))
                  .filter(link => !link.isChild())
                  .map(LinkItem)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  config() {
    this.$('ol')
      .sortable({ connectWith: 'connectedlinks' })
      .on('sortupdate', (e, ui) => {
        app.store.getById('links', ui.item.data('id')).pushData({
          attributes: {
            position: null,
            isChild: false,
          },
          relationships: { parent: null, children: { data: [] } },
        });

        // this.$('.LinkList > li, li > ol > li').map((i, el) => {
        //   console.log($(el).data('id'));
        // });

        const order = this.$('ol > li')
          .map((i, el) => (
            {
              id: $(el).data('id'),
              children: $(el).find('li')
                .map((j, cl) => $(cl).data('id'))
                .get(),
            }))
          .get();

        order.forEach((link, i) => {
          const parent = app.store.getById('links', link.id);
          parent.pushData({
            attributes: {
              position: i,
              isChild: false,
            },
            relationships: { parent: null, children: { data: [] } },
          });

          link.children.forEach((child, j) => {
            app.store.getById('links', child).pushData({
              attributes: {
                position: j,
                isChild: true,
              },
              relationships: { parent, children: child.children },
            });
          });
        });

        app.request({
          url: `${app.forum.attribute('apiUrl')}/links/order`,
          method: 'POST',
          data: { order },
        });

        m.redraw.strategy('all');
        m.redraw();
      });
  }
}

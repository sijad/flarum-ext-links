System.register('sijad/links/addLinksPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'sijad/links/components/LinksPage'], function (_export) {
  'use strict';

  var extend, AdminNav, AdminLinkButton, LinksPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsAdminNav) {
      AdminNav = _flarumComponentsAdminNav['default'];
    }, function (_flarumComponentsAdminLinkButton) {
      AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
    }, function (_sijadLinksComponentsLinksPage) {
      LinksPage = _sijadLinksComponentsLinksPage['default'];
    }],
    execute: function () {
      _export('default', function () {
        app.routes.links = { path: '/links', component: LinksPage.component() };

        app.extensionSettings['sijad-links'] = function () {
          return m.route(app.route('links'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
          items.add('links', AdminLinkButton.component({
            href: app.route('links'),
            icon: 'bars',
            children: app.translator.trans('sijad-links.admin.nav.links_button'),
            description: app.translator.trans('sijad-links.admin.nav.links_text')
          }));
        });
      });
    }
  };
});;
System.register('sijad/links/components/EditLinkModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string'], function (_export) {

  /**
   * The `EditlinksModal` component shows a modal dialog which allows the user
   * to create or edit a link.
   */
  'use strict';

  var Modal, Button, slug, EditlinksModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsString) {
      slug = _flarumUtilsString.slug;
    }],
    execute: function () {
      EditlinksModal = (function (_Modal) {
        babelHelpers.inherits(EditlinksModal, _Modal);

        function EditlinksModal() {
          babelHelpers.classCallCheck(this, EditlinksModal);
          babelHelpers.get(Object.getPrototypeOf(EditlinksModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(EditlinksModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(EditlinksModal.prototype), 'init', this).call(this);

            this.link = this.props.link || app.store.createRecord('links');

            this.itemTitle = m.prop(this.link.title() || '');
            this.type = m.prop(this.link.type() || '');
            this.url = m.prop(this.link.url() || '');
            this.refID = m.prop(this.link.refID() || '');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'EditLinkModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            var title = this.itemTitle();
            return title ? title : app.translator.trans('sijad-links.admin.edit_link.title');
          }
        }, {
          key: 'content',
          value: function content() {
            var _this = this;

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('sijad-links.admin.edit_link.title_label')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('sijad-links.admin.edit_link.title_placeholder'), value: this.itemTitle(), oninput: function (e) {
                      _this.itemTitle(e.target.value);
                    } })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('sijad-links.admin.edit_link.url_label')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('sijad-links.admin.edit_link.url_placeholder'), type: 'url', value: this.url(), oninput: function (e) {
                      _this.url(e.target.value);
                    } })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary EditLinkModal-save',
                    loading: this.loading,
                    children: app.translator.trans('sijad-links.admin.edit_link.submit_button')
                  }),
                  this.link.exists ? m(
                    'button',
                    { type: 'button', className: 'Button EditLinkModal-delete', onclick: this['delete'].bind(this) },
                    app.translator.trans('sijad-links.admin.edit_link.delete_link_button')
                  ) : ''
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            this.loading = true;

            this.link.save({
              title: this.itemTitle(),
              url: this.url()
            }).then(function () {
              return _this2.hide();
            }, function (response) {
              _this2.loading = false;
              _this2.handleErrors(response);
            });
          }
        }, {
          key: 'delete',
          value: function _delete() {
            if (confirm(app.translator.trans('sijad-links.admin.edit_link.delete_link_confirmation'))) {
              this.link['delete']().then(function () {
                return m.redraw();
              });
              this.hide();
            }
          }
        }]);
        return EditlinksModal;
      })(Modal);

      _export('default', EditlinksModal);
    }
  };
});;
System.register('sijad/links/components/LinksPage', ['flarum/Component', 'flarum/components/Button', 'sijad/links/components/EditLinkModal', 'sijad/links/utils/sortLinks'], function (_export) {
  'use strict';

  var Component, Button, EditLinkModal, sortLinks, LinksPage;

  function LinkItem(link) {
    return m(
      'li',
      { 'data-id': link.id() },
      m(
        'div',
        { className: 'LinkListItem-info' },
        m(
          'span',
          { className: 'LinkListItem-name' },
          link.title()
        ),
        Button.component({
          className: 'Button Button--link',
          icon: 'pencil',
          onclick: function onclick() {
            return app.modal.show(new EditLinkModal({ link: link }));
          }
        })
      )
    );
  }

  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_sijadLinksComponentsEditLinkModal) {
      EditLinkModal = _sijadLinksComponentsEditLinkModal['default'];
    }, function (_sijadLinksUtilsSortLinks) {
      sortLinks = _sijadLinksUtilsSortLinks['default'];
    }],
    execute: function () {
      LinksPage = (function (_Component) {
        babelHelpers.inherits(LinksPage, _Component);

        function LinksPage() {
          babelHelpers.classCallCheck(this, LinksPage);
          babelHelpers.get(Object.getPrototypeOf(LinksPage.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(LinksPage, [{
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'LinksPage' },
              m(
                'div',
                { className: 'LinksPage-header' },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'p',
                    null,
                    app.translator.trans('sijad-links.admin.links.about_text')
                  ),
                  Button.component({
                    className: 'Button Button--primary',
                    icon: 'plus',
                    children: app.translator.trans('sijad-links.admin.links.create_button'),
                    onclick: function onclick() {
                      return app.modal.show(new EditLinkModal());
                    }
                  })
                )
              ),
              m(
                'div',
                { className: 'LinksPage-list' },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'div',
                    { className: 'LinkItems' },
                    m(
                      'label',
                      null,
                      app.translator.trans('sijad-links.admin.links.links')
                    ),
                    m(
                      'ol',
                      { className: 'LinkList' },
                      sortLinks(app.store.all('links')).map(LinkItem)
                    )
                  )
                )
              )
            );
          }
        }, {
          key: 'config',
          value: function config() {
            var _this = this;

            this.$('ol').sortable().on('sortupdate', function (e, ui) {
              var order = _this.$('.LinkList > li').map(function () {
                return {
                  id: $(this).data('id')
                };
              }).get();

              order.forEach(function (link, i) {
                var item = app.store.getById('links', link.id);
                item.pushData({
                  attributes: {
                    position: i
                  }
                });
              });

              app.request({
                url: app.forum.attribute('apiUrl') + '/links/order',
                method: 'POST',
                data: { order: order }
              });

              m.redraw.strategy('all');
              m.redraw();
            });
          }
        }]);
        return LinksPage;
      })(Component);

      _export('default', LinksPage);
    }
  };
});;
System.register('sijad/links/main', ['sijad/links/models/Link', 'sijad/links/addLinksPane'], function (_export) {
  'use strict';

  var Link, addLinksPane;
  return {
    setters: [function (_sijadLinksModelsLink) {
      Link = _sijadLinksModelsLink['default'];
    }, function (_sijadLinksAddLinksPane) {
      addLinksPane = _sijadLinksAddLinksPane['default'];
    }],
    execute: function () {

      app.initializers.add('sijad-links', function (app) {
        app.store.models.links = Link;
        addLinksPane();
      });
    }
  };
});;
System.register('sijad/links/models/Link', ['flarum/Model', 'flarum/utils/mixin', 'flarum/utils/computed'], function (_export) {
  'use strict';

  var Model, mixin, computed, Link;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel['default'];
    }, function (_flarumUtilsMixin) {
      mixin = _flarumUtilsMixin['default'];
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed['default'];
    }],
    execute: function () {
      Link = (function (_mixin) {
        babelHelpers.inherits(Link, _mixin);

        function Link() {
          babelHelpers.classCallCheck(this, Link);
          babelHelpers.get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
        }

        return Link;
      })(mixin(Model, {
        title: Model.attribute('title'),
        type: Model.attribute('type'),
        url: Model.attribute('url'),
        refID: Model.attribute('ref_id'),
        position: Model.attribute('position')
      }));

      _export('default', Link);
    }
  };
});;
System.register("sijad/links/utils/sortLinks", [], function (_export) {
  "use strict";

  _export("default", sortLinks);

  function sortLinks(links) {
    return links.slice(0).sort(function (a, b) {
      var aPos = a.position();
      var bPos = b.position();

      if (bPos === null) return -1;
      if (aPos === null) return 1;

      return a.position() - b.position();
    });
  }

  return {
    setters: [],
    execute: function () {}
  };
});
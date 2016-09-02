'use strict';

System.register('sijad/links/components/LinkItem', ['flarum/components/LinkButton'], function (_export, _context) {
  "use strict";

  var LinkButton, LinkItem;
  return {
    setters: [function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }],
    execute: function () {
      LinkItem = function (_LinkButton) {
        babelHelpers.inherits(LinkItem, _LinkButton);

        function LinkItem() {
          babelHelpers.classCallCheck(this, LinkItem);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LinkItem).apply(this, arguments));
        }

        babelHelpers.createClass(LinkItem, [{
          key: 'view',
          value: function view() {
            var link = this.props.link;
            return m(
              'a',
              {
                className: 'LinksButton Button Button--link',
                target: link.isNewtab() ? '_blank' : '',
                config: link.isInternal() ? m.route : '',
                href: link.url(),
                title: link.title()
              },
              link.title()
            );
          }
        }]);
        return LinkItem;
      }(LinkButton);

      _export('default', LinkItem);
    }
  };
});;
'use strict';

System.register('sijad/links/main', ['flarum/extend', 'flarum/app', 'flarum/components/HeaderPrimary', 'sijad/links/models/Link', 'sijad/links/components/LinkItem', 'sijad/links/utils/sortLinks'], function (_export, _context) {
  "use strict";

  var extend, app, HeaderPrimary, Link, LinkItem, sortLinks;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsHeaderPrimary) {
      HeaderPrimary = _flarumComponentsHeaderPrimary.default;
    }, function (_sijadLinksModelsLink) {
      Link = _sijadLinksModelsLink.default;
    }, function (_sijadLinksComponentsLinkItem) {
      LinkItem = _sijadLinksComponentsLinkItem.default;
    }, function (_sijadLinksUtilsSortLinks) {
      sortLinks = _sijadLinksUtilsSortLinks.default;
    }],
    execute: function () {

      app.initializers.add('sijad-link', function () {
        app.store.models.links = Link;

        extend(HeaderPrimary.prototype, 'items', function (items) {
          var links = app.store.all('links');
          var addLink = function addLink(link) {
            items.add('link' + link.id(), LinkItem.component({ link: link }));
          };
          sortLinks(links).map(addLink);
        });
      });
    }
  };
});;
'use strict';

System.register('sijad/links/models/Link', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
  "use strict";

  var Model, mixin, Link;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsMixin) {
      mixin = _flarumUtilsMixin.default;
    }],
    execute: function () {
      Link = function (_mixin) {
        babelHelpers.inherits(Link, _mixin);

        function Link() {
          babelHelpers.classCallCheck(this, Link);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
        }

        return Link;
      }(mixin(Model, {
        title: Model.attribute('title'),
        type: Model.attribute('type'),
        url: Model.attribute('url'),
        position: Model.attribute('position'),
        parent: Model.hasOne('parent'),
        isInternal: Model.attribute('isInternal'),
        isNewtab: Model.attribute('isNewtab'),
        isChild: Model.attribute('isChild')
      }));

      _export('default', Link);
    }
  };
});;
"use strict";

System.register("sijad/links/utils/sortLinks", [], function (_export, _context) {
  "use strict";

  function sortLinks(links) {
    return links.slice(0).sort(function (a, b) {
      var aPos = a.position();
      var bPos = b.position();

      var aParent = a.parent();
      var bParent = b.parent();

      // If they both have the same parent, then their positions are local,
      // so we can compare them directly.
      if (aParent === bParent) return aPos - bPos;

      // If they are both child links, then we will compare the positions of their
      // parents.
      else if (aParent && bParent) return aParent.position() - bParent.position();

        // If we are comparing a child link with its parent, then we let the parent
        // come first. If we are comparing an unrelated parent/child, then we
        // compare both of the parents.
        else if (aParent) return aParent === b ? 1 : aParent.position() - bPos;else if (bParent) return bParent === a ? -1 : aPos - bParent.position();

      return 0;
    });
  }

  _export("default", sortLinks);

  return {
    setters: [],
    execute: function () {}
  };
});
import Model from 'flarum/Model';

export default class Link extends Model {}

Object.assign(Link.prototype, {
  title: Model.attribute('title'),
  type: Model.attribute('type'),
  url: Model.attribute('url'),
  position: Model.attribute('position'),
  parent: Model.hasOne('parent'),
  isInternal: Model.attribute('isInternal'),
  isNewtab: Model.attribute('isNewtab'),
  isChild: Model.attribute('isChild'),
  children: Model.hasMany('children'),
});

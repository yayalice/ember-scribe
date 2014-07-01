export default Ember.Component.extend({
  layoutName: 'ember-scribe-toolbar',

  //Public interface

  scribeComponent: undefined,
  onScribeInitialization: Ember.observer(function() {
    var scribe = this.get('scribeComponent.scribe'),
        scribePluginToolbar = window.ScribeShim.require('scribe-plugin-toolbar');
    scribe.use(scribePluginToolbar(this.$('.scribe-toolbar')[0]));
  }, 'scribeComponent.scribe'),
});

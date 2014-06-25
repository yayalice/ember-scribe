export default Ember.Component.extend({
  layoutName: 'ember-scribe',

  scribe: undefined,
  selectedFontName: 'Helvetica Neue',
  selectedFontSize: '2',
  selectedForeColor: 'rgb(0, 0, 0)',
  isToolbarVisible: true,
  EDITOR_CLASS: 'text-editor',
  PLACEHOLDER_TEXT: 'Click to edit',

  didInsertElement: function() {
    var Scribe = window.ScribeShim.require('scribe');
    this.scribe = new Scribe(document.querySelector('.scribe'), {
      allowBlockElements: true
    });
    this.scribe.on('content-changed', Ember.K);
  }
});

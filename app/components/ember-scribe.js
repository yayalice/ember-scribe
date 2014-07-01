export default Ember.Component.extend({
  layoutName: 'ember-scribe',

  // Public interface
  initialText: 'Hello World!',
  onContentChanged: Ember.K,  // TODO: fix this

  scribe: undefined,
  selectedFontName: 'Helvetica Neue',
  selectedFontSize: '2',
  selectedForeColor: 'rgb(0, 0, 0)',
  isToolbarVisible: true,

  didInsertElement: function() {
    var Scribe = window.ScribeShim.require('scribe');
    this.scribe = new Scribe(this.$('.scribe')[0], {
      allowBlockElements: true
    });
    this.scribe.setContent('<p>' + this.get('initialText') + '</p>');
    document.querySelector('.scribe-html').textContent = this.scribe.getHTML();
    this.scribe.on("content-changed", (function(_this) {
      return function() {
        document.querySelector(".scribe-html").textContent = _this.scribe.getHTML();
      };
    })(this));
  }
});

import EmberScribe from 'ember-scribe/components/ember-scribe';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'ember-scribe',
  Resolver: Resolver
});

loadInitializers(App, 'ember-scribe');

export default App;

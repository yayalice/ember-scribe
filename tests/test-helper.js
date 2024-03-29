document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

var resolver = require('ember-scribe/tests/helpers/resolver')['default'];
require('ember-qunit').setResolver(resolver);


window.startApp          = require('ember-scribe/tests/helpers/start-app')['default'];
window.isolatedContainer = require('ember-qunit/isolated-container')['default'];

function exists(selector, context) {
  return !!find(selector, context).length;
}

function getAssertionMessage(actual, expected, message) {
  return message || QUnit.jsDump.parse(expected) + " expected but was " + QUnit.jsDump.parse(actual);
}

function equal(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.equal.call(this, actual, expected, message);
}

function strictEqual(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.strictEqual.call(this, actual, expected, message);
}

window.exists = exists;
window.equal = equal;
window.strictEqual = strictEqual;

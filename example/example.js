require({
  paths: {
    'scribe': './../vendor/scribe/scribe',
    'scribe-plugin-blockquote-command': './../vendor/scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-curly-quotes': './../vendor/scribe-plugin-curly-quotes/scribe-plugin-curly-quotes',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': './../vendor/scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command': './../vendor/scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-intelligent-unlink-command': './../vendor/scribe-plugin-intelligent-unlink-command/scribe-plugin-intelligent-unlink-command',
    'scribe-plugin-keyboard-shortcuts': './../vendor/scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command': './../vendor/scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
    'scribe-plugin-sanitizer': './../vendor/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-smart-lists': './../vendor/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-toolbar': './../vendor/scribe-plugin-toolbar/scribe-plugin-toolbar'
  }
}, [
  'scribe',
  'scribe-plugin-blockquote-command',
  'scribe-plugin-curly-quotes',
  'scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
  'scribe-plugin-heading-command',
  'scribe-plugin-intelligent-unlink-command',
  'scribe-plugin-keyboard-shortcuts',
  'scribe-plugin-link-prompt-command',
  'scribe-plugin-sanitizer',
  'scribe-plugin-smart-lists',
  'scribe-plugin-toolbar'
], function (
  Scribe,
  scribePluginBlockquoteCommand,
  scribePluginCurlyQuotes,
  scribePluginFormatterPlainTextConvertNewLinesToHtml,
  scribePluginHeadingCommand,
  scribePluginIntelligentUnlinkCommand,
  scribePluginKeyboardShortcuts,
  scribePluginLinkPromptCommand,
  scribePluginSanitizer,
  scribePluginSmartLists,
  scribePluginToolbar
) {

  'use strict';

  var scribe = new Scribe(document.querySelector('.scribe'), { allowBlockElements: true });

  scribe.on('content-changed', updateHTML);

  function updateHTML() {
    document.querySelector('.scribe-html').textContent = scribe.getHTML();
  }

  /**
   * Keyboard shortcuts
   */

  var ctrlKey = function (event) { return event.metaKey || event.ctrlKey; };

  var commandsToKeyboardShortcutsMap = Object.freeze({
    bold: function (event) { return event.metaKey && event.keyCode === 66; }, // b
    italic: function (event) { return event.metaKey && event.keyCode === 73; }, // i
    strikeThrough: function (event) { return event.altKey && event.shiftKey && event.keyCode === 83; }, // s
    removeFormat: function (event) { return event.altKey && event.shiftKey && event.keyCode === 65; }, // a
    linkPrompt: function (event) { return event.metaKey && ! event.shiftKey && event.keyCode === 75; }, // k
    unlink: function (event) { return event.metaKey && event.shiftKey && event.keyCode === 75; }, // k,
    insertUnorderedList: function (event) { return event.altKey && event.shiftKey && event.keyCode === 66; }, // b
    insertOrderedList: function (event) { return event.altKey && event.shiftKey && event.keyCode === 78; }, // n
    blockquote: function (event) { return event.altKey && event.shiftKey && event.keyCode === 87; }, // w
    h2: function (event) { return ctrlKey(event) && event.keyCode === 50; }, // 2
  });

  /**
   * Plugins
   */

  scribe.use(scribePluginBlockquoteCommand());
  scribe.use(scribePluginHeadingCommand(2));
  scribe.use(scribePluginIntelligentUnlinkCommand());
  scribe.use(scribePluginLinkPromptCommand());
  scribe.use(scribePluginToolbar(document.querySelector('.toolbar')));
  scribe.use(scribePluginSmartLists());
  scribe.use(scribePluginCurlyQuotes());
  scribe.use(scribePluginKeyboardShortcuts(commandsToKeyboardShortcutsMap));

  // Formatters
  scribe.use(scribePluginSanitizer({
    tags: {
      p: {},
      br: {},
      b: {},
      strong: {},
      i: {},
      s: {},
      blockquote: {},
      ol: {},
      ul: {},
      li: {},
      a: { href: true },
      h2: {}
    }
  }));
  scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());

  if (scribe.allowsBlockElements()) {
    scribe.setContent('<p>Hello, World!</p>');
  } else {
    scribe.setContent('Hello, World!');
  }
});

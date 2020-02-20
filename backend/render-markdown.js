const MarkDown = require('markdown-it');
const markDownAnchor = require('markdown-it-anchor');
const md = new MarkDown({html: true}).use(markDownAnchor, {
  permalink: true,
  permalinkSymbol: '#',
});

const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  return defaultRender(tokens, idx, options, env, self);
};


function replaceRelativeSrcs(text, url) {
  return text.replace(new RegExp(/src="(\.\/)/, 'g'), (match, group) => match.replace(group, url));
}

function replaceRelativeHrefs(text, url) {
  return text.replace(new RegExp(/href="(\.)\//, 'g'), (match, group) => match.replace(group, url));
}

function replaceAnchors(text, url) {
  return text.replace(new RegExp('(href=")(#[^"]*")', 'g'), (match, g1, g2) => {
    return g1 + url + g2;
  });
}

module.exports = function renderMarkdown(markdown, resourceUrl, basePath) {
  const hrefBasePath = basePath.split('/').slice(0, basePath.split('/').length - 1).join('/');
  return replaceRelativeHrefs(replaceAnchors(md.render(replaceRelativeSrcs(markdown, resourceUrl)), basePath), hrefBasePath)
};

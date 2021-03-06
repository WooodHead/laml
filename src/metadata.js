module.exports = function(document) {
  // handle metadata
  const metadata = JSON.parse(document.querySelector('script[data-laml="metadata"]').text);
  if (!metadata) return;
  const articleInfo = document.createElement('section');
  articleInfo.classList.add('articleInfo');
  document.body.insertBefore(articleInfo, document.body.firstChild);
  const articleTitle = metadata.title;
  if (articleTitle) {
    const title = document.querySelector('title');
    if (title) title.innerHTML = articleTitle;
    else {
      newtitle = document.createElement('title');
      newtitle.innerHTML = articleTitle;
      document.head.appendChild(newtitle);
    }
    const heading = document.createElement('h1');
    heading.innerHTML = articleTitle;
    articleInfo.appendChild(heading);
  }
  const articleAuthors = metadata.authors || [];
  for (let author of articleAuthors) {
    const name = author.name;
    const address = author.address;
    const authorP = document.createElement('p');
    authorP.classList.add('author');
    authorP.innerHTML = name + ', ' + address + '.';
    articleInfo.appendChild(authorP);
  }
  const keywords = metadata.keywords;
  const kw = document.createElement('p');
  kw.classList.add('keywords');
  kw.innerHTML = 'Keywords: ' + keywords.join(', ') + '.';
  articleInfo.appendChild(kw);

  const licensing = document.createElement('p');
  licensing.classList.add('license');

  licensing.innerHTML =
    'Derived from <a href="' +
    metadata.source +
    '">' +
    metadata.source +
    '</a>, ' +
    metadata.license +
    ' and licensed as such.';
  articleInfo.appendChild(licensing);
  return metadata;
};

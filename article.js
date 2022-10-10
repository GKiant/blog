
const paginationContainer = document.getElementById('pagination-container');
const createArticlesContainer = document.createElement('div');
createArticlesContainer.classList.add('articles-container')

document.getElementById('main-container').append(createArticlesContainer)

const getNumOfPages = async (page) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const done = await result.json();
  let numberOfPages = await done.meta.pagination.pages

  const container = document.createElement('div');
  container.classList.add('container-sm', 'd-flex', 'flex-row');

  paginationContainer.append(container);

  let link;

  for (let i = 1; i <= numberOfPages; i++) {
    link = document.createElement('a')
    link.classList.add('link-primary', 'navbar');

    link.innerHTML = `${i}`
    container.append(link)

    link.addEventListener('click', e => {
      e.preventDefault()
      if (i !== 1) {
        createArticlesContainer.innerHTML = ''
        window.location = `file:///C:/Projects/JS/last-homework/blog/index.html?page=${i}`
      } else {
        createArticlesContainer.innerHTML = ''
        window.location = `file:///C:/Projects/JS/last-homework/blog/index.html`
      }
    })
  }
}

const openArticle = async () => {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  const getArticle = await fetch(`https://gorest.co.in/public-api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const doneId = await getArticle.json();

  const paragraph = doneId.data.body;
  const createParagraph = document.createElement('p');
  createParagraph.classList.add('paragraph');
  createParagraph.innerHTML = paragraph;

  const header = doneId.data.title;
  const createHeader = document.createElement('h1');
  createHeader.innerHTML = header;

  createArticlesContainer.append(createHeader)
  createArticlesContainer.append(createParagraph)

  const getPageNum = await fetch(`https://gorest.co.in/public/v2/comments?post_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const commentItem = await getPageNum.json();

  const commentContainer = document.createElement('div')

  const commentAuthor = document.createElement('h4');
  commentAuthor.innerHTML = commentItem[0].name;

  const commentText = document.createElement('p');
  commentText.innerHTML = commentItem[0].body;

  createArticlesContainer.append(commentContainer);
  commentContainer.append(commentAuthor);
  commentContainer.append(commentText);


}

openArticle()
getNumOfPages()

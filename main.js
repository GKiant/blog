// import { openArticle } from "./article.js";

const paginationContainer = document.getElementById('pagination-container');
const createArticlesContainer = document.createElement('div');

const getNumOfPages = async (page = 1) => {
  const result = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const done = await result.json();
  let numberOfPages = await done.meta.pagination.pages
  console.log(done)

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

const openPage = async () => {
  let params = new URLSearchParams(window.location.search);
  let page = params.get("page");

  const getPageNum = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const doneId = await getPageNum.json();

  const createList = document.createElement('ul')
  
  document.getElementById('main-container').append(createArticlesContainer)
  createArticlesContainer.classList.add('articles-container')
  createArticlesContainer.append(createList);
  
  
  for (let i = 0; i < doneId.data.length; i++) {
    const header = doneId.data[i].title;

    const createListElement = document.createElement('li');
    createListElement.innerHTML = header;

    const createHeaderLink = document.createElement('a');
    createHeaderLink.classList.add('header-link')

    createList.append(createHeaderLink)
    createHeaderLink.append(createListElement)
    
    createHeaderLink.addEventListener('click', e => {
      e.preventDefault()
      if (i !== 1) {
        createArticlesContainer.innerHTML = '';
        window.location = `file:///C:/Projects/JS/last-homework/blog/article.html?id=${doneId.data[i].id}`;
        openArticle();
      } else {
        createArticlesContainer.innerHTML = '';
        window.location = `file:///C:/Projects/JS/last-homework/blog/article.html`;
        openArticle();
      }
    })
  }
}

const testFun = async () => {
  const getPageNum = await fetch(`https://gorest.co.in/public-api/comments?post_id=1033`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const doneId = await getPageNum.json();
  console.log(doneId)
}
testFun()

openPage()
getNumOfPages()


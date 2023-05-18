'use strict';

{
  const titleClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    // console.log(this);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    // console.log(activeLinks);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefClickedLink = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const articleToShow = document.querySelector(`article${hrefClickedLink}`);

    /* [DONE] add class 'active' to the correct article */
    articleToShow.classList.add('active');
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector ='.post-author';

  const generateTitleLinks = function (customSelector = '') {
    // [DONE] remove contents of titleList

    document.querySelector(optTitleListSelector).innerHTML = '';

    // for each article:
    //  [DONE] get id and store it to const
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    // console.log(optArticleSelector);
    // console.log(customSelector);
    // console.log(optArticleSelector + customSelector);

    let html = '';
    for (let article of articles) {
      // 	[DONE]const articleID = article.id
      const articleID = article.id;

      // [DONE] find element with title and store it to const
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      // [DONE] generate HTML code and store it to const,
      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }

    // [DONE] insert generated code to left column
    const ulList = document.querySelector('.titles');
    ulList.insertAdjacentHTML('afterbegin', html);

    const links = document.querySelectorAll('.titles a');
    links[0].classList.add('active');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();


  const generateTags= function(){
    /* [DONE] find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of allArticles){

      /* [DONE] find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let htmlTags = '';
    
      /* [DONE] get tags from data-tags attribute */
      const dataTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const dataTagsArr = dataTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of dataTagsArr){

        /* [DONE] generate HTML of the link */      
        const linkHTMLTags = `<li><a href="#tag-${tag}">${tag}</a></li>  `;

        /* [DONE] add generated code to html variable */
        htmlTags += linkHTMLTags;

      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('afterbegin', htmlTags);
    /* [DONE] END LOOP: for every article: */}
  };

 
  generateTags();


  const tagClickHandler = function (event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
   
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
   
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
   
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE]ind all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
   
    /* [DONE] START LOOP: for each active tag link */
    for (let link of tagLinksActive){
   
      /* [DONE] remove class active */
      link.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */ 
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksMatchingHref = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for (let activeTag of tagLinksMatchingHref){

      /* [DONE] add class active */
      activeTag.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags="' + tag + '"]');
  };


  const addClickListenersToTags = function (){
  /* [DONE] find all links to tags */
    const linksToTags = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for (let link of linksToTags){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    // [DONE] Find all articles
    const articles = document.querySelectorAll(optArticleSelector);

    // [DONE] For each article
    for (let article of articles){
      // Get author from attribute
      const author = article.getAttribute('data-author');

      // [DONE] Get author wrapper
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      
      // [DONE] Generate empty html for author
      let htmlAuthor = '';

      // [DONE] Generate html for author
      const linkHtmlAuthors = `<li><a href="#aut-${author}">by ${author}</a></li>`;
      htmlAuthor += linkHtmlAuthors;

      // [DONE] Insert html
      authorWrapper.insertAdjacentHTML('afterbegin', htmlAuthor);
    }

  };
  
  generateAuthors();

  const authorClickHandler = function(event){
  /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    //   /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#aut-', '');

    // [DONE] find all autor links with class active */
    const authorLinksActive = document.querySelectorAll('a.active[href^="#aut-"]');

    /* [DONE] START LOOP: for each active author link */
    for (let link of authorLinksActive){

      /* [DONE] remove class active */
      link.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */ 
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinksMatchingHref = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found author link */
    for (let activeAuthor of authorLinksMatchingHref){

      /* [DONE] add class active */
      activeAuthor.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }
 
    /* [DONE] execute function "generateTitleLinks" */
    generateTitleLinks('[data-author="' + author + '"]');
  
  };

  const addClickListenersToAuthors = function (){
  /* [DONE] find all links to authors */
    const linksToAuthors = document.querySelectorAll('a[href^="#aut-"]');

    /* [DONE] START LOOP: for each link */
    for (let link of linksToAuthors){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}




// const tagsSelectorSidebar = 'ul.list.tags';
// document.querySelector(optArticleTagsSelector).innerHTML='';
'strict mode';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  
  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);
  
  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);
  
  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('target Article', targetArticle);
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('targetArticle', targetArticle);

};
  
const optArticleSelector = '.post', 
  optTitleSelector = '.post-title', 
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  console.log('customSelector', customSelector);

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList', titleList);

  /* for each article */   

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles', articles);
  console.log('optArticleSelector + customSelector', optArticleSelector + customSelector);

  let html = '';
    
  for(let article of articles){

    /* get the article id */ 

    const articleId = article.getAttribute('id');
    console.log('articleId', articleId);

    /* find the title element */ /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"> <span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    /* insert link into titleList */
      
    html = html + linkHTML;
    
  }

  titleList.innerHTML = html;
  console.log('html', html);

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log('tagsList', tagsList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log('tagLink', tagLinkHTML);

      /* add generated code to html variable */

      html = html + tagLinkHTML;

    }/* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */ 

    tagsList.innerHTML = html;

  /* END LOOP: for every article: */
  }

} 
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag', tag);

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTagLinks', activeTagLinks);

  /* START LOOP: for each active tag link */ /* remove class active */

  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }     /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="'+ href +'"]');
  console.log(tagLinksHref);

  /* START LOOP: for each found tag link */ /* add class active */
  for(let tagLinkHref of tagLinksHref){
    tagLinkHref.classList.add('active');
  }      /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('allLinksToTags', allLinksToTags);

  /* START LOOP: for each link */ /* add tagClickHandler as event listener for that link */
  for(let link of allLinksToTags){
    link.addEventListener('click', tagClickHandler);

  } /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles);

  /*START LOOP for each article*/
  for(let article of articles){

    /* find author wrapper*/

    const authorList = article.querySelectorAll(optArticleAuthorSelector);
    console.log('authorList', authorList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-author attribute */

    const authorName = article.getAttribute('data-author');
    console.log('authorName', authorName);

    /* generate HTML of the link */

    const authorLinkHTML = '<li><a href="#author-' + authorName + '"> <span>' + authorName + '<span></a></li>';

    /* add generated code to html variable */

    html = html + authorLinkHTML;
    authorList.innerHTML = html;
  }
 
}
generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeAuthorLinks', activeAuthorLinks);

  /* START LOOP: for each active author link */ /* remove class active */

  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active');

  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinksHref = document.querySelectorAll('a[href="'+ href + '"]');

  /* START LOOP: for each found tag link */  /* add class active */
  for(let authorLinkHref of authorLinksHref){
    authorLinkHref.classList.add('active');

  } /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to author */

  const linksToAuthor = document.querySelectorAll('a[href^="#author-"]');
  console.log('linksToAuthor', linksToAuthor);

  /* START LOOP: for each link */

  for(let linkToAuthor of linksToAuthor){
    linkToAuthor.addEventListener('click', authorClickHandler);
  }

  /* END LOOP: for each link */
}

addClickListenersToAuthors();



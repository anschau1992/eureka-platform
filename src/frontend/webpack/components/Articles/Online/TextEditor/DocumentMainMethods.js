import {getDomain} from '../../../../../../helpers/getDomain.mjs';
import {serializeSavePatch} from '../../../../../../helpers/documentSerializer.mjs';

export const submitArticleDB = (draftId, article) => {
  return fetch(`${getDomain()}/api/articles/drafts/${draftId}/submit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      articleHash: '0x' + article.articleHash
    })
  });
};

export const saveArticle = (draftId, patch, linkedArticles) => {
  return fetch(`${getDomain()}/api/articles/drafts/${draftId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      document: serializeSavePatch(patch),
      linkedArticles: linkedArticles
    })
  });
};

export const fetchArticle = id => {
  return fetch(`${getDomain()}/api/articles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const fetchArticleByReviewId = reviewId => {
  return fetch(`${getDomain()}/api/reviews/${reviewId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const revertArticleToDraft = draftId => {
  return fetch(`${getDomain()}/api/articles/drafts/${draftId}/revert`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

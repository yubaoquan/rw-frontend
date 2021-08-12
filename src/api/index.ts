import { get, post } from 'utils/request';

export const getArticles = get('/articles');
export const addArticle = post('/projects');
export const fetchIndexConfig = get('/index-config');
export const getTags = get('/tags');

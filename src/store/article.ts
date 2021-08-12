import { makeAutoObservable, runInAction } from 'mobx';
import { getArticles, getTags } from 'api/index';
import { Article } from 'types';

export default class ArticleStore {
  articles: Article[] = [];

  tags: string[] = [];

  articlesCount: number = 0;

  loadingArticles = false;

  loadingTags = false;

  constructor() {
    makeAutoObservable(this);
  }

  /* 获取文章列表的异步操作 */
  fetchArticles = async () => {
    if (this.loadingArticles) return;
    this.loadingArticles = true;

    try {
      const resp = await getArticles();
      runInAction(() => {
        this.articles = resp.data.articles;
        this.articlesCount = resp.data.articlesCount;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.loadingArticles = false;
      });
    }
  };

  /** 获取标签列表 */
  fetchTags = async () => {
    if (this.loadingTags) return;
    this.loadingTags = true;

    try {
      const resp = await getTags();
      runInAction(() => {
        this.tags = resp.data.tags;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.loadingTags = false;
      });
    }
  };

  /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功 */
  // eatApple = (appleId) => {
  //   const targetApple = this.apples.find((apple) => apple.id === appleId);

  //   // targetApple?.isEaten = true;
  //   const a = targetApple?.isEaten;
  //   console.info('isEaten:', a);
  //   if (targetApple) targetApple.isEaten = true;
  // };
}

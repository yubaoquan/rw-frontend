import { makeAutoObservable, runInAction } from 'mobx';
import { getArticles } from 'api/index';
import { Article } from 'types';

export default class ArticleStore {
  articles: Article[] = [];

  articlesCount: number = 0;

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**  计算当前已吃和未吃苹果的状态 */
  // get status() {
  //   const status = {
  //     appleNow: { quantity: 0, weight: 0 },
  //     appleEaten: { quantity: 0, weight: 0 },
  //   };

  //   this.apples.forEach((apple) => {
  //     const selector = apple.isEaten ? 'appleEaten' : 'appleNow';
  //     status[selector].quantity++;
  //     status[selector].weight += apple.weight;
  //   });

  //   return status;
  // }

  /* 获取文章列表的异步操作 */
  fetchArticles = async () => {
    if (this.loading) return;
    this.loading = true;

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
        this.loading = false;
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

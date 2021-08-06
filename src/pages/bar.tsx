import { useEffect, useState } from 'react';
import { getArticles } from 'api/index';
import { Article } from 'types';

const bar = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const showArticals = async () => {
    try {
      const resp = await getArticles();
      console.info(resp.data);
      setArticles(resp.data.articles);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    showArticals();
  }, []);

  console.info('this is bar', articles.length);

  return (
    <>
      <div>this is bar</div>
      <div>
        {articles.map((article) => <div key={article.slug}>{article.title}</div>)}
      </div>
    </>
  );
};

export default bar;

import { useEffect, useState } from 'react';
import { getArticles } from 'api/index';
import Layout from 'layout/layout1';

interface IArticle {
  title: string;
}

const bar = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
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

  return (
    <Layout>
      <div>this is bar</div>
      <div>
        {articles.map((article) => <div>{article.title}</div>)}
      </div>
    </Layout>
  );
};

export default bar;

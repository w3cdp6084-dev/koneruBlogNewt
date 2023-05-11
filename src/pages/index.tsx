import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import { getArticles, getCategories } from '@/libs/client';
import type { Article, Category } from '@/types/article';
import HamburgerMenu from '../component/HamburgerMenu';
import { format } from 'date-fns';


export default function Home({ articles, categories }: { articles: Article[], categories: Category[] }) {
  return (
    <>
      <Head>
        <title>Newt・Next.jsブログ</title>
        <meta name="description" content="NewtとNext.jsを利用したブログです" />
      </Head>
      <main className="cover-content js--cover main">
        <div className='result active' id="bookAll">
          {articles.map((article) => {
            const createdAt = new Date(article._sys.createdAt);
            const formattedDate = format(createdAt, 'yyyy-MM-dd');
            return (
              <div key={article._id}>
                <div className={styles.cardOuter}>
                  <Link href={`articles/${article.slug}`}>
                    <div className={styles.cardInner}>
                      {article.coverImage && (
                        <img src={article.coverImage.src} alt={article.title} width="150" height="150" />
                      )}
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3>{article.title}</h3>
                      {article.categories.map((category) => (
                        <p key={category._id}>{category.name}</p>
                      ))}
                      <time>{formattedDate}</time>
                    </div>
                  </Link>
                  <p>read👀</p>
                </div>
              </div>
            );
          })}
        </div>
        <HamburgerMenu />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  console.log('Articles:', articles);
  return {
    props: {
      articles,
      categories,
    },
  };
};

import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.scss'
import { getArticles,getCategories } from '@/libs/client'
import type { Article,Category } from '@/types/article'
import HamburgerMenu from '../component/HamburgerMenu';
import { format } from 'date-fns';
import { useRef, useEffect } from 'react';

export default function Home({ articles, categories }: { articles: Article[], categories: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadGsapAndDraggable() {
      const { gsap } = await import('gsap');
      const { Draggable } = await import('gsap/Draggable');

      gsap.registerPlugin(Draggable);

      if (containerRef.current) {
        Draggable.create(containerRef.current, {
          type: 'x,y',
          edgeResistance: 0.8,
          throwProps: true,
        });
      }
    }

    loadGsapAndDraggable();
  }, []);
  return (
    <>
    <Head>
      <title>Newt・Next.jsブログ</title>
      <meta name="description" content="NewtとNext.jsを利用したブログです" />
    </Head>
    <div ref={containerRef}>
      <main className={styles.main}>
        <ul className={styles.cardBox}>
          {articles.map((article) => {
            const createdAt = new Date(article._sys.createdAt);
            const formattedDate = format(createdAt, 'yyyy-MM-dd');
            return (
              <li key={article._id} className={styles.cardOuter}>
                <Link href={`articles/${article.slug}`}>
                    <div className={styles.cardInner}>
                    {article.coverImage && (
                      <img src={article.coverImage.src} alt={article.title} width="150" height="150" />
                    )}
                    </div>
                    <h3>
                    {article.title}
                    </h3>
                    {article.categories.map((category) => (
                      <p key={category._id}>{category.name}</p>
                    ))}
                    <time>{formattedDate}</time>
                </Link>
                <p>read👀</p>
              </li>
            )
          })}
        </ul>
        <HamburgerMenu />
      </main>
      </div>
    </>
  )
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
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import { getArticles, getCategories } from '@/libs/client';
import type { Article, Category } from '@/types/article';
import HamburgerMenu from '../component/HamburgerMenu';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

export default function Home({ articles, categories }: { articles: Article[], categories: Category[] }) {
  return (
    <>
      <Head>
        <title>Newt・Next.jsブログ</title>
        <meta name="description" content="NewtとNext.jsを利用したブログです" />
      </Head>
      <div className='cover-content js--cover'>
        <div className='result active' id="bookAll">
          <div className='inner-content library'>
      <main className={styles.main}>
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          pagination={{ clickable: true }}
          className={styles.swiperContainer}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {articles.map((article) => {
            const createdAt = new Date(article._sys.createdAt);
            const formattedDate = format(createdAt, 'yyyy-MM-dd');
            return (
              <SwiperSlide key={article._id}>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
        <HamburgerMenu />
      </main>
      </div>
      </div>
      </div>
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

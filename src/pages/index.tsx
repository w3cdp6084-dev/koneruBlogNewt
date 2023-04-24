import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { getArticles } from '@/libs/client'
import type { Article } from '@/types/article'

export default function Home({ articles }: { articles: Article[] }) {
  return (
    <>
      <Head>
        <title>Newt・Next.jsブログ</title>
        <meta name="description" content="NewtとNext.jsを利用したブログです" />
      </Head>
      <main className={styles.main}>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article._id}>
                <Link href={`articles/${article.slug}`}>{article.title}</Link>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticles()
  return {
    props: {
      articles,
    },
  }
}
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { getArticles, getArticleBySlug } from '@/libs/client'
import type { Article } from '@/types/article'

export default function Article({ article }: { article: Article }) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content="投稿詳細ページです" />
      </Head>
      <main className={styles.main}>
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const articles = await getArticles()
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  return {
    props: {
      article,
    },
  }
}
// libs/client.ts
import { createClient } from 'newt-client-js'
import type { Article, Category } from '@/types/article'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

export const getArticles = async (): Promise<Article[]> => {
 const response = await client.getContents<Article>({
   appUid: 'blog',
   modelUid: 'article',
   query: {
     select: ['_id', 'title', 'slug', 'categories', 'coverImage', '_sys'],
     populate: 'categories',
   },
 });

 // Check the structure of the returned data


 // Extract the articles array from the response
 const articles = response.items;

 return articles;
};


export const getArticleBySlug = async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      slug,
      select: ['_id', 'title', 'slug', 'body'],
    },
  })
  return article;
}

export const getCategories = async (): Promise<Category[]> => {
 const response = await client.getContents<Category>({
   appUid: 'blog',
   modelUid: 'category',
   query: {
     select: ['_id', 'name', 'slug'],
   },
 })

 // Check the structure of the returned data
 console.log('getCategories response:', response);

 // Extract the categories array from the response
 const categories = response.items;

 return categories;
};


// types/article.ts
export type Article = {
 _id: string;
 title: string;
 slug: string;
 body: string;
 categories: Category[];
};


export type Category = {
 _id: string;
 name: string;
 slug: string;
};

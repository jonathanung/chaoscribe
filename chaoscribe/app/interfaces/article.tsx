import Comment from './comment';

export interface Article {
    id: string,
    source: string
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    chaosLevel: number;
    likes: Array<string>
    comments: Array<Comment>
};

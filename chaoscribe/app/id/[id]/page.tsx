"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../../components/navbar";
import LoginModal from '../../components/loginModal';
import axios from 'axios';
import Link from 'next/link';
import {Article} from '../../interfaces/article';
import Comment from '../..//interfaces/comment';

const ArticlePage = () => {
    const styles : React.CSSProperties = {
        backgroundImage: `url(\"../../chaoscribe-bg.png\")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        opacity: 0.05,
        position: 'fixed', 
        top: 0,            
        left: 0,           
        width: '100%',     
        zIndex: -1         
    };
    const bannerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundImage: 'url("../../../banner.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        zIndex: 1000
    };

    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [article, setArticle] = useState<Article>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [commentingArticleId, setCommentingArticleId] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const [currentComment, setCurrentComment] = useState<string>("");

    const getArticle = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/article/${id}`);
            setArticle(response.data);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Invalid', error);
        }
    };

    async function copyToClip(id: string) {
        // if (isLoggedIn) {
            await navigator.clipboard.writeText(location.href + `/id/${id}`);
            setCopySuccess(id);
            setTimeout(() => {
                setCopySuccess(null);
            }, 3000);
        // } else {
        //     setShowLoginModal(true);
        // }
        // rishit didn't like the anti-consumer twitter experience :(
    }

    const incrementLikes = (articleId: string) => {
        if (isLoggedIn) {
            // axios.post(`http://localhost:8000/api/articles/${articleId}/like`)
            //     .then((response) => {
            //         console.log(response.data);
            //         setArticles(articles.map((article: Article) => {
            //             if (article.id === articleId) {
            //                 return { ...article, likes: response.data.likes }
            //             }
            //             return article;
            //         }));
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        } else {
            setShowLoginModal(true);
        }
    }

    const incrementCommentLikes = (articleId: string, commentId: string) => {
        if (isLoggedIn) {
            // axios.post(`http://localhost:8000/api/articles/${commentId}/like`)
            //     .then((response) => {
            //         console.log(response.data);
            //         setArticles(articles.map((article: Article) => {
            //             if (article.id === articleId) {
            //                 return { ...article, likes: response.data.likes }
            //             }
            //             return article;
            //         }));
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        } else {
            setShowLoginModal(true);
        }
    }

    const postComment = (articleId: string) => { 
        if (isLoggedIn) {
            if (currentComment === "") {
                return;
            }
            // axios.post(`http://localhost:8000/api/articles/${articleId}/comment`, { text })
            //     .then((response) => {
            //         console.log(response.data);
            //         setArticles(articles.map((article: Article) => {
            //             if (article.id === articleId) {
            //                 return { ...article, comments: response.data.comments }
            //             }
            //             return article;
            //         }));
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        } else {
            setShowLoginModal(true);
        }
    }

    const deleteComment = (articleId: string, commentId: string) => {
        if (isLoggedIn) {
            // axios.delete(`http://localhost:8000/api/articles/${articleId}/comment/${commentId}`)
            //     .then((response) => {
            //         console.log(response.data);
            //         setArticles(articles.map((article: Article) => {
            //             if (article.id === articleId) {
            //                 return { ...article, comments: response.data.comments }
            //             }
            //             return article;
            //         }));
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        } else {
            setShowLoginModal(true);
        }
    }

    const toggleCommentingArticle = (articleId: string) => {
        if (commentingArticleId === articleId) {
            setCommentingArticleId(null);
            setCurrentComment("");
        }
        else {
            setCommentingArticleId(articleId);
        }
    }

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentComment(String(event.target.value));
    }


    useEffect(() => {
        getArticle();
    }, []);

    return (
        <main className="">
            <div style={styles}></div>
            <Navbar showFullNav={true} isLoggedIn={isLoggedIn} chaosLevel={0} setChaosLevel={() => { }} chaosMode={false} />
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            {article && (
                <div className="flex flex-col justify-between w-7/12 h-full p-4 mb-4 bg-slate-950 border rounded-lg shadow-md dark:border-gray-700 my-7">
                    <div className={`article-container`}>
                        <div className="">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">{article.title}</h2>
                            <h4 className="mt-2 text-sm text-gray-500 dark:text-gray-500">{article.author}</h4>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{article.content}</p>
                        </div>
                        <img className="mt-4 border rounded-lg" src={article.urlToImage} />
                    </div>
                    {copySuccess === article.id && (
                        <div className="mt-2 text-sm text-green-500 items-center flex justify-center">
                            <p>Link copied to clipboard!</p>
                        </div>
                    )}
                    <div className="items-end flex items-center justify-around mt-4"> 
                        <div>
                            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { incrementLikes(article.id) }}>
                                <svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194 s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38 C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64 c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484 c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8 s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8 s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452 c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295 c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64 c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947 c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194 c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631 c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032 c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079 C482.323,308.985,475.927,319.848,465.561,325.727z"></path> <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z"></path> <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z"></path> <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z"></path> <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z"></path> </g> </g></svg>
                                <span className="ml-2">{`${article.likes.length} ${article.likes.length === 1 ? `Like` : 'Likes'}`}</span>
                            </button>
                        </div>
                        <div>
                            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => toggleCommentingArticle(article.id)} >
                                <svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M100.186,272.245c0,28.42,10.085,57.209,27.67,78.987c18.538,22.958,42.761,35.602,68.206,35.602 c25.441,0,49.635-12.637,68.125-35.583c17.526-21.75,27.578-50.528,27.578-78.955V264c0-4.418-3.582-8-8-8s-8,3.582-8,8v8.295 c0,24.84-8.761,49.959-24.037,68.916c-15.392,19.103-35.161,29.623-55.666,29.623c-20.515,0-40.316-10.531-55.757-29.654 c-15.328-18.982-24.118-44.108-24.118-68.935v-7.127c0-21.307,11.795-50.01,16.382-60.363c29.741-3.409,58.625-2.487,85.917,2.772 c0.511,0.099,1.021,0.146,1.522,0.146c3.758,0,7.109-2.661,7.847-6.488c0.836-4.338-2.003-8.533-6.342-9.369 c-30.307-5.84-62.395-6.651-95.374-2.407c-0.018,0.002-0.034,0.007-0.051,0.009c-0.162,0.022-0.322,0.055-0.482,0.087 c-0.104,0.021-0.211,0.037-0.314,0.061c-0.108,0.026-0.213,0.061-0.32,0.092c-0.906,0.257-1.743,0.657-2.479,1.187 c-0.002,0.002-0.005,0.003-0.008,0.005c-0.075,0.054-0.143,0.115-0.216,0.172c-0.51,0.394-0.978,0.849-1.387,1.369 c-0.018,0.023-0.039,0.044-0.057,0.067c-0.081,0.106-0.154,0.22-0.23,0.33c-0.075,0.108-0.154,0.214-0.224,0.326 c-0.05,0.08-0.093,0.165-0.14,0.248c-0.087,0.152-0.174,0.303-0.252,0.46c-0.007,0.014-0.016,0.027-0.023,0.042 c-0.427,0.885-5.949,12.41-11.048,27.511c-2.654-14.919-5.041-31.48-5.041-42.806c0-29.059,16.68-42.066,33.21-42.066 c0.595,0,1.173-0.07,1.731-0.193c0.572,0.127,1.156,0.194,1.741,0.194c1.686,0,3.387-0.531,4.833-1.63 c13.29-10.095,31.032-12.97,57.527-9.324c4.373,0.601,8.414-2.457,9.016-6.834c0.603-4.377-2.458-8.414-6.834-9.016 c-20.202-2.781-45.891-3.979-67.197,10.845c-0.269-0.027-0.541-0.041-0.817-0.041c-28.975,0-49.21,23.878-49.21,58.066 c0,25.585,10.626,72.951,12.319,80.333V272.245z"></path> <path d="M340.732,407.134c-0.161-0.045-0.322-0.084-0.485-0.12l-65.228-13.946c-6.513-1.448-7.019-8.417-7.019-10.518v-3.716 c0-4.418-3.582-8-8-8s-8,3.582-8,8v3.716c0,12.412,6.746,22.206,17.429,25.566c-17.303,19.682-44.477,31.559-73.429,31.559 c-28.949,0-56.124-11.878-73.428-31.558c10.457-3.308,17.094-13.107,17.094-25.567v-3.716c0-4.418-3.582-8-8-8s-8,3.582-8,8v3.716 c0,2.715-0.651,9.176-6.622,10.504l-65.291,13.96c-0.163,0.035-0.325,0.075-0.485,0.12c-14.224,3.985-26.325,12.805-34.997,25.506 C8.358,444.231,4,458.223,4,472.038v15.522C4,501.036,16.011,512,30.775,512h330.45C375.989,512,388,501.036,388,487.56v-15.522 c0-13.815-4.358-27.807-12.271-39.398C367.057,419.939,354.956,411.119,340.732,407.134z M372,487.56 c0,4.575-4.935,8.44-10.775,8.44H30.775C24.935,496,20,492.135,20,487.56v-15.522c0-19.578,12.142-42.799,35.354-49.432 l49.812-10.651c19.824,27.068,54.183,43.719,90.834,43.719c36.655,0,71.01-16.651,90.834-43.719l49.813,10.651 C359.858,429.239,372,452.46,372,472.038V487.56z"></path> <path d="M452,0H276c-30.878,0-56,25.122-56,56v96c0,25.064,16.461,46.631,40,53.614v23.072c0,6.495,3.877,12.297,9.877,14.782 c1.991,0.825,4.075,1.226,6.139,1.226c4.155,0,8.229-1.626,11.297-4.694l32-32H452c30.878,0,56-25.122,56-56V56 C508,25.122,482.878,0,452,0z M492,152c0,22.056-17.944,40-40,40H316c-2.122,0-4.157,0.843-5.657,2.343L276,228.679v-29.406 c0-3.901-2.814-7.233-6.66-7.887C250.333,188.156,236,171.224,236,152V56c0-22.056,17.944-40,40-40h176c22.056,0,40,17.944,40,40 V152z"></path> <path d="M452,48H276c-4.418,0-8,3.582-8,8s3.582,8,8,8h176c4.418,0,8-3.582,8-8S456.418,48,452,48z"></path> <path d="M276,112h16c4.418,0,8-3.582,8-8s-3.582-8-8-8h-16c-4.418,0-8,3.582-8,8S271.582,112,276,112z"></path> <path d="M452,96H324c-4.418,0-8,3.582-8,8s3.582,8,8,8h128c4.418,0,8-3.582,8-8S456.418,96,452,96z"></path> <path d="M452,144H276c-4.418,0-8,3.582-8,8s3.582,8,8,8h176c4.418,0,8-3.582,8-8S456.418,144,452,144z"></path> </g> </g></svg>
                                <span className="ml-2">{`${article.comments.length} ${article.comments.length === 1 ? `Comment` : 'Comments'}`}</span>
                            </button>
                        </div>
                        <div>
                            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => copyToClip(article.id)}>
                                <svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.994 511.994" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M511.986,56.391c0.003-0.061,0.005-0.121,0.007-0.182c0.002-0.07-0.002-0.139-0.002-0.209c0-0.13,0.002-0.26-0.004-0.389 c-0.005-0.11-0.017-0.219-0.027-0.328c-0.001-0.014-0.002-0.029-0.004-0.043c-0.006-0.063-0.008-0.127-0.016-0.19 c-0.008-0.071-0.018-0.141-0.028-0.211c-0.015-0.103-0.037-0.205-0.056-0.308c-0.026-0.143-0.051-0.286-0.086-0.428 c-0.004-0.015-0.007-0.03-0.011-0.045c-0.025-0.1-0.058-0.198-0.087-0.298c-0.04-0.139-0.079-0.277-0.127-0.414 c-0.023-0.066-0.049-0.13-0.073-0.195c-0.023-0.06-0.049-0.117-0.073-0.177c0-0.001-0.001-0.003-0.002-0.004 c-0.046-0.113-0.089-0.226-0.14-0.337c-0.057-0.124-0.123-0.243-0.186-0.364c-0.031-0.06-0.061-0.12-0.094-0.179 c-0.028-0.05-0.053-0.1-0.082-0.149c-0.099-0.167-0.209-0.33-0.32-0.491c-0.036-0.052-0.066-0.107-0.103-0.159 c-0.002-0.003-0.004-0.005-0.006-0.008c-0.005-0.007-0.011-0.014-0.016-0.021c-0.099-0.135-0.21-0.264-0.319-0.394 c-0.068-0.081-0.132-0.167-0.202-0.244c-0.031-0.034-0.065-0.067-0.097-0.102c-0.05-0.054-0.105-0.104-0.157-0.156 c-0.11-0.111-0.218-0.224-0.333-0.328c-0.007-0.007-0.014-0.014-0.021-0.021c-0.047-0.042-0.097-0.076-0.145-0.116 c-0.022-0.019-0.045-0.037-0.068-0.056c-0.034-0.029-0.063-0.062-0.098-0.09c-0.023-0.018-0.048-0.031-0.071-0.05 c-0.075-0.059-0.148-0.119-0.224-0.175c-0.074-0.054-0.152-0.101-0.227-0.153c-0.14-0.095-0.28-0.191-0.425-0.276 c-0.106-0.063-0.216-0.117-0.324-0.174c-0.118-0.063-0.235-0.127-0.356-0.184c-0.05-0.023-0.1-0.047-0.151-0.069 c-0.032-0.014-0.064-0.024-0.096-0.038c-0.052-0.022-0.104-0.041-0.156-0.062c-0.102-0.041-0.203-0.084-0.306-0.121 c-0.111-0.04-0.223-0.072-0.335-0.106c-0.065-0.02-0.129-0.04-0.195-0.058c-0.069-0.019-0.138-0.04-0.208-0.058 c-0.148-0.037-0.297-0.064-0.447-0.093c-0.084-0.016-0.167-0.038-0.252-0.051c-0.022-0.003-0.045-0.004-0.067-0.008 c-0.138-0.02-0.277-0.032-0.415-0.045c-0.119-0.011-0.237-0.024-0.356-0.031c-0.054-0.003-0.107-0.006-0.161-0.007 c-0.063-0.002-0.126,0.002-0.189,0.002c-0.009,0-0.018,0-0.027,0c-0.134,0-0.268-0.002-0.402,0.004 c-0.107,0.005-0.214,0.017-0.321,0.026c-0.071,0.006-0.142,0.01-0.213,0.018c-0.08,0.009-0.159,0.018-0.238,0.03 c-0.106,0.015-0.211,0.038-0.317,0.057c-0.132,0.025-0.265,0.046-0.396,0.077c-0.015,0.004-0.03,0.009-0.046,0.013 c-0.111,0.027-0.221,0.062-0.331,0.094c-0.135,0.039-0.27,0.077-0.403,0.124c-0.065,0.022-0.128,0.048-0.192,0.072 c-0.017,0.006-0.034,0.01-0.051,0.016l-496,192c-3.084,1.194-5.116,4.162-5.112,7.469c0.003,3.307,2.042,6.271,5.128,7.458 l147.877,56.876l47.385,146.125c0.007,0.021,0.018,0.039,0.025,0.059c0.014,0.043,0.024,0.087,0.039,0.13 c0.112,0.319,0.251,0.629,0.404,0.934c0.032,0.063,0.065,0.124,0.098,0.186c0.149,0.279,0.313,0.551,0.497,0.813 c0.024,0.035,0.045,0.072,0.07,0.106c0.012,0.017,0.024,0.034,0.037,0.051c0.014,0.018,0.029,0.034,0.043,0.053 c0.06,0.08,0.127,0.157,0.191,0.235c0.076,0.094,0.148,0.19,0.228,0.281c0.062,0.069,0.13,0.133,0.195,0.2 c0.03,0.031,0.06,0.062,0.09,0.093c0.046,0.046,0.089,0.095,0.136,0.14c0.049,0.047,0.096,0.095,0.146,0.141 c0.048,0.044,0.1,0.084,0.15,0.126c0.154,0.135,0.31,0.266,0.474,0.39c0.01,0.008,0.019,0.016,0.029,0.024 c0.015,0.011,0.033,0.019,0.048,0.03c0.05,0.036,0.101,0.069,0.151,0.104c0.257,0.179,0.527,0.344,0.808,0.493 c0.046,0.024,0.089,0.055,0.135,0.078c0.015,0.008,0.03,0.013,0.045,0.021c0.264,0.131,0.535,0.252,0.819,0.356 c0.06,0.022,0.121,0.037,0.181,0.057c0.079,0.027,0.158,0.051,0.238,0.075c0.344,0.105,0.69,0.19,1.037,0.248 c0.016,0.003,0.031,0.008,0.047,0.011c0.033,0.005,0.066,0.004,0.099,0.009c0.383,0.056,0.767,0.09,1.147,0.09c0,0,0.001,0,0.001,0 h0c0,0,0,0,0.001,0c0.031,0,0.061-0.007,0.092-0.007c0.329-0.004,0.657-0.031,0.983-0.075c0.049-0.007,0.099-0.006,0.147-0.013 c0.07-0.011,0.14-0.036,0.21-0.049c0.253-0.046,0.503-0.104,0.751-0.175c0.081-0.023,0.163-0.038,0.243-0.063 c0.014-0.004,0.028-0.006,0.042-0.01c0.038-0.012,0.074-0.03,0.112-0.043c0.119-0.04,0.235-0.088,0.352-0.134 c0.156-0.062,0.311-0.125,0.461-0.195c0.023-0.01,0.046-0.018,0.069-0.029c0.013-0.007,0.028-0.011,0.041-0.017 c0.075-0.036,0.146-0.08,0.22-0.119c0.155-0.081,0.306-0.167,0.454-0.257c0.098-0.06,0.195-0.12,0.29-0.184 c0.001-0.001,0.002-0.001,0.003-0.002c0.028-0.019,0.057-0.035,0.085-0.054c0.133-0.092,0.259-0.193,0.386-0.292 c0.074-0.058,0.149-0.112,0.221-0.173c0.079-0.067,0.155-0.138,0.231-0.208c0.059-0.053,0.115-0.109,0.173-0.165 c0.246-0.239,0.48-0.489,0.693-0.756c0.018-0.022,0.037-0.043,0.055-0.066c0.023-0.03,0.043-0.063,0.065-0.093 c0.017-0.022,0.037-0.041,0.054-0.064l58.457-78.995c2.628-3.552,1.88-8.561-1.672-11.189c-3.551-2.628-8.562-1.879-11.189,1.672 l-25.398,34.322l20.186-55.106l191.072,72.521c0.918,0.348,1.88,0.521,2.838,0.521c1.399,0,2.792-0.367,4.031-1.089 c2.086-1.217,3.511-3.311,3.877-5.698l55.275-360.502c0.003-0.017,0.002-0.034,0.004-0.051c0.019-0.133,0.03-0.266,0.043-0.399 C511.967,56.634,511.98,56.513,511.986,56.391z M449.557,85.646L221.052,251.603c-3.575,2.596-4.368,7.599-1.772,11.174 c1.565,2.155,4.005,3.299,6.479,3.299c1.63,0,3.275-0.497,4.695-1.528l218.284-158.534L244.445,335.408 c-0.793,0.782-1.44,1.738-1.861,2.848c-0.072,0.188-0.127,0.379-0.184,0.569l-33.94,92.653l-41.413-127.707 c-0.773-2.384-2.56-4.154-4.728-4.993c-0.012-0.005-0.023-0.011-0.036-0.016L30.223,247.969L449.557,85.646z M442.316,405.506 l-178.528-67.76L491.995,81.501L442.316,405.506z"></path> <path d="M185.506,295.311c1.63,0,3.275-0.497,4.695-1.528l15.55-11.294c3.575-2.596,4.368-7.599,1.772-11.174 c-2.597-3.575-7.6-4.368-11.174-1.772l-15.55,11.294c-3.575,2.596-4.368,7.599-1.772,11.174 C180.592,294.167,183.032,295.311,185.506,295.311z"></path> </g> </g></svg>
                                <span className="ml-2">Share</span>
                            </button>
                        </div>
                    </div>
                    {commentingArticleId === article.id && (
                    <div className="mt-4 flex flex-col">
                        <input
                                className="w-full p-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring"
                                placeholder="Write a comment..."
                                value={currentComment}
                                onChange={handleCommentChange}
                        />
                        <button
                        className="mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none focus:ring"
                        onClick={() => {
                            postComment(article.id);
                        }}
                        >
                        Send
                                </button>
                    </div>
                        )}
                        <div className="flex flex-col justify-between w-full h-full p-4 mb-4 bg-gray-900 border rounded-lg shadow-md dark:border-gray-700 my-7">
                        <h5 className="mb-2">{article.comments.length} Comments</h5>
                        {comments.map((comment, i) => {
                            return (
                                <div key={i} className="flex flex-row justify-between align-center">
                                    <p className="text-xs font-medium text-gray-200 dark:text-gray-200">{comment.userId}</p> 
                                    {/* We should replace the user ID above with the name of the commenter, grabbed by the API */}
                                    <div className="flex flex-col w-full h-full p-2 mb-1 bg-slate-800 border rounded-lg shadow-md dark:border-gray-700 my-7">
                                        <p className="text-sm text-gray-400 dark:text-gray-550">{comment.text}</p>
                                    </div>
                                    <div className="flex flex-row mt-7 ml-4 w-5/12 justify-around">
                                        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { incrementCommentLikes(article.id, comment.id) }}>
                                            <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194 s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38 C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64 c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484 c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8 s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8 s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452 c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295 c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64 c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947 c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194 c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631 c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032 c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079 C482.323,308.985,475.927,319.848,465.561,325.727z"></path> <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z"></path> <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z"></path> <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z"></path> <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z"></path> </g> </g></svg>
                                            <span className="ml-2">{`${comment.likes.length} ${comment.likes.length === 1 ? `Like` : 'Likes'}`}</span>
                                        </button>
                                        {/* This should be conditionally rendered */}
                                        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { deleteComment(article.id, comment.id) }}>
                                            <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20px" width="20px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
                                            <span className="ml-2">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )}
            </div>
            <div style={bannerStyle}></div>
            {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
        </main>
    );
};

export default ArticlePage;

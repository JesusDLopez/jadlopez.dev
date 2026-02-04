import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadPost } from '../../posts/load.js';
import Footer from '../Footer';
import "../../styles/BlogPost.css";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPost(slug).then((data) => {
      if (data) {
        setPost(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    });
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset any height/overflow manipulation from HomePage
    document.body.style.height = '';
    document.body.style.minHeight = '';
    document.body.style.maxHeight = '';
    document.documentElement.style.height = '';
    document.documentElement.style.overflow = '';
  }, [slug]);

  if (notFound) {
    return <h1>404 - Post Not Found</h1>;
  }

  if (!post) return <p>Loading...</p>;

  const { Component, title } = post;

  return (
    <>
      <article className="blog-post">
        <h1>{title}</h1>
        <Component />
      </article>
      <Footer />
    </>
  );
}

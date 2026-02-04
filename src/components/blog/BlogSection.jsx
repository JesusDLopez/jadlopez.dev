import { useEffect } from "react";
import BlogItem from "./BlogItem";
import PlaceholderCard from "./PlaceholderCard";
import posts from "../../posts/index.js";
import "../../Styles/Blog.css";

export default function BlogSection() {
  const blogPosts = posts;
  // Ensure clean scroll/height when entering the blog route
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.height = '';
    document.body.style.minHeight = '';
    document.body.style.maxHeight = '';
    document.documentElement.style.height = '';
    document.documentElement.style.overflow = '';
  }, []);
  return (
    <section
      id="blog"
      className="screen-section blog-wrapper"
    >
      <div className="blog-layout">
        {/* Left column: Intro panel */}
        <div className="blog-intro-panel">
          <h2 className="blog-intro-title">Field Notes</h2>
          <p className="blog-intro-subtitle">Reflections on genetics, technology, and the human experience.</p>
          <p className="blog-intro-description">
            A space for my thoughts spanning philosophy, statistics, and psychology.
            Here, I explore how code and genetics illuminate our understanding of
            ourselves and the world. This archive is just beginning—expect more soon.
          </p>
        </div>

        {/* Right column: All cards container */}
        <div className="blog-cards-column">
          {/* Featured article - top of right column */}
          {blogPosts.length > 0 && (
            <BlogItem {...blogPosts[0]} featured={true} />
          )}

          {/* Placeholder cards shelf - below featured article */}
          <div className="publication-shelf">
            <PlaceholderCard label="Coming Soon" />
            <PlaceholderCard label="Coming Soon" />
            <PlaceholderCard label="Coming Soon" />
            <PlaceholderCard label="Coming Soon" />
          </div>
        </div>
      </div>
    </section>
  );
}

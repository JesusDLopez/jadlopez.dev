import { Link } from "react-router-dom";

export default function BlogItem({ title, excerpt, tags, link, image, size, featured }) {
  const sizeClass = size ? ` ${size}` : "";
  const featuredClass = featured ? " featured" : "";
  const tagList = Array.isArray(tags) ? tags : [];
  return (
    <Link className={`blog-card${sizeClass}${featuredClass}`} to={link}>
      <img src={image} alt={title} className="card-image" />
      <div className="blog-card-overlay" />
      <div className="blog-card-content">
        <h3>{title}</h3>
        <p className="excerpt">{excerpt}</p>
        <div className="tags">
          {tagList.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

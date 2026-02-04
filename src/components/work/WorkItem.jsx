// src/components/WorkItem.jsx
export default function WorkItem({
  title,
  description,
  tags,
  link,
  ShaderComponent,
  icon,
  bg,
}) {
  return (
    <div className="work-item" style={bg ? { background: bg } : undefined}>
      <div className="shader-surface">
        {ShaderComponent ? (
          <ShaderComponent />
        ) : icon ? (
          <img src={icon} alt="" className="work-icon" />
        ) : (
          <div className="shader-placeholder" />
        )}
      </div>
      <div className="work-meta">
        <h3>
          {icon && <img src={icon} alt="" className="work-icon" />}
          {title}
        </h3>
        <p>{description}</p>
        <div className="tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <a href={link} className="work-link">
          View Project →
        </a>
      </div>
    </div>
  );
}

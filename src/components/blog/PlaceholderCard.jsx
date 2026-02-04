export default function PlaceholderCard({ label = "Coming Soon" }) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-content">
        <div className="placeholder-icon">📝</div>
        <p className="placeholder-label">{label}</p>
      </div>
    </div>
  );
}

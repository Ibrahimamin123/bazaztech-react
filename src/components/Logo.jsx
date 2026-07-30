import logoImg from "../images/logo-head.png";

const Logo = ({ className = "", alt = "BazazTech", showText = false }) => (
  <div className={`d-flex align-items-center gap-2 ${className}`}>
    <img src={logoImg} alt={alt} className="admin-logo-img" />
    {showText && (
      <div className="admin-logo-text">
        <span className="admin-logo-title">BazazTech</span>
        <small className="admin-logo-tag">Gateway To Success</small>
      </div>
    )}
  </div>
);

export default Logo;

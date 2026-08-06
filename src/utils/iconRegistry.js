import {
  FaStar,
  FaTrophy,
  FaRocket,
  FaHeart,
  FaThumbsUp,
  FaUsers,
  FaChartLine,
  FaAward,
  FaBriefcase,
  FaGlobe,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaBullseye,
  FaHandshake,
  FaLightbulb,
  FaGem,
  FaCrown,
  FaMedal,
  FaFire,
  FaSmile,
  FaDollarSign,
  FaChartBar,
  FaGraduationCap,
} from "react-icons/fa";

// A curated set of react-icons suitable for the Hero Stats Cards. Keyed by
// a stable string name that's what actually gets stored on the StatsCard
// document (`icon` field) — components aren't serializable, so we store
// the name and resolve it back to a component on both the dashboard and
// the public site via this same registry.
export const ICON_REGISTRY = {
  FaStar: { label: "Star", Icon: FaStar },
  FaTrophy: { label: "Trophy", Icon: FaTrophy },
  FaRocket: { label: "Rocket", Icon: FaRocket },
  FaHeart: { label: "Heart", Icon: FaHeart },
  FaThumbsUp: { label: "Thumbs Up", Icon: FaThumbsUp },
  FaUsers: { label: "Users", Icon: FaUsers },
  FaChartLine: { label: "Growth", Icon: FaChartLine },
  FaAward: { label: "Award", Icon: FaAward },
  FaBriefcase: { label: "Briefcase", Icon: FaBriefcase },
  FaGlobe: { label: "Globe", Icon: FaGlobe },
  FaCheckCircle: { label: "Check", Icon: FaCheckCircle },
  FaClock: { label: "Clock", Icon: FaClock },
  FaShieldAlt: { label: "Shield", Icon: FaShieldAlt },
  FaBullseye: { label: "Target", Icon: FaBullseye },
  FaHandshake: { label: "Handshake", Icon: FaHandshake },
  FaLightbulb: { label: "Idea", Icon: FaLightbulb },
  FaGem: { label: "Gem", Icon: FaGem },
  FaCrown: { label: "Crown", Icon: FaCrown },
  FaMedal: { label: "Medal", Icon: FaMedal },
  FaFire: { label: "Fire", Icon: FaFire },
  FaSmile: { label: "Smile", Icon: FaSmile },
  FaDollarSign: { label: "Dollar", Icon: FaDollarSign },
  FaChartBar: { label: "Chart", Icon: FaChartBar },
  FaGraduationCap: { label: "Graduation Cap", Icon: FaGraduationCap },
};

export const getIconComponent = (name) => ICON_REGISTRY[name]?.Icon || null;

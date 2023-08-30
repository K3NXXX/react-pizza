import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f5f0f0"
    foregroundColor="#e8e8e8"
  >
    <circle cx="142" cy="123" r="120" /> 
    <rect x="0" y="262" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="417" rx="10" ry="10" width="129" height="45" /> 
    <rect x="149" y="417" rx="10" ry="10" width="130" height="45" />
  </ContentLoader>
)

export default Skeleton
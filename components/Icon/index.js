const Icon = ({ children: icon, className }) => (
  <>{icon ? <img className={className} title={icon} src={require(`./${icon.toLowerCase()}.svg`)} alt={icon} /> : null}</>
)

export default Icon;

const Panel = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className="drop">
      {children}
    </div>
  );
}

export default Panel;


const Checkbox = ({ children, ...rest }) => {

  return (
    <div>
      <p>
        <label>
          <input type="checkbox" {...rest} />
          <span>{children}</span>
        </label>
      </p>
    </div>
  )
}

export default Checkbox;
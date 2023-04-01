
const InputText = ({ children, type, ...rest }) => {
  return (
    <div>
      <div>
        <label>{children}</label>
      </div>
      <div>
        <input type={type} {...rest} />
      </div>
    </div>
  )
}

export default InputText;
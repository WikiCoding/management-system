import { useState, useRef } from 'react';
import Panel from './Panel';

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="drop"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="drop">
      <label>Select your role</label>
      <Panel
        className="drop"
        onClick={handleClick}
      >
        {value?.label || 'Select...'}
      </Panel>
      {isOpen && <Panel className="drop">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
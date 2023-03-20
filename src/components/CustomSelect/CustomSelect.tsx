import { useEffect, useRef, useState } from 'react';
import { CustomSelectProps } from '../../types/CustomSelectProps';
import './CustomSelect.scss';

export function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value1: string) => {
    setIsOpen(false);
    onChange(value1);
  };

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className="custom-select-wrapper">
      <div
        className={`custom-select ${isOpen ? 'open' : ''}`}
        onClick={handleClick}
        tabIndex={0}
      >
        <div className="selected-option">{selectedLabel}</div>
      </div>
      {isOpen && (
        <div className="options-wrapper">
          <div className="options">
            {options.map((option) => (
              <div
                key={option.value}
                className="option"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { CustomSelectProps } from '../../types/CustomSelectProps';
import { Option } from '../../types/Option';
import './CustomSelect.scss';

export function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const [selectedOnKey, setSelectedOnKey] = useState(selectedOption);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (newValue: string) => {
    setIsOpen(false);
    onChange(newValue);
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = selectedOnKey ? options.indexOf(selectedOnKey) : 0;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = index === 0 ? options.length - 1 : index - 1;

      setSelectedOnKey(options[nextIndex]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = index === options.length - 1 ? 0 : index + 1;

      setSelectedOnKey(options[nextIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen((prev) => !prev);
      onChange(selectedOnKey?.value || value);
    } else if (event.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleOptionMouseEnter = (option: Option) => {
    setSelectedOnKey(option);
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
    <div
      ref={wrapperRef}
      className="custom-select-wrapper"
      onKeyDown={handleOptionKeyDown}
      tabIndex={0}
    >
      <div
        className={classNames('custom-select', { open: isOpen })}
        onClick={handleClick}
      >
        <div>{selectedOption?.label}</div>
      </div>
      {isOpen && (
        <div className="options-wrapper">
          <div className="options">
            {options.map((option) => (
              <div
                key={option.value}
                className={classNames('option', {
                  'selected-option': option.value === selectedOnKey?.value,
                })}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => handleOptionMouseEnter(option)}
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

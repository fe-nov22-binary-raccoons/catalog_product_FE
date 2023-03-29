import classNames from 'classnames';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { CustomSelectProps } from '../../types/CustomSelectProps';
import { Option } from '../../types/Option';
import './CustomSelect.scss';

import { ReactComponent as ArrowDown } from '../../icons/arrows/arrow-down.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export const CustomSelect: React.FC<CustomSelectProps> = memo(({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { iconColor } = useContext(ThemeContext);
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

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        const nextIndex = index === 0 ? options.length - 1 : index - 1;

        setSelectedOnKey(options[nextIndex]);
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = index === options.length - 1 ? 0 : index + 1;

        setSelectedOnKey(options[nextIndex]);
        break;
      }

      case 'Escape':
        setIsOpen(false);
        break;
      case 'Enter':
      case ' ':
        setIsOpen((prev) => !prev);
        onChange(selectedOnKey?.value || value);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleOptionMouseEnter = (option: Option) => {
    setSelectedOnKey(option);
  };

  function useOutsideClick(ref: React.RefObject<HTMLDivElement>) {
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

  useOutsideClick(wrapperRef);

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
        <div>
          {selectedOption?.label}
        </div>
        <ArrowDown
          fill={iconColor === '#0f0f11' ? '#b4bdc4' : '#4a4d58'}
          className={classNames({ 'select-icon': isOpen })} />
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
});

CustomSelect.displayName = 'CustomSelect';

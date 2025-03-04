import React, { useState } from 'react';
import styles from './Select.module.scss';
import cn from 'classnames';
import ArrowUpIcon from '@/assets/arrow-up.svg'
import ArrowDownIcon from '@/assets/arrow-down.svg';
import { useOutsideClick } from '@/utils/useOutsideClick';

interface SelectProps {
  options: { value: string | number; label: string }[];
  placeholder?: string;
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(defaultValue);
  const ref = useOutsideClick(() => {
    setIsOpen(false)
  })
  const handleOptionClick = (value: string | number) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={styles.select}>
      <div className={styles.select_header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.select_value}>
          {options.find((e)=> e.value === selectedValue)?.label || placeholder || 'Выберите значение'}
        </span>
        <img
          src={isOpen ? ArrowUpIcon : ArrowDownIcon}
          alt={isOpen ? 'Close' : 'Open'}
          className={styles.select_icon}
        />
      </div>
      {isOpen && (
        <div className={styles.select_options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(styles.select_option, option.value === selectedValue && styles.select_option_active)}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
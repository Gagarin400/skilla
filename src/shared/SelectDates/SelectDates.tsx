import React, { useState } from 'react';
import styles from './SelectDates.module.scss';
import cn from 'classnames';
import Icon from '../Icon/Icon';
import { SelectDatesType } from '@/types/selectDatesType';
import dayjs from 'dayjs';
import { DatesType } from '@/types/datesType';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useOutsideClick } from '@/utils/useOutsideClick';
import DateInput from '../DateInput/DateInput';

interface SelectDatesProps {
  placeholder?: string;
  defaultValue?: SelectDatesType;
  onChange: (value: SelectDatesType) => void;
  }
dayjs.extend(isoWeek);

const SelectDates: React.FC<SelectDatesProps> = ({ placeholder, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectDatesType | undefined>(defaultValue);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const getDatesRange = (type: DatesType) => {
    const today = dayjs(new Date());
    switch (type) {
      case 'days':
        return {
          start: today.add(-2, 'day').format('DD.MM.YYYY'),
          end: today.format('DD.MM.YYYY'),
        };
      case 'week':
        return {
          start: today.startOf('isoWeek').format('DD.MM.YYYY'),
          end: today.endOf('isoWeek').format('DD.MM.YYYY'),
        };
      case 'month':
        return {
          start: today.startOf('month').format('DD.MM.YYYY'),
          end: today.endOf('month').format('DD.MM.YYYY'),
        };
      case 'year':
        return {
          start: today.startOf('year').format('DD.MM.YYYY'),
          end: today.endOf('year').format('DD.MM.YYYY'),
        };
      default:
        return {
          start: today.add(-2, 'day').format('DD.MM.YYYY'),
          end: today.format('DD.MM.YYYY'),
        };
    }
  };

  const handleOptionClick = (value: DatesType) => {
    const newDates = getDatesRange(value);
    const newValue = {
      type: value,
      start: newDates.start,
      end: newDates.end,
    };
    setSelectedValue(newValue);
    onChange(newValue);
    setIsOpen(false);
  };

  const handleCustomDateChange = (startDate: string, endDate: string) => {
    if (dayjs(startDate, 'DD.MM.YYYY', true).isValid() && dayjs(endDate, 'DD.MM.YYYY', true).isValid()) {
      const newValue: SelectDatesType = {
        type: 'custom',
        start: startDate,
        end: endDate,
      };
      setSelectedValue(newValue);
      onChange(newValue);
    } else {
      setSelectedValue((prev) =>
        prev?.type === 'custom' ? { type: 'custom', start: '', end: '' } : prev
      );
    }
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (!selectedValue) return;

    const currentIndex = options.findIndex((option) => option.value === selectedValue.type);
    let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }

    const newOption = options[newIndex];
    const newDates = getDatesRange(newOption.value);

    const newValue = {
      type: newOption.value,
      start: newDates.start,
      end: newDates.end,
    };
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const options: { value: DatesType; label: string }[] = [
    { value: 'days', label: '3 дня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'year', label: 'Год' },
  ];

  return (
    <div ref={ref} className={styles.select}>
      <div className={styles.select_header}>
        {selectedValue?.type !== 'custom' && <Icon
          name="arrow-left"
          className={styles.select_icon}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleArrowClick('left');
          }}
        />}
        <div className={styles.select_value} onClick={() => setIsOpen(!isOpen)}>
          <Icon name="icon-calendar" className={styles.select_icon} />
          <span>
            {selectedValue?.type === 'custom'
              ? `${selectedValue.start || ''} - ${selectedValue.end || ''}`
              : options.find((e) => e.value === selectedValue?.type)?.label ||
                placeholder ||
                'Выберите значение'}
          </span>
        </div>
        {selectedValue?.type !== 'custom' && <Icon
          name="arrow-right"
          className={styles.select_icon}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleArrowClick('right');
          }}
        />}
      </div>
      {isOpen && (
        <div className={styles.select_options}>
          {/* Стандартные опции */}
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                styles.select_option,
                option.value === selectedValue?.type && styles.select_option_active
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
          {/* Блок для пользовательских дат */}
          <div className={styles.select_custom_option}>
            <DateInput
              defaultValue={
                selectedValue?.type === 'custom'
                  ? { startDate: selectedValue?.start, endDate: selectedValue?.end }
                  : { startDate: '', endDate: '' }
              }
              onChange={handleCustomDateChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDates;
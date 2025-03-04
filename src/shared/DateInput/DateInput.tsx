import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import dayjs from 'dayjs';
import { IMaskInput } from 'react-imask';
import styles from './DateInput.module.scss';
import Icon from '../Icon/Icon';
import ru from 'date-fns/locale/ru';

interface DateInputProps {
  onChange: (startDate: string, endDate: string) => void;
  defaultValue?: { startDate: string; endDate: string };
}

const DateInput: React.FC<DateInputProps> = ({ defaultValue, onChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: defaultValue?.startDate || '',
    endDate: defaultValue?.endDate || '',
  });
  const [tempDateRange, setTempDateRange] = useState({
    startDate: defaultValue?.startDate ? dayjs(defaultValue.startDate, 'DD.MM.YYYY').toDate() : new Date(),
    endDate: defaultValue?.endDate ? dayjs(defaultValue.endDate, 'DD.MM.YYYY').toDate() : new Date(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [error, setError] = useState('');

  const validateDate = (value: string): boolean => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    if (!regex.test(value)) {
      setError('Некорректный формат даты. Используйте DD.MM.YYYY');
      return false;
    }

    const isValid = dayjs(value, 'DD.MM.YYYY').isValid();
    if (!isValid) {
      setError('Некорректная дата');
      return false;
    }

    setError('');
    return true;
  };

  const validateDateRange = (startDate: string, endDate: string): boolean => {
    if (startDate && endDate) {
      const start = dayjs(startDate, 'DD.MM.YYYY');
      const end = dayjs(endDate, 'DD.MM.YYYY');
      if (start.isAfter(end)) {
        setError('Дата начала не может быть больше даты окончания');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleInputChange = (field: 'startDate' | 'endDate', value: string) => {
    if (value.length === 10 && validateDate(value)) {
      const newStartDate = field === 'startDate' ? value : dateRange.startDate;
      const newEndDate = field === 'endDate' ? value : dateRange.endDate;

      if (validateDateRange(newStartDate, newEndDate)) {
        setDateRange({ startDate: newStartDate, endDate: newEndDate });
        onChange(newStartDate, newEndDate);
      }
    } else {
      setDateRange((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCalendarChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setTempDateRange({ startDate, endDate });
  };

  const handleCalendarClose = () => {
    const formattedStartDate = dayjs(tempDateRange.startDate).format('DD.MM.YYYY');
    const formattedEndDate = dayjs(tempDateRange.endDate).format('DD.MM.YYYY');
  
    if (validateDate(formattedStartDate) && validateDate(formattedEndDate)) {
      if (validateDateRange(formattedStartDate, formattedEndDate)) {
        setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate });
        onChange(formattedStartDate, formattedEndDate);
        setIsCalendarOpen(false);
      }
    } else {
      setError('Обе даты должны быть указаны');
    }
  };

  const maxDate = new Date();

  return (
    <div className={styles.container}>
      <label className={styles.label}>Указать даты</label>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsContainer_left}>
          <IMaskInput
            mask="00.00.0000"
            value={dateRange.startDate}
            placeholder="__.__.____"
            className={styles.input}
            onAccept={(value: string) => handleInputChange('startDate', value)}
          />
          <span className={styles.dash}>-</span>
          <IMaskInput
            mask="00.00.0000"
            value={dateRange.endDate}
            placeholder="__.__.____"
            className={styles.input}
            onAccept={(value: string) => handleInputChange('endDate', value)}
          />
        </div>
        <Icon name={'icon-calendar'} onClick={() => setIsCalendarOpen(!isCalendarOpen)} />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isCalendarOpen && (
        <div className={styles.calendar}>
          <DateRange
            locale={ru}
            ranges={[
              {
                startDate: tempDateRange.startDate,
                endDate: tempDateRange.endDate,
                key: 'selection',
              },
            ]}
            showDateDisplay={false}
            dateDisplayFormat="dd.MM.yyyy"
            weekdayDisplayFormat="EEEEEE"
            onChange={handleCalendarChange}
            maxDate={maxDate}
          />
          <button onClick={handleCalendarClose} className={styles.calendarButton}>
            Применить
          </button>
        </div>
      )}
    </div>
  );
};

export default DateInput;
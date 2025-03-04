import React, { useEffect, useState } from 'react';
import styles from './CallsList.module.scss';
import useCalls from '@/api/useCalls';
import CallsTable from '../CallsTable/CallsTable';
import CallsFilters from '../CallsFilters/CallsFilters';
import { inOutEnum } from '@/enum/inOut';
import dayjs from 'dayjs';
import { SelectDatesType } from '@/types/selectDatesType';

const CallsList = () => {
  const [inOut, setInOut] = useState(inOutEnum.all);
  const [dates, setDates] = useState<SelectDatesType>({
    type: 'days',
    start: dayjs(new Date()).add(-2, 'day').format('DD.MM.YYYY'),
    end: dayjs(new Date()).format('DD.MM.YYYY'),
  });

  const formatDate = (date: string) => {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      console.error('Invalid date format:', date);
      return '';
    }
    const [day, month, year] = date.split('.');
    const correctedMonth = parseInt(month, 10) - 1;
    const parsedDate = dayjs(new Date(+year, correctedMonth, +day));

    if (!parsedDate.isValid()) {
      console.error('Invalid date:', date);
      return ''; 
    }
    return parsedDate.format('YYYY-MM-DD');
  };

  const [params, setParams] = useState({
    date_start: formatDate(dates.start),
    date_end: formatDate(dates.end),
    in_out: inOut,
  });

  useEffect(() => {
    setParams({
      date_start: formatDate(dates.start),
      date_end: formatDate(dates.end),
      in_out: inOut,
    });
  }, [inOut, dates]);

  const { data, isLoading, isError, error } = useCalls(params);

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div className={styles.cartList}>
      <CallsFilters
        typeValue={inOut}
        dates={dates}
        onChangeType={(e) => setInOut(e)}
        onChangeDates={(e) => setDates(e)}
      />
      {isLoading ? <div>...Загрузка</div> : <CallsTable data={data} />}
    </div>
  );
};

export default CallsList;
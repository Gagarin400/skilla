import styles from './CallsTable.module.scss';
import { CallRecordsType } from '@/types/callsType';
import Select from '@/shared/Select/Select';
import CallsTableItem from './components/CallsTableItem/CallsTableItem';

interface CallsTableProps {
  data?: CallRecordsType;
}

const timeFilterOptions = [
  { 
    value: 'Длинные',
    label: 'Длинные'
  },
  { 
    value: 'Короткие',
    label: 'Короткие'
  },
];

const CallsTable = ({ data: initialData }: CallsTableProps) => {
  const getDateKey = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'yesterday';
    } else {
      return 'earlier';
    }
  };

  const groupedData = initialData?.reduce((acc, item) => {
    const key = getDateKey(item.date);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CallRecordsType>);

  return (
    <div className={styles.table}>
      <div className={styles.table_head}>
        <div className={styles.table_head_row}>
          <div className={styles.table_head_col}>Тип</div>
          <div className={styles.table_head_col}>Время</div>
          <div className={styles.table_head_col}>Сотрудник</div>
          <div className={styles.table_head_col}>Звонок</div>
          <div className={styles.table_head_col}>Источник</div>
          <div className={styles.table_head_col}>Оценка</div>
          <div className={styles.table_head_col}>
            <Select options={timeFilterOptions} onChange={() => {}} placeholder='Длительность' />
          </div>
        </div>
      </div>
      <div className={styles.table_body}>
        {groupedData?.today && (
          <>
            {groupedData.today.map((item) => (
              <CallsTableItem item={item} key={item.id} />
            ))}
          </>
        )}
        {groupedData?.yesterday && (
          <>
            <div className={styles.table_group_title}>Вчера <span>{groupedData.yesterday.length}</span></div>
            {groupedData.yesterday.map((item) => (
              <CallsTableItem item={item} key={item.id} />
            ))}
          </>
        )}
        {groupedData?.earlier && (
          <>
            <div className={styles.table_group_title}>Ранее {groupedData.earlier.length}</div>
            {groupedData.earlier.map((item) => (
              <CallsTableItem item={item} key={item.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CallsTable;
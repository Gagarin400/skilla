import React, { useEffect, useState } from 'react';
import styles from './CallsTableItem.module.scss';
import dayjs from 'dayjs';
import GradeCall from '@/shared/GradeCall/GradeCall';
import CallType from '@/shared/CallType/CallType';
import AudioPlayer from '@/shared/AudioPlayer/AudioPlayer';
import { getRecord, GetRecordsParams } from '@/api/record';
import { CallRecordType } from '@/types/callsType';

interface CallsTableItemProps {
  item: CallRecordType;
}

const CallsTableItem = ({ item }: CallsTableItemProps) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRecord = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const params: GetRecordsParams = {
        record: item.record,
        partnership_id: item.partnership_id,
      };
      const data = await getRecord(params);
      setAudioBlob(data);
      setIsPlayerVisible(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setAudioBlob(null);
    setIsPlayerVisible(false);
    setIsError(false);
    fetchRecord();
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
    setAudioBlob(null);
  };

  return (
    <div className={styles.table_body_row} onClick={handleClick}>
      <div className={styles.table_body_wrapper}>
        <div className={styles.table_body_col}>
          <CallType type={item.in_out} status={item.status} />
        </div>
        <div className={styles.table_body_col}>
          {dayjs(item.date).format('HH:mm')}
        </div>
        <div className={styles.table_body_col}>
          {item.person_avatar && (
            <img
              src={item.person_avatar}
              width={32}
              height={32}
              alt={`avatar-${item.id}`}
            />
          )}
        </div>
        <div className={styles.table_body_col}>{item.from_number}</div>
        <div className={styles.table_body_col}>
          <a
            href={`https://${item.source}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.source}
          </a>
        </div>
        <div className={styles.table_body_col}>
          <GradeCall grade={item.id % 10} />
        </div>
        <div className={styles.table_body_col}>
          {isLoading
            ? '...загрузка'
            : isError
              ? 'ошибка загрузки'
              : isPlayerVisible
                ? <AudioPlayer audioBlob={audioBlob} onClose={handleClosePlayer} />
                : item.time}
        </div>
      </div>
    </div>
  );
};

export default CallsTableItem;
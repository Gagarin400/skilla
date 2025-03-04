import React from 'react';
import styles from './GradeCall.module.scss';
import cn from 'classnames';
import { gradeEnum } from '@/enum/grade';

interface GradeCallProps {
  grade: gradeEnum;
}

const GradeCall = ({ grade }: GradeCallProps): React.ReactElement => {
  const getGradeText = () => {
    switch (grade) {
      case gradeEnum.noGrade:
        return <span className={styles.error}>Скрипт не использован</span>
      case gradeEnum.bad:
        return <div className={cn(styles.gradeCall, styles.bad)}>Плохо</div>
      case gradeEnum.well:
        return <div className={cn(styles.gradeCall, styles.well)}>Хорошо</div>
      case gradeEnum.great:
        return <div className={cn(styles.gradeCall, styles.great)}>Отлично</div>
      default:
        return <div></div>
    }
  };

  return getGradeText()
};

export default GradeCall;
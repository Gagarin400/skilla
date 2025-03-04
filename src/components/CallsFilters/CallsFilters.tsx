import styles from './CallsFilters.module.scss'
import Select from '@/shared/Select/Select';
import { inOutEnum } from '@/enum/inOut';
import SelectDates from '@/shared/SelectDates/SelectDates';
import { SelectDatesType } from '@/types/selectDatesType';

interface CallsFiltersProps {
    typeValue: number
    dates: SelectDatesType 
    onChangeType: (e: number) => void
    onChangeDates: (e: SelectDatesType ) => void
}
const CallsFilters = ({typeValue, dates, onChangeType, onChangeDates}:CallsFiltersProps) => {
    const callsTypeOptions = [
        {
            value: inOutEnum.incoming,
            label: 'Исходящие'
        },
        {
            value: inOutEnum.coming,
            label: 'Входящие'
        },
        {
            value: inOutEnum.all,
            label: 'Все типы'
        }
    ]
  return <div className={styles.filters}>
    <Select options={callsTypeOptions} onChange={(e) => onChangeType(e as number)} defaultValue={typeValue} />
    <SelectDates defaultValue={dates} onChange={(e) => onChangeDates(e)}/>
  </div>
};

export default CallsFilters;
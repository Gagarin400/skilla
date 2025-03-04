import styles from './CallType.module.scss';
import { inOutEnum } from '@/enum/inOut';
import Icon from '../Icon/Icon';

interface CallTypeProps {
  type: inOutEnum
  status: "success" | "fail" | "Дозвонился" | "Пропущенный"
}

const CallType = ({ type, status }: CallTypeProps) => {
  const getCallTypeText = () => {
    switch (type) {
      case inOutEnum.coming:
        return <Icon name={'outgoing'} className={["success", "Дозвонился"].includes(status) ? styles.successOutgoing : styles.fail  } />
      case inOutEnum.incoming:
        return <Icon name={'incoming'} className={["success", "Дозвонился"].includes(status) ? styles.successIncoming : styles.fail  } />
      default:
        return <div></div>
    }
  };

  return getCallTypeText()
};

export default CallType;
import { inOutEnum } from "../enum/inOut";

export type CallRecordType = {
    id: number;
    partnership_id: string;
    partner_data: {
      id: string;
      name: string;
      phone: string;
    };
    date: string;
    date_notime: string;
    time: number;
    from_number: string;
    from_extension: string;
    to_number: string;
    to_extension: string;
    is_skilla: number;
    status: "success" | "fail" | "Дозвонился" | "Пропущенный"
    record: string;
    line_number: string;
    line_name: string;
    in_out: inOutEnum;
    from_site: number;
    source: string;
    errors: string[];
    disconnect_reason: string;
    results: any[];
    stages: any[];
    abuse: {
      date: string;
      person_name: string;
      message: string;
      support_read_status: number;
      support_answer_status: number;
      answers: {
        message: string;
        from_support: number;
        support_read_status: number;
        person_read_status: number;
      }[];
    };
    contact_name: string;
    contact_company: string;
    person_id: number;
    person_name: string;
    person_surname: string;
    person_avatar: string;
  };
  
 export type CallRecordsType = CallRecordType[];
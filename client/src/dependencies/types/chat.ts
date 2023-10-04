import { Label } from './contact';
export interface Chat {
  _id: string;
  name: string;
  lastMessage: string;
  channel: string;
  contactId: string;
  agentId?: string;
  flag: ChatFlag;
  isFlow?: boolean;
  isOut?: boolean;
  updateAt?: number;
  initiateAt: number;
  identifier: string;
  msgType?: string;
  unreadCount?: number;
  lastUpdate?: number;
  greetingAt?: number;
  agent?: {
    name: string;
    email?: string;
    role?: string;
    phone?: number | null;
    allChat?: boolean;
    autoAssign?: boolean;
    _id?: string;
  };
  label?: Label[];
}

export enum ChatFlag {
  Gray = 'gray', // Resolved
  Red = 'red', // assigned to agent, but not answered
  Green = 'green', // assigned to agent, and answered
}

export interface AgentSelection {
  _id: string;
  autoAssign?: boolean;
  allChat?: boolean;
  domain: string;
  name: string;
  password?: string;
  email: string;
  hashedRefreshToken?: string;
  role?: string;
}

export interface ChatFilter {
  channel: 'ALL' | 'WHATSAPP' | 'MESSENGER' | 'TELEGRAM';
  resolved: 'ALL' | true | false;
  assignment: AssignEnum;
  label?: Label;
}

export type ChatQuery = {
  _id?: string;
  page?: number;
  perpage?: number;
  startKey?: number;
  agentId?: string;
  searchText?: string;
  channel?: string;
  assignee?: AssignEnum;
  label?: string;
};

export enum AssignEnum {
  ALL = 'ALL',
  MINE = 'MINE',
  UNASSIGNED = 'UNASSIGNED',
}

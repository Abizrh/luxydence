export interface ChannelValue {
  name: string;
  identifier: string;
}

export interface Label {
  label: string;
  color: string;
}

export interface Contacts {
  _id?: string;
  channel: ChannelValue[];
  name?: string;
  nickname?: string;
  email?: string;
  company?: string;
  address?: string;
  city?: string;
  category?: string;
  label?: Label[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export enum ChannelType {
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  MESSENGER = 'messenger', // FB messenger
  WHATSAPP_BASIC = 'wabasic', // WA WEB
  WHATSAPP_CLOUD = 'wacloud', // WA Cloud
  WHATSAPP_QONTAK = 'qontak', // Qontak
}

export type ContactFilter = {
  keyword: string;
  label?: Label[];
  channel?: string[];
};

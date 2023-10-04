/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contacts } from './contact';

export enum MessageType {
  text = 'text',
  image = 'image',
  document = 'document',
  video = 'video',
  audio = 'audio',
  location = 'location',
  contacts = 'contacts',
  listButton = 'listButton',
  button = 'button',
  information = 'information',
}

export enum InfoType {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
}

export enum ChannelType {
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  MESSENGER = 'messenger', // FB messenger
  WHATSAPP_BASIC = 'wabasic', // WA WEB
}

export interface Location {
  longitude: number;
  latitude: number;
  name: string;
  address: string;
  url: string;
}

export type MessageButton = {
  type: 'URL' | 'PHONE';
  text: string;
  value: string;
};

export type MessageListButton = {
  button: string;
  sections: {
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
    }[];
  }[];
};

export interface Message {
  initiateAt?: any;
  id?: string;
  _id?: string;
  channel?: string | ChannelType;
  msgType?: MessageType;
  text?: string;
  fromMe: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentData?: string;
  contacts?: Contacts[] | string;
  location?: Location | string;
  to: string;
  status?: string;
  language?: string;
  generatedId?: string;
  header?: string;
  footer?: string;
  listButton?: MessageListButton | string;
  buttons?: MessageButton[] | string;
  from?: string;
  timestamp: number;
  replyId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  chatId?: string;
  thumbnail?: string;
  caption?: string;
  createdAt?: string | number;
  updateAt?: number;
  date?: string;
  interactive?: string;
  infoType?: InfoType;
  chatType?: string;
}

export interface Parameter {
  type?: MessageType;
  index?: number; // optional for text, currency, date_time type
  text?: string; // required if text type
  attachmentUrl?: string; // optional for image, video and document type
  attachmentName?: string; // optional for document type
  attachmentId?: string;
  fallbackValue?: string; // optional for currency or date_time type
  code?: string; // Currency code as defined in ISO 4217. optional if currency type
  amount?: number; // optional if currency type
  dayOfMonth?: number; // optional if date_time type
  year?: number; // optional if date_time type
  month?: number; // optional if date_time type
  hour?: number; // optional if date_time type
  minute?: number; // optional if date_time type
}

export interface ValuesFormat {
  header?: Parameter;
  body?: Parameter[];
}

export interface WelcomeMessage {
  id?: string;
  identifier: string;
  contacts?: Contacts[] | string;
  timestamp: number;
  activechat: string;
  to: string;
  status: string;
  msgType: string;
  text: string;
  templateId?: string;
  values?: ValuesFormat;
}

export enum WhatsappStatus {
  queue = 'queue',
  expired = 'expired',
  sent = 'sent',
  delivered = 'delivered',
  undelivered = 'undelivered',
  read = 'read',
  failed = 'failed',
  noMatchTemplate = 'no-match-template ',
  delayed = 'delayed',
  cancelled = 'cancelled',
}

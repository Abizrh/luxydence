import { ChannelType } from './message';
export interface AgentDivision {
  _id?: string;
  name: string;
  agents: { id: string; name: string }[];
  channels: ChannelType[];
}

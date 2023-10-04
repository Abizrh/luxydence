export interface Agent {
  _id?: string;
  name: string;
  phone?: string;
  email: string;
  password?: string;
  // avatar: unknown;
  role: string;
  assigned_to?: Array<unknown>;
  allChat: boolean;
  autoAssign: boolean;
  divisions: { id: string; name: string }[];
}

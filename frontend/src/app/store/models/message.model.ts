import { User } from './user.model';

export interface Message {
  id: number;
  user: User;
  content: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum AppTab {
  POSTER = 'POSTER',
  CHAT = 'CHAT',
  BMI = 'BMI'
}

export interface ABCDItem {
  id: string;
  letter: string;
  title: string;
  description: string;
  details: string[];
  color: string;
  iconName: string;
}
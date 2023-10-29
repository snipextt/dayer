export interface Extension {
  id: string;
  name: string;
  description: string;
  iconLight: string;
  iconDark: string;
  key: string;
}

export type Extensions = Extension[];

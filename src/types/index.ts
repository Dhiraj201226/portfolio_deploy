export type AppId =
  | 'notes'
  | 'contacts'
  | 'xcode'
  | 'skills'
  | 'awards'
  | 'education'
  | 'leadership'
  | 'blog'
  | 'pdf'
  | 'mail'
  | 'feedback'
  | 'terminal'
  | 'finder'
  | 'certificates';

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface FileItem {
  id: string;
  name: string;
  icon: string;
  appId?: AppId;
  type: 'app' | 'folder' | 'file';
  size?: string;
  dateModified?: string;
}

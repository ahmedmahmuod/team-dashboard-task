export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: TeamMemberStatus;
  performanceScore: number;
  avatar?: string;
  joinDate: string;
  department: string;
  location: string;
}

export enum TeamMemberStatus {
  ACTIVE = 'Active',
  OFFLINE = 'Offline',
  BUSY = 'Busy',
  AWAY = 'Away'
}

export interface TeamFilters {
  search: string;
  role: string;
  status: string;
}

export enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}
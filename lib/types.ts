export type Attendance = 'hadir' | 'tidak_hadir' | 'tentative';

export interface Comment {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  createdAt: string;
}

export interface NewComment {
  name: string;
  message: string;
  attendance: Attendance;
}

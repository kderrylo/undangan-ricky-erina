export type Attendance = 'hadir' | 'tidak_hadir';

export interface Comment {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  attendeeCount: number;
  isPinned?: boolean;
  createdAt: string;
}

export interface NewComment {
  name: string;
  message: string;
  attendance: Attendance;
  attendeeCount?: number;
  /** Slug tamu (dari parameter ?to=) supaya ucapan bisa dikaitkan ke data tamu di dashboard. */
  guestSlug?: string;
}

export interface Guest {
  id: string;
  slug: string;
  name: string;
  phone?: string | null;
  category: string;
  invitedCount: number;
  notes?: string | null;
  isSent: boolean;
  createdAt: string;
}

export interface NewGuest {
  name: string;
  phone?: string;
  category?: string;
  invitedCount?: number;
  notes?: string;
}

export interface ShortUrlInfoModel {
  createdAt: string;
  ownerId: string;
  clicks: number;
  lastAccessedAt?: string | null;
}

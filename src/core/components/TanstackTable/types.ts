import { ReactNode } from "react";

export type PaginationProps = {
  sizes?: number[];
  sizesInfo?: string;
  sizesLabel?: string;
  sizesDescription?: string;
  sizesSkeleton?: ReactNode;
  more?: boolean;
  moreLimit?: number;
  info?: string;
  infoSkeleton?: ReactNode;
}

export type PaginationResponse<T> = {
  status: boolean
  status_code: number
  message: string
  data: Data<T>
  errors: Errors
}

export interface Data<TData> {
  links: Links
  count: number
  total_count: number
  results: TData[]
}

export interface Links {
  next: string
  previous: string
}

export interface Errors { }
export type TAlbumStatus = "draft" | "published";

export type TFormat = {
  id: string;
  label: string;
  sub: string;
  price: number;
  type: string;
  badge?: string;
  isHot?: boolean;
};

export type TTrack = {
  position: number;
  title: string;
  duration: string;
};

export type TAlbum = {
  title: string;
  artist: string;
  cover_image: string;

  main_genre: string;
  release_year: string;

  total_tracks: string;
  duration: string;

  description: string;
  tag?: string;

  rating?: number;
  review_count?: number;

  formats: TFormat[];

  bundle_deal?: {
    title: string;
    items: string;
    price: number;
    old_price?: number;
    save?: string;
  };

  tracklist: TTrack[];

  status: TAlbumStatus;
  isDeleted?: boolean;
};
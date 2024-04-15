export interface LandingItem {
  image: string;
  title: string;
  price: number;
  description: string;
}

export interface PropsLandingItems {
  item: LandingItem[];
}

export type CardType = {
  id: string;
  description: string;
  imageUrl: string;

  isLiked?: boolean;
  breeds?: string[];
}
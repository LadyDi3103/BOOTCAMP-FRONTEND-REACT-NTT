export interface ProductDetails {
    title: string;
    description: string;
    price: number;
    reviews: Review[];
    category: string;
    images: string[];
  }

 export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

  export type ProductDetail = ProductDetails[];
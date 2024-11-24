import React from 'react';
import { Review } from '../app/domain/ProductDetail';

interface ReviewProps {
    reviews?: Review[];
}

const ReviewsList: React.FC<ReviewProps> = ({ reviews = [] }) => {
    return (
        <div>
            {reviews.map((review, index) => (
                <div key={index}>
                    <h3>{review.reviewerName}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;
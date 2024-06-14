import { checkIsProperString } from "./helpers"

import { object, string, number, date, InferType } from 'yup';
import { schema } from "./helpers";

interface Review {
    title : string, content : string, rating : number, user : string, game : string
}
async function validateReview(review : Review) {    
    review = await schema.reviewSchema.validate(review);
    return review;
}

export default { validateReview }
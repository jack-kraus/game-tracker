import { checkIsProperString } from "./helpers"
import { object, string, number, date, InferType } from 'yup';
import { schema } from "./helpers";
import { SupabaseClient } from "@supabase/supabase-js";

interface Review {
    title : string, content : string, rating : number, user? : string, game : string
}
async function validateReview(review : any) {    
    review = await schema.reviewSchema.validate(review);
    return review;
}

export default { validateReview }
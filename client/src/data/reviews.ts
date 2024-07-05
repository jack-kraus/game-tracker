import { checkIsProperString } from "./helpers"
import { object, string, number, date, InferType } from 'yup';
import { schema } from "./helpers";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import moment from "moment";

interface Review {
    title : string, content : string, rating : number, user? : string, game : string
}
async function validateReview(review : any) {    
    review = await schema.reviewSchema.validate(review);
    return review;
}

export async function getReviewById(id : string | number) {
    const idSchema = number().required().min(0);
    id = await idSchema.validate(id);

    const supabase = createClient();
    const { data, error } = await supabase
        .from('post_user_like_status')
        .select('*')
        .eq('id', id)
        .limit(1);
    if (error) throw error.message;
    let review = data[0];
    if (review.created_at) review.created_at = moment(review.created).format("MM/DD/YYYY hh:mm");

    return data[0];
}

export default { validateReview }
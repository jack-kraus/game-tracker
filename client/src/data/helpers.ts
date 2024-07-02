import * as yup from 'yup';

const valuePassed = function(val : any, variableName : string) {
    if (val === undefined) {
        throw new Error(`${variableName || 'Provided variable'} must be passed in`);
    }
}

export const checkIsProperString = function(val : string, min_length : number, to_trim : boolean, variableName : string) {
    valuePassed(val, variableName);
    if (typeof val !== 'string') {
        throw new Error(`${variableName || 'Provided variable'} must be a string`);
    }
    const nval = (to_trim) ? val.trim() : val;
    if (nval.length < min_length) {
        throw new Error(`${variableName || 'Provided variable'} must contain at least ${min_length} character(s)`);
    }
    return nval;
}

export function range(start : number, end : number) {
    if (end - start + 1 <= 0 || isNaN(end - start + 1)) return [];
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

const checkIsProperEmail = function(val : any, variableName : string) {
    val = checkIsProperString(val, 1, true, variableName);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(val)) {
        throw new Error(`${variableName} must be in format: name@url.com`);
    }

    return val;
}

const checkIsProperPassword = function(val : any, variableName : string) {
    val = checkIsProperString(val, 6, true, variableName);

    if (!val.match(/[a-z]/)) throw new Error(`${val.match(/[a-z]/)} must contain at least one lowercase letter`);
    else if (!val.match(/[A-Z]/)) throw new Error(`${variableName} must contain at least one capital letter`);
    else if (!val.match(/[-'/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/)) throw new Error(`${variableName} must contain at least one special character`);

    return val;
}

const checkIsFilledString = function(val : any, variableName : string) {
    try {
        val = checkIsProperString(val, 1, true, variableName);
    } catch(_) {
        throw new Error(`${variableName} cannot be empty`);
    }

    return val;
}

const reviewSchema = yup.object({
    title: yup.string().trim().required(),
    content: yup.string().trim().required(),
    rating: yup.number().min(0).max(10).required(),
    game: yup.string().trim().required(),
    game_cover: yup.string().trim().url().required(),
    game_title: yup.string().trim().required(),
    author: yup.string().trim().uuid().required(),
});

const reviewEditSchema = yup.object({
    title: yup.string().trim().required(),
    content: yup.string().trim().required(),
    rating: yup.number().min(0).max(10).required()
});

const uuidSchema = yup.string().trim().required().uuid();

export const validation = { checkIsProperString, checkIsProperEmail, checkIsProperPassword, checkIsFilledString };
export const schema = { reviewSchema, reviewEditSchema, uuidSchema };
const valuePassed = function(val : any, variableName : string) {
    if (val === undefined) {
        throw new Error(`${variableName || 'Provided variable'} must be passed in`);
    }
}

export const checkIsProperString = function(val : any, min_length : number, to_trim : boolean, variableName : string) {
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

export const validation = { checkIsProperString, checkIsProperEmail, checkIsProperPassword, checkIsFilledString };
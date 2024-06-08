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
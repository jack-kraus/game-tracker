const email_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: `${label} must be in name@url.com form`
        },
        setValueAs: (v:string) => v.trim()
    }
};

const username_validation = (label:string) => {
    return {
        minLength: {
            value: 3,
            message: `${label} must contain at least 3 characters`
        },
        required: {
            value: true,
            message: `${label} is required`
        },
        validate: (val: string) => {
            if (val.match(/[ ]/)) return `${label} can't contain any spaces`;
            else if (val.match(/[^a-zA-Z0-9_-]/)) return `${label} can't contain any special characters except [_/-]`;
        },
        setValueAs: (v:string) => v.trim()
    }
};

const password_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        validate: (val: string) => {
            if (!val.match(/[a-z]/)) return `${label} must contain at least one lowercase letter`;
            else if (!val.match(/[A-Z]/)) return `${label} must contain at least one capital letter`;
            else if (!val.match(/\d/)) return `${label} must contain at least one number`;
            else if (!val.match(/[-'/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/)) return `${label} must contain at least one special character`;
        },
        setValueAs: (v:string) => v.trim()
    }
};

const confirm_password_validation = (label:string, watch:(a:string)=>string, password_id:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        validate: (val: string) => {
            if (watch(password_id) != val) {
              return "Your passwords do not match";
            }
        },
        setValueAs: (v:string) => v.trim()
    }
};

const required_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        setValueAs: (v:string) => v.trim()
    }
};

const range_validation = (label:string, min:number, max:number) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        min,
        max,
        setValueAs: (v:string) => v.trim()
    }
};

const string_range_validation = (label:string, max:number) => {
    return {
        maxLength: {
            value: max,
            message: `${label} must contain no more than ${max} characters`
        },
        required: {
            value: true,
            message: `${label} is required`
        },
        setValueAs: (v:string) => v.trim()
    }
};

export default {email_validation, password_validation, confirm_password_validation, required_validation, range_validation, username_validation, string_range_validation};
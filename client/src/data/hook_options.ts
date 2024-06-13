const email_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: `${label} must be in name@url.com form`
        }
    }
};

const password_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        },
        validate: (val: string) => {
            if (!val.match(/[a-z]/)) return `${val.match(/[a-z]/)} must contain at least one lowercase letter`;
            else if (!val.match(/[A-Z]/)) return `${label} must contain at least one capital letter`;
            else if (!val.match(/[-'/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/)) return `${label} must contain at least one special character`;
        }
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
              return "Your passwords do no match";
            }
        }
    }
};

const required_validation = (label:string) => {
    return {
        required: {
            value: true,
            message: `${label} is required`
        }
    }
};

export default {email_validation, password_validation, confirm_password_validation, required_validation};
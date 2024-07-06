export const headers = {
    'Accept': 'application/json',
    "Client-ID": process.env.CLIENT_ID,
    Authorization: process.env.ACCESS
}

export const header_func = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append("Client-ID", process.env.CLIENT_ID || "");
    headers.append("Authorization", process.env.ACCESS || "");
    return headers;
}
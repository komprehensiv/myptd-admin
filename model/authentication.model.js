import getConfig from 'next/config';
import { thunk } from "easy-peasy";

const { publicRuntimeConfig: { AUTHENTICATION_ENDPOINT }} = getConfig();

const authenticationModel = {
    authenticate: thunk(async (actions, payload) => {
        const body = JSON.stringify(payload);
        try {
            const response = await fetch(AUTHENTICATION_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            const { data, message } = await response.json();
            return { isValid: message === 'Success', token: data };
        } catch(error) {
            console.log(error);
            return { isValid: false, token: null };
        }
    })
};

export default authenticationModel;
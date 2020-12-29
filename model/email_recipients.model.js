import { action, thunk } from "easy-peasy";
import getConfig from 'next/config';
import get from 'lodash/get';
import { isTruthy } from '../lib/is-truthy';
import { isFalsy } from "../lib/is-falsy";
import EmailRecipients from "../components/email-recipients/email-recipients.component";

const { publicRuntimeConfig: { GET_EMAIL_RECIPIENTS_ENDPOINT, CREATE_EMAIL_RECIPIENT_ENDPOINT, UPDATE_EMAIL_RECIPIENT_ENDPOINT, DELETE_EMAIL_RECIPIENT_ENDPOINT }} = getConfig();
const getEmptyEmailRecipient = () => {
    return {
        "email": ''
    };
}

const emailRecipientsModel = {
    updateSuccessful: null,
    emailRecipients: [],
    emailRecipient: getEmptyEmailRecipient(),
    fetchEmailRecipients: thunk(async (actions, payload) => {
        const response = await fetch(GET_EMAIL_RECIPIENTS_ENDPOINT);
        const { data } = await response.json();
        actions.setEmailRecipients(data);
    }),
    setEmailRecipients: action((state, payload) => {
        state.emailRecipients = payload;
    }),
    updateSelectedEmailRecipient: action((state, payload) => {
        const { index } = payload;
        state.emailRecipient = state.emailRecipients[index];
    }),
    updateEmailRecipient: action((state, payload) => {
        const { index, value } = payload
        state.emailRecipients[index].email = value;
    }),
    addEmailRecipient: action((state, payload) => {
        state.emailRecipients.push(getEmptyEmailRecipient());
    }),
    saveEmailRecipient: thunk(async (actions, payload, { getState }) => {
        const { id, index } = payload;
        const isUpdate = isTruthy(id);
        const { emailRecipients } = getState();
        const emailRecipient = emailRecipients[index];
        const body = JSON.stringify({ ...emailRecipient });
        const endpoint = isUpdate ? UPDATE_EMAIL_RECIPIENT_ENDPOINT : CREATE_EMAIL_RECIPIENT_ENDPOINT;

        const response = await fetch(endpoint, {
            method: isUpdate ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });
        const { message, data } = await response.json();
        actions.setUpdateSuccessfulStatus(true);
    }),
    deleteEmailRecipient: thunk(async (actions, payload, { getState }) => {
        const id = get(payload, 'id');
        const { index } = payload;
        if (isFalsy(id)) {
            const { emailRecipients } = getState();
            emailRecipients.splice(index, 1);
            actions.setEmailRecipients(emailRecipients);
        } else {
            const body = JSON.stringify({ id });
            const endpoint = DELETE_EMAIL_RECIPIENT_ENDPOINT;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            const { message, data } = await response.json();
        }
        actions.fetchEmailRecipients();
        actions.setUpdateSuccessfulStatus(true);
    }),
    setUpdateSuccessfulStatus: action((state, payload) => {
        state.updateSuccessful = payload;
    })
};

export default emailRecipientsModel;
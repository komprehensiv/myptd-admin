import { useEffect } from "react";
import { Grid, TextField, Paper, MenuItem } from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
import { isFalsy } from "../../lib/is-falsy";
import { NextButton, NextButtonWrapper, PaperInner, TextFieldWrapper } from "../retailers/retailers.styles";
import { InlineButtonWrapper } from "./email-recipients.styles";
import { useState } from "react";
import { toast } from 'react-toastify';

const EmailRecipients = () => {
    const { emailRecipients, updateSuccessful } = useStoreState(({ emailRecipients }) => emailRecipients);
    const { fetchEmailRecipients, addEmailRecipient, updateSelectedEmailRecipient, updateEmailRecipient, saveEmailRecipient, deleteEmailRecipient, setUpdateSuccessfulStatus } = useStoreActions(({ emailRecipients }) => emailRecipients);
    const [editing, setEditing] = useState(null);
    
    useEffect(() => {
        fetchEmailRecipients();
    }, []);

    if (isFalsy(emailRecipients)) return null;

    if (updateSuccessful !== null) {
        if (updateSuccessful) {
            setUpdateSuccessfulStatus(null);
            toast.success('Save Complete!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    const setEmailRecipient = (index) => {
        updateSelectedEmailRecipient({ index });
        setEditing(index);
    }

    const reset = () => {
        setEditing(null);
        fetchEmailRecipients();
    }

    return (
        <Grid container spacing={ 24 }>
            <Grid item xs={ 1 } />
            <Grid item xs={10}>
                <Paper>
                    <PaperInner>
                        <Grid container 
                            spacing={12} 
                            alignItems="center"
                            justify="center" 
                            spacing={0}>
                            {
                                emailRecipients.map((emailRecipient, index) => (
                                    <>
                                        <Grid item xs={6} sm={4} alignItems="center" justify="center">
                                            <InlineButtonWrapper>
                                                <NextButton
                                                    color="secondary"
                                                    size="large"
                                                    disabled={editing !== index}
                                                    onClick={() => deleteEmailRecipient({ id: emailRecipient.id, index })}>
                                                    Delete
                                                </NextButton>
                                                {
                                                    editing === index
                                                    // ? <NextButton color="primary" size="large" onClick={ () => setEditing(null) }>Done Editing</NextButton>
                                                    ? <NextButton color="primary" size="large" onClick={() => reset() } disabled={editing !== index}>Undo</NextButton>
                                                    : <NextButton color="primary" size="large" onClick={ () => setEmailRecipient(index) }>Edit</NextButton>
                                                }
                                            </InlineButtonWrapper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextFieldWrapper>
                                                <TextField
                                                    label='Email'
                                                    placeholder=''
                                                    onChange={() => updateEmailRecipient({ index, value: event.target.value })}
                                                    fullWidth
                                                    value={emailRecipient.email || ''}
                                                    disabled={editing !== index} />
                                            </TextFieldWrapper>
                                        </Grid>
                                        <Grid item xs={3} sm={2}>
                                            <InlineButtonWrapper>
                                                <NextButton color="primary" size="large" onClick={() => saveEmailRecipient({ id: emailRecipient.id, index }) } disabled={editing !== index}>Save</NextButton>
                                            </InlineButtonWrapper>
                                        </Grid>
                                    </>
                                ))
                            }
                            
                        </Grid>
                        <Grid 
                            container 
                            spacing={12}
                            alignItems="center"
                            justify="center" 
                            spacing={0}>
                            <Grid item xs={ 12 }>
                                <NextButtonWrapper>
                                    {/* <NextButton
                                        color="primary"
                                        size="large"
                                        onClick={ () => updateEmailRecipients() }>
                                        Update
                                    </NextButton> */}
                                    <NextButton
                                        color="primary"
                                        size="large"
                                        onClick={ () => addEmailRecipient() }>
                                        Add New
                                    </NextButton>

                                </NextButtonWrapper>
                            </Grid>
                        </Grid>
                    </PaperInner>
                </Paper>
            </Grid>
            <Grid item xs={ 1 } />
        </Grid>
    );
};

export default EmailRecipients;
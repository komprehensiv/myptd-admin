import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Grid, TextField, Paper, MenuItem } from "@material-ui/core";
import { NextButtonWrapper, PaperInner, TextFieldWrapper, NextButton } from "./retailers.styles";
import { isFalsy } from '../../lib/is-falsy';
import find from 'lodash/find';
import { toast } from 'react-toastify';
import { checkAuthentication } from "../../lib/checkAuthentication";

const Retailers = () => {
    const { editType } = useStoreState(({ edit }) => edit);
    const { retailer, retailers, updateSuccessful } = useStoreState(({ retailers }) => retailers);
    const { fetchRetailers, updateRetailer, resetRetailer, updateSelectedRetailer, saveRetailer, setUpdateSuccessfulStatus, deleteRetailer, clearRetailer } = useStoreActions(({ retailers }) => retailers);
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const isAuthenticated = checkAuthentication();
        setAuthenticated(isAuthenticated);
        if(isAuthenticated) {
            fetchRetailers();
        } else {
            window.location.href = '/login';
        }
    }, []);

    // TODO: redirect to login screen
    if (!authenticated) return null;

    if (isFalsy(retailers)) return null;
    
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

    const updateRetailerCharges = () => {
        saveRetailer({ isUpdate: editType === 'update' });
    }

    const setSelectedRetailer = ({value}) => {
        const values = find(retailers, { 'id': parseInt(value) });
        updateSelectedRetailer(values);
    }

    return (
        <Grid container spacing={ 24 }>
            <Grid item xs={ 1 } />
            <Grid item xs={10}>
                <Paper>
                    <PaperInner>
                        {
                            editType === 'update' &&
                            <Grid 
                                container 
                                spacing={12} 
                                alignItems="center"
                                justify="center" 
                                spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <TextFieldWrapper>
                                    <TextField 
                                        label="Retailer" 
                                        onChange={() => setSelectedRetailer({ value: event.srcElement.dataset.value })}
                                        value={retailer.id || ''}
                                        fullWidth
                                        select>
                                        {
                                            retailers.map(r => (
                                            <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    </TextFieldWrapper>
                                </Grid>
                            </Grid>
                        }
                        <Grid container 
                            spacing={12} 
                            alignItems="center"
                            justify="center" 
                            spacing={0}>
                            <Grid item xs={12} sm={6}>
                                <TextFieldWrapper>
                                    <TextField
                                        label='Retailer Name'
                                        placeholder=''
                                        onChange={() => updateRetailer({ key: 'name', value: event.target.value })}
                                        fullWidth
                                        value={retailer.name || ''}
                                    />
                                </TextFieldWrapper>
                            </Grid>
                        </Grid>
                        <Grid container 
                            spacing={12} 
                            alignItems="center"
                            justify="center" 
                            spacing={0}>
                            <Grid item xs={12} sm={4}>
                                <TextFieldWrapper>
                                <TextField
                                    label='Delivery Charge'
                                    placeholder=''
                                    onChange={() => updateRetailer({ key: 'deliverySurcharge', value: event.target.value })}
                                    fullWidth
                                    value={retailer.deliverySurcharge || ''}
                                />
                                </TextFieldWrapper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFieldWrapper>
                                <TextField
                                    label='Additional Piece Charge'
                                    placeholder=''
                                    onChange={() => updateRetailer({ key: 'deliveryPieceSurcharge', value: event.target.value })}
                                    fullWidth
                                    value={retailer.deliveryPieceSurcharge || ''}
                                />
                                </TextFieldWrapper>
                            </Grid>
                        </Grid>
                        <Grid container 
                            spacing={12} 
                            alignItems="center"
                            justify="center" 
                            spacing={0}>
                            <Grid item xs={12} sm={4}>
                                <TextFieldWrapper>
                                <TextField
                                    label='Long Distance Delivery Charge'
                                    placeholder=''
                                    onChange={() => updateRetailer({ key: 'longDistanceDeliverySurcharge', value: event.target.value })}
                                    fullWidth
                                    value={retailer.longDistanceDeliverySurcharge || ''}
                                />
                                </TextFieldWrapper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFieldWrapper>
                                <TextField
                                    label='Long Distance Additional Piece Charge'
                                    placeholder=''
                                    onChange={() => updateRetailer({ key: 'longDistancePieceSurcharge', value: event.target.value })}
                                    fullWidth
                                    value={retailer.longDistancePieceSurcharge || ''}
                                />
                                </TextFieldWrapper>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            spacing={12}
                            alignItems="center"
                            justify="center" 
                            spacing={0}> 
                            <Grid item xs={ 12 }>
                                <NextButtonWrapper>
                                    {
                                        editType === 'update' &&
                                        <NextButton
                                            color="secondary" 
                                            size="large"
                                            disabled={isFalsy(retailer.name)}
                                            onClick={ () => deleteRetailer(retailer.id) }>
                                            Delete
                                        </NextButton>
                                    }
                                    <NextButton
                                        color="primary" 
                                        size="large"
                                        onClick={ () => clearRetailer() }>
                                        Clear
                                    </NextButton>
                                    {
                                        editType === 'update' &&
                                        <NextButton
                                            color="primary" 
                                            size="large"
                                            onClick={ () => resetRetailer({isUpdate: editType === 'update'}) }>
                                            Reset
                                        </NextButton>
                                    }
                                    <NextButton
                                        color="primary" 
                                        size="large"
                                        onClick={ () => updateRetailerCharges() }>
                                        {editType === 'update' ? 'Update' : 'Save'}
                                    </NextButton>
                                </NextButtonWrapper>
                            </Grid>
                        </Grid>
                    </PaperInner>
                </Paper>
            </Grid>
            <Grid item xs={ 1 } />
        </Grid>
    )
};

export default Retailers;

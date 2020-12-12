import { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Grid, TextField, Paper, MenuItem } from "@material-ui/core";
import { NextButtonWrapper, PaperInner, TextFieldWrapper, NextButton } from "./retailers.styles";
import { isFalsy } from '../../lib/is-falsy'
import { isTruthy } from '../../lib/is-truthy'
import find from 'lodash/find'

const Retailers = () => {
    const { retailer, retailers } = useStoreState(({ retailers }) => retailers);
    const { fetchRetailers, updateRetailer, updateSelectedRetailer } = useStoreActions(({ retailers }) => retailers);
    
    useEffect(() => {
        fetchRetailers();
    }, []);

    if (isFalsy(retailers)) return null;

    const getValue = field => isTruthy(field) ? field : '';

    const submitForm = () => {
        debugger;
        return true;
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
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={4}>
                            <TextFieldWrapper>
                            <TextField
                                label='Delivery Charge'
                                placeholder=''
                                onChange={() => updateRetailer({ key: 'deliverySurcharge', value: event.target.value })}
                                fullWidth
                                value={getValue(retailer.deliverySurcharge)}
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
                            <NextButton
                                color="primary" 
                                size="large"
                                onClick={ () => submitForm() }>
                                Next
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

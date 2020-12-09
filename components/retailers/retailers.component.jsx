import { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Grid, TextField, Paper, MenuItem } from "@material-ui/core";
import { NextButtonWrapper, PaperInner, TextFieldWrapper, NextButton } from "./retailers.styles";
import { isFalsy } from '../../lib/is-falsy'

const Retailers = () => {
    const { retailers } = useStoreState(({ retailers }) => retailers);
    const { fetchRetailers } = useStoreActions(({ retailers }) => retailers);
    
    useEffect(() => {
        fetchRetailers();
    }, []);

    if (isFalsy(retailers)) return null;

    console.log('RETAILERS', retailers)

    const getValue = field => isTruthy(field) ? field : '';

    const submitForm = () => {
        debugger;
        return true;
    }

    const updateSetting = () => {
        debugger;
        return true;
    }

    return (
        <Grid container spacing={ 24 }>
        <Grid item xs={ 1 } />
        <Grid item xs={10}>
            <Paper>
            <PaperInner>
                <Grid container spacing={24}>
                <Grid item xs={12} sm={4}>
                    <TextFieldWrapper>
                    <TextField 
                        label="Retailer" 
                        onChange={() => updateSetting({ key: 'retailer', value: event.srcElement.dataset.value })}
                        fullWidth
                        select>
                        {/* value={getValue(retailer)}> */}
                        {
                            retailers.map(r => (
                            <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                            ))
                        }
                    </TextField>
                    </TextFieldWrapper>
                </Grid>
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

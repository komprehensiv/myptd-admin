import { Grid, Paper, TextField } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { checkAuthentication } from "../../lib/checkAuthentication";
import { Root } from "../../styles/index.styles";
import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import { NextButton, NextButtonWrapper, PaperInner, TextFieldWrapper } from "../retailers/retailers.styles";
import Shell from "../shell/shell.component";
import { ErrorText } from './login.styles'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [badCredentials, setBadCredentials] = useState(false);
    const { authenticate } = useStoreActions(({ authentication }) => authentication);

    const doLogin = async () => {
        setBadCredentials(false);
        const credentials = { email, password };
        const { isValid, token } = await authenticate(credentials);
        if (isValid) {
            const authenticated = checkAuthentication(token);
            if (authenticated) {
                window.location.href = '/';
            }
        } else {
            // not valid
            setBadCredentials(true);
        }
    }

    return (
        <Root>
            <Header />
            <Shell>
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
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldWrapper>
                                            <TextField
                                                label='Email'
                                                placeholder=''
                                                onChange={() => setEmail(event.target.value)}
                                                fullWidth
                                                value={email} />
                                            <TextField
                                                label='Password'
                                                type='password'
                                                placeholder=''
                                                onChange={() => setPassword(event.target.value)}
                                                fullWidth
                                                value={password} />
                                        </TextFieldWrapper>
                                        {
                                            badCredentials &&
                                            <ErrorText>Incorrect credentials.  Please retry</ErrorText>
                                        }
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
                                                onClick={ () => doLogin() }>
                                                Login
                                            </NextButton>

                                        </NextButtonWrapper>
                                    </Grid>
                                </Grid>
                            </PaperInner>
                        </Paper>
                    </Grid>
                </Grid>
            </Shell>
            <Footer />
        </Root>
    );
}

export default Login;

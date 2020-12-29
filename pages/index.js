import { Root } from '../styles/index.styles'
import Header from '../components/header/header.component'
import Footer from '../components/footer/footer.component'
import Shell from '../components/shell/shell.component'
import Retailers from '../components/retailers/retailers.component'
import EmailRecipients from '../components/email-recipients/email-recipients.component'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { ButtonGroup } from '@material-ui/core'
import { NextButton } from '../components/retailers/retailers.styles'
import { useState } from 'react'

const EMAIL_RECIPIENTS = 'email recipients';
const RETAILERS = 'retailers';

const buttonGroupStyle = { marginBottom: '20px', display: 'flex', justifyContent: 'center' };

export default function Home() {
  const { editType } = useStoreState(({ edit }) => edit);
  const { setEditType } = useStoreActions(({ edit }) => edit);
  const [section, setSection] = useState(RETAILERS);

  return (
    <Root>
      <Header />
      <Shell>
        <ButtonGroup disableElevation color="primary" style={buttonGroupStyle}>
          <NextButton noMargin disabled={section === RETAILERS} onClick={() => setSection(RETAILERS)}>Retailers</NextButton>
          <NextButton noMargin disabled={section === EMAIL_RECIPIENTS} onClick={() => setSection(EMAIL_RECIPIENTS)}>Email Recipients</NextButton>
        </ButtonGroup>
        {
          section === RETAILERS &&
          <>
            <ButtonGroup disableElevation color="primary" style={buttonGroupStyle}>
              <NextButton noMargin disabled={editType === 'create'} onClick={() => setEditType('create')}>Create</NextButton>
              <NextButton noMargin disabled={editType === 'update'} onClick={() => setEditType('update')}>Update</NextButton>
            </ButtonGroup>
            <Retailers />
          </>
        }
        {
          section === EMAIL_RECIPIENTS &&
          <EmailRecipients />
        }
        <ToastContainer newestOnTop={false} rtl={false} pauseOnVisibilityChange />
      </Shell>
      <Footer />
    </Root>
  )
}

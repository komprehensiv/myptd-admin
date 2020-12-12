import { Root } from '../styles/index.styles'
import Header from '../components/header/header.component'
import Footer from '../components/footer/footer.component'
import Shell from '../components/shell/shell.component'
import Retailers from '../components/retailers/retailers.component'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { ButtonGroup } from '@material-ui/core'
import { NextButton } from '../components/retailers/retailers.styles'

export default function Home() {
  const { editType } = useStoreState(({ edit }) => edit);
  const { setEditType } = useStoreActions(({ edit }) => edit);

  return (
    <Root>
      <Header />
      <Shell>
        <ButtonGroup disableElevation color="primary" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <NextButton noMargin disabled={editType === 'create'} onClick={() => setEditType('create')}>Create</NextButton>
          <NextButton noMargin disabled={editType === 'update'} onClick={() => setEditType('update')}>Update</NextButton>
        </ButtonGroup>
        <Retailers />
        <ToastContainer newestOnTop={false} rtl={false} pauseOnVisibilityChange />
      </Shell>
      <Footer />
    </Root>
  )
}

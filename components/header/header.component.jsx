import { AppBar, LogoContainer, Toolbar, Logo } from "./header.styles";

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <Logo src='/images/logo.jpg' alt='MyPTD' />
        </LogoContainer>
      </Toolbar>
    </AppBar>
  )
};

export default Header;
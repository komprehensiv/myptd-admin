import { FooterMapLink, FooterWrapper } from "./footer.styles";

const Footer = () => {
  return (
    <FooterWrapper>
      <div>&copy;2004-{new Date().getFullYear()} Southland Service Group, Inc.</div>
      <div>All Rights Reserved</div>
      <div>
        <FooterMapLink href="https://goo.gl/maps/3lJhR" target="_blank">485 Horizon Drive, Suite 800, Suwanee, GA 30024-7742</FooterMapLink>
      </div>
      <div>Want to talk to a human? We would love to hear from you: 770-717-2770</div>
    </FooterWrapper>
  )
};

export default Footer;
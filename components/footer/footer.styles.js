import styled from "styled-components";
import { colors } from "../../styles/styles";

export const FooterWrapper = styled.div`
  text-align: center;
  font-size: 0.7rem;
  color: ${colors.stepLabel};
  background-color: ${colors.offWhite};
  font-family: inherit;
  margin-top: 3rem;
  padding-bottom: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const FooterMapLink = styled.a`
  text-decoration: underline;
  color: ${colors.stepLabel};
`;
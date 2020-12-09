import styled from 'styled-components'
import { colors } from '../../styles/styles';

export const AppBar = styled.header`
  font-size: 1.6rem;
  background-color: ${colors.offWhite};
  color: ${colors.white};
  position: static;
  width: 100%;
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 10px;
  padding-bottom: 1rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
`;

export const LogoContainer = styled.h2`
  line-height: 1rem;
  margin: 0;
  display: block;
`;

export const Logo = styled.img`
  height: 80px;
`;

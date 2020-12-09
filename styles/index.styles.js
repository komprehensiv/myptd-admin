import styled from 'styled-components'
import { colors } from './styles';

export const Root = styled.div`
    height: 100vh;
    flex-grow: 1;
    background-color: ${colors.offWhite};
`;

export const Title = styled.h1`
  font-size: 50px;
  color: ${colors.primary};
`;

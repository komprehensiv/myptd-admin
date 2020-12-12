import { Button, FormControlLabel, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/styles";

export const OrderInformationWrapper = styled.div`
    padding: 2.2rem;
    display: flex;
    flex-wrap: wrap;
`;

export const PaperInner = styled.div`
    padding: 22px;
    display: flex;
    flex-wrap: wrap;
`;

export const TextFieldWrapper = styled.div`
    padding: 12px;
    & .MuiFormLabel-root {
        font-size: 18px !important;
        font-family: Proxima, Arial, Helvetica, sans-serif !important;
        font-weight: 300 !important;
        line-height: 1.5 !important;
        transform: translate(0, 1.5px) scale(0.75) !important;
        transform-origin: top left !important;
        width: max-content;
    }
    & .MuiInputBase-root {
        margin-top: 24px !important;
        position: relative !important;

        :before {
        border-bottom: 0px !important;
        }
    }
    & .MuiInputBase-input {
        width: calc(100% - 24px) !important;
        border: 1px solid #ced4da !important;
        padding: .429rem 1.072rem !important;
        font-size: 16px !important;
        transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
        border-radius: 4px !important;
        background-color: #fff !important;
        height: 1.1875em !important;
    }
`;

export const FormControlLabelLight = styled(FormControlLabel)`
    & .MuiFormControlLabel-label {
        color: ${colors.labelLight};
    }
`;

export const TooltipLight = styled(Tooltip)`
    & .MuiFormControlLabel-label {
        color: ${colors.labelLight};
    }
`;

export const NextButtonWrapper = styled.div`
    text-align: center;
`;

export const NextButton = styled(Button)`
    background-color: ${({ disabled }) => (disabled ? `${colors.offWhite} !important` : `${colors.buttonPrimary} !important}`)};
    color: ${({ disabled }) => (disabled ? `${colors.buttonTextBlackDisabled} !important` : `${colors.white} !important}`)};
    padding: 8px 24px !important;
    min-width: 112px !important;
    min-height: 40px !important;
    margin-left: ${({ noMargin }) => (noMargin ? '0' : '5px !important')};
    margin-right: ${({ noMargin }) => (noMargin ? '0' : '5px !important')};
`;

import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 40%;
    height: 40%;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;
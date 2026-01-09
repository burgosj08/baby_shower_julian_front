import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 24px;
  color: #555;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li<{ disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: ${({ disabled }) => (disabled ? "#e5e7eb" : "#f9fafb")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const GiftInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const GiftImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Category = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#9ca3af" : "#2563eb")};

  &:hover {
    opacity: 0.9;
  }
`;

export const AdminActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

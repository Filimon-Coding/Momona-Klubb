import React from 'react';
import styled from 'styled-components';

// Container with grid layout
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 40px;
  font-family: 'Arial', sans-serif;
`;

// Grid item
const GridItem = styled.div`
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

function TestPage() {
  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Momona Klubb Grid Example</h1>
      <GridContainer>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </GridContainer>
    </>
  );
}

export default TestPage;

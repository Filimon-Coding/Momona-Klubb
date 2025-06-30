import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: rgba(0, 0, 0, 0.6);
  color: #fff1d6;
  padding: 30px 40px;
  backdrop-filter: blur(4px);
  position: relative;
  bottom: 0;
  width: 100%;
  z-index: 900;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

const ContactInfo = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;

  span {
    display: block;
  }
`;

const Copyright = styled.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: #ffe9b0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <strong>Momona Klubb</strong>
        <ContactInfo>
          <span>📍 Osterhaus' gate 7B, 0183 Oslo</span>
          <span>📞 +47 123 45 678</span>
          <span>✉️ alem.tewele7@gmail.com</span>
        </ContactInfo>
        <Copyright>
          &copy; {new Date().getFullYear()} Momona Klubb — All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

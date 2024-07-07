/* eslint-disable no-undef */
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import { Image } from '@mantine/core';
import { Button } from '../../common/Button';
import { RightBlockContainer, Content, ContentWrapper, ButtonWrapper } from './styles';

const RightBlock = ({ title, content, button, icon, titleColor, textColor, id, style, note }) => {
  const navigate = useNavigate();
  return (
    <RightBlockContainer style={style}>
      <Fade direction="right">
        <Row justify="space-between" id={id}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <ContentWrapper>
              <h6 className={titleColor}>{title}</h6>
              {Array.isArray(content) ? (
                content.map((txt) => (
                  <Content className={textColor} key={1}>
                    {txt}
                  </Content>
                ))
              ) : (
                <Content className={textColor}>{content}</Content>
              )}
              <ButtonWrapper>
                {typeof button === 'object' &&
                  button.map((item, idx) => (
                    <Button
                      key={idx}
                      color={item.color}
                      className={item.className}
                      fixedWidth
                      onClick={() =>
                        item.link
                          ? item.link.type === 'internal'
                            ? navigate(item.link.to)
                            : window.open(item.link.to)
                          : ''
                      }
                    >
                      {item.title}
                    </Button>
                  ))}
              </ButtonWrapper>
              {note && (
                <Content className="text-white" style={{ fontSize: 30 }}>
                  Win your claim, or <br />
                  Get your money back - GUARANTEED!
                </Content>
              )}
            </ContentWrapper>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Image src={icon} />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;

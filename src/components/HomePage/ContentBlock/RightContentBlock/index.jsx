/* eslint-disable no-undef */
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import { Highlight } from '@mantine/core';
import { SvgIcon } from '../../common/SvgIcon';
import { Button } from '../../common/Button';
import { RightBlockContainer, Content, ContentWrapper, ButtonWrapper } from './styles';

const RightBlock = ({ title, content, button, icon, titleColor, textColor, id, style, note }) => {
  const navigate = useNavigate();
  // const scrollTo = (idx) => {
  //   const element = document.getElementById(idx);
  //   element.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // };
  return (
    <RightBlockContainer style={style}>
      <Fade direction="right">
        <Row justify="space-between" id={id}>
          <Col lg={6} md={6} sm={6} xs={12}>
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
                <Content>
                  <Highlight highlight="money back - GUARANTEED!">
                    Win your claim, or get your money back - GUARANTEED!
                  </Highlight>
                </Content>
              )}
            </ContentWrapper>
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;

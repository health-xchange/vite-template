import { Row, Col } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { SvgIcon } from '../../common/SvgIcon';
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from './styles';

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  titleColor,
  textColor,
  id,
  style,
}) => (
    <LeftContentSection style={style}>
      <Fade direction="left">
        <Row className="d-flex" justify="space-between" id={id}>
          <Col lg={6} md={6} sm={12} xs={12}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <ContentWrapper>
              <h6 className={titleColor}>{title}</h6>
              {
                Array.isArray(content) ? content.map((txt) => <Content className={textColor} key={1}>{txt}</Content>) :
                  <Content className={textColor}>{content}</Content>
              }
              <ServiceWrapper>
                <Row justify="space-between">
                  {typeof section === 'object' &&
                    section.map((item, idx) => (
                        <Col key={idx} span={11}>
                          <SvgIcon src={item.icon} width="60px" height="60px" />
                          <MinTitle>{item.title}</MinTitle>
                          <MinPara>{item.content}</MinPara>
                        </Col>
                      ))}
                </Row>
              </ServiceWrapper>
            </ContentWrapper>
          </Col>
        </Row>
      </Fade>
    </LeftContentSection>
  );

export default LeftContentBlock;

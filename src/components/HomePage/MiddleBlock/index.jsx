/* eslint-disable no-undef */
import { useState } from 'react';
import { Row } from 'antd';
import { Slide } from 'react-awesome-reveal';
import { Collapse, Card, CardHeader, CardBody } from 'reactstrap';
import { Button } from '../common/Button';
import { Content } from './styles';
import './styles.css';
import MarkdownRenderer from '../MarkdownRenderer';

const MiddleBlock = ({ title, content, button, accordion }) => {
  const [collapse, setCollapse] = useState(0);

  const toggle = (e) => {
    const { event } = e.target.dataset;
    setCollapse(collapse === Number(event) ? undefined : Number(event));
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Slide direction="up">
      <Row justify="center" align="middle">
        <h6>{title}</h6>
        {content && <Content>{content}</Content>}
        {button && (
          <Button name="submit" onClick={() => scrollTo('mission')}>
            {button}
          </Button>
        )}
        {accordion &&
          accordion.map((item, id) => (
            <Card className="w-100 mb-2" key={id}>
              <CardHeader
                className="text-left text-white d-flex justify-content-between"
                style={{ backgroundColor: '#2e186a' }}
                onClick={toggle}
                data-event={id}
              >
                {item.type === 'markdown' ? (
                  <MarkdownRenderer className="m-0 text-color-white" content={item.title} />
                ) : (
                  <span>{item.title}</span>
                )}
                <span>
                  <i className={collapse === id ? 'fa fa-minus' : 'fa fa-plus'} />
                </span>
              </CardHeader>
              <Collapse isOpen={collapse === id}>
                <CardBody className="text-left font-weight-bold">
                  {item.type === 'markdown' ? (
                    <MarkdownRenderer content={item.content} />
                  ) : (
                    item.content
                  )}
                </CardBody>
              </Collapse>
            </Card>
          ))}
      </Row>
    </Slide>
  );
};

export default MiddleBlock;

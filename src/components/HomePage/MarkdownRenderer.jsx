import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
  const customRenderers = {
    // Customize how headings are rendered
    heading: (props) => <h2 style={{ color: 'blue' }}>{props.children}</h2>,
    // Customize how links are rendered
    link: (props) => (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      ),
  };

  return (
    <div>
      <ReactMarkdown renderers={customRenderers}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

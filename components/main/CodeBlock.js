import React, { useRef } from 'react';
import styles from '../../styles/Datastories.module.css';  

const CodeBlock = ({ code }) => {
  const textareaRef = useRef(null);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();  // Select the text
      document.execCommand('copy');  // Copy it
    }
  };

  const lines = code.split('\n');
  
  return (
    <div className={styles.codeblock}>
      <button onClick={copyToClipboard} className={styles.copyButton}>
        <img src="/images/svg/copy.svg" alt="Copy" />
      </button>
      <textarea ref={textareaRef} value={code} readOnly style={{ position: 'absolute', left: '-9999px' }} />
      {lines.map((line, index) => (
        <div key={index}>
          {line}
        </div>
      ))}
    </div>
  );
}

export default CodeBlock;

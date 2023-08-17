import React, { useRef } from 'react';
import styles from '../../styles/CodeBlock.module.css';  

const CodeBlock = ({ code, language }) => {
  const textareaRef = useRef(null);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();  // Select the text
      document.execCommand('copy');  // Copy it
    }
  };

  const formattedLines = React.useMemo(() => {
    return code.split('\n').filter(line => line.trim() !== '');
}, [code]);


  const lines = code.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

  const isComment = (text) => text.trim().startsWith('#');
  const isOpeningTag = (text) => /<\w+>/.test(text);
  const isClosingTag = (text) => /<\/\w+>/.test(text);
  const isJsonKey = (text) => language === "json" && /"\w+":/.test(text);
  const isJsonValue = (text) => language === "json" && /": *".+"/.test(text);

  const getIndentation = (text) => {
    const matches = text.match(/^(\s+)/);
    return matches ? matches[0].length : 0;
  };
  
  const getClassNameForPart = (part) => {
    if (isComment(part)) return styles.commentLine;
    if (isOpeningTag(part) || isClosingTag(part)) return styles.innerTagLine;
    if (isJsonKey(part)) return styles.jsonKey;
    if (isJsonValue(part)) return styles.jsonValue;
    return ''; // default style
  };

  const getClassForJSONValue = (value) => {
    if (typeof value === "string") return styles.jsonValue;
    if (typeof value === "number") return styles.jsonNumber;
    if (typeof value === "boolean") return styles.jsonBoolean;
    return "";
  };

 const parseAndHighlightJSON = (jsonObj, depth = 0) => {
    if (!jsonObj) return [];

    let elements = [];
    const indentSize = 2; // Change this value for different indentation sizes
    const getIndent = (depth) => Array(indentSize * depth).join(' '); 

    for (let key in jsonObj) {
        let value = jsonObj[key];
        if (typeof value === "object" && value !== null) {
            elements.push(<div style={{ whiteSpace: 'pre' }}>{getIndent(depth)}<span className={styles.jsonKey}>"{key}":</span> {"{"}</div>);
            elements.push(...parseAndHighlightJSON(value, depth + 1));
            elements.push(<div style={{ whiteSpace: 'pre' }}>{getIndent(depth)}{"}"},</div>);
        } else {
            elements.push(<div style={{ whiteSpace: 'pre' }}>{getIndent(depth)}<span className={styles.jsonKey}>"{key}":</span> <span className={getClassForJSONValue(value)}>{JSON.stringify(value)}</span>,</div>);
        }
    }

    return elements;
};

  

  return (
    <div className={styles.codeblock}>
      <button onClick={copyToClipboard} className={styles.copyButton}>
        <img src="/images/svg/copy.svg" alt="Copy" />
      </button>
      <textarea ref={textareaRef} value={code} readOnly style={{ position: 'absolute', left: '-9999px' }} />
      {language === "json" ? (
        <div>
          {parseAndHighlightJSON(JSON.parse(code))}
        </div>
      ) : (
        lines.map((line, index) => (
          <div key={index} style={{ marginLeft: `${getIndentation(line) * 10}px` }}>
            {line.trim().split(/(#[^\n]*|<[^>]+>|"\w+":|": ".+")/g).map((part, partIndex) => (
              <span key={partIndex} className={getClassNameForPart(part)}>
                {part}
              </span>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default CodeBlock;
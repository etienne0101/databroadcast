import { marked } from 'marked';

const MarkdownRenderer = ({ content }) => {
  const createMarkup = () => {
    
    let html = marked(content);

    // Add class to headings
    html = html.replace(/<h1>/g, '<h1 class="custom-h1">');
    html = html.replace(/<h2>/g, '<h2 class="custom-h2">');
    html = html.replace(/<h3>/g, '<h3 class="custom-h3">');

    // Add class to links
    html = html.replace(/<a /g, '<a class="custom-link" ');

    // Add class to bold text
    html = html.replace(/<strong>/g, '<strong class="custom-bold">');

    // Add class to italic text
    html = html.replace(/<em>/g, '<em class="custom-italic">');

    // Add class to blockquote (quotes)
    html = html.replace(/<blockquote>/g, '<blockquote class="custom-quote">');

    html = html.replace(/<pre>/g, '<pre class="custom-code">');

    html = html.replace(/<code>(.*?)<\/code>/g, '<span class="custom-inline-code">$1</span>');
    
    html = html.replace(
        /%%Viz:data=(.*?),viztype=(.*?),x=(.*?),y=(.*?)(?:,plotlabel=(.*?))?%%/g,
        (match, dataUrl, vizType, xKey, yKey, plotLabel = '') => {
            if (vizType === 'linechart') {
                return `<div class="dataviz-container" data-url="${dataUrl}" data-viztype="${vizType}" data-xkey="${xKey}" data-ykey="${yKey}"></div>`;
            } else if (vizType === 'plotchart') {
                return `<div class="dataviz-container" data-url="${dataUrl}" data-viztype="${vizType}" data-xkey="${xKey}" data-ykey="${yKey}" data-plotlabel="${plotLabel}"></div>`;
            }
        }
      );
      html = html.replace(
        /%%Viz:data=(.*?),viztype=plotmap,plotlabel=(.*?),view=(.*?)%%/g,
        (match, dataUrl, plotLabel, view) => {
          return `<div class="dataviz-container" data-url="${dataUrl}" data-viztype="plotmap" data-plotlabel="${plotLabel}" data-view="${view}"></div>`;
        }
      );
      
      
      console.log('Processed HTML:', html); // Log processed HTML

    return { __html: html };
  };
  

  return (
    <div className="markdown-content" dangerouslySetInnerHTML={createMarkup()} />
  );
};

export default MarkdownRenderer;
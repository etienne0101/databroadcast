// pages/blog/[filename].js
import React, {useEffect } from 'react';
import MarkdownRenderer from '../../components/posts/blog/MarkdownRenderer'; 
import ReactDOM from 'react-dom';
import LineChart from '../../components/posts/blog/viz/LineChart'; // Adjust the path as needed
import PlotChart from '../../components/posts/blog/viz/PlotChart'; // Adjust the path as needed
import dynamic from 'next/dynamic';
import BlogLayout from '../../components/main/BlogLayout';

const PlotMap = dynamic(() => import('../../components/posts/blog/viz/PlotMap'), { ssr: false });


// pages/blog/[filename].js
export async function getServerSideProps(context) {
    const { filename } = context.params;
    
    // Construct the full URL for the API call
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const url = `${protocol}://${host}/api/posts/md/content/${filename}`;
  
    // Fetch the markdown content and metadata from the API
    const res = await fetch(url);
    const data = await res.json();
  
    // Pass the content and metadata to the page component
    return {
      props: {
        content: data.content,
        metadata: data.metadata,
      },
    };
  }
  
  const BlogPost = ({ content, metadata }) => {
    useEffect(() => {
        const containers = document.querySelectorAll('.dataviz-container');
        console.log("Found containers:", containers.length); // Debugging line

        containers.forEach(container => {
            let dataUrl = `/api/posts/data/${container.getAttribute('data-url')}`;
            const vizType = container.getAttribute('data-viztype');
            const xKey = container.getAttribute('data-xkey');
            const yKey = container.getAttribute('data-ykey');
            const plotLabel = container.getAttribute('data-plotlabel');
        
            // Add query parameters if they exist
            const queryParams = new URLSearchParams();
            if (xKey) queryParams.append('x', xKey);
            if (yKey) queryParams.append('y', yKey);
            if (plotLabel) queryParams.append('plotLabel', plotLabel);
            if (queryParams.toString()) dataUrl += `?${queryParams.toString()}`;

            if (vizType === 'linechart') {
                const xKey = container.getAttribute('data-xkey');
                const yKey = container.getAttribute('data-ykey');
                ReactDOM.render(<LineChart dataUrl={dataUrl} xKey={xKey} yKey={yKey} />, container);
            } else if (vizType === 'plotchart') {
                const xKey = container.getAttribute('data-xkey');
                const yKey = container.getAttribute('data-ykey');
                const plotLabel = container.getAttribute('data-plotlabel');
                ReactDOM.render(<PlotChart dataUrl={dataUrl} xKey={xKey} yKey={yKey} plotLabel={plotLabel} />, container);
            } else if (vizType === 'plotmap') {
                const view = container.getAttribute('data-view');
                const colorField = container.getAttribute('data-color');
                ReactDOM.render(<PlotMap dataUrl={dataUrl} view={view} colorField={colorField} />, container);
            }
        });
    }, [content]);

    return (
        <BlogLayout>
        <div className="blog-post-container">
          <h1 className="post-title">{metadata.title}</h1>
          <MarkdownRenderer content={content} />
        </div>
        </BlogLayout>
      );
};
  
export default BlogPost;
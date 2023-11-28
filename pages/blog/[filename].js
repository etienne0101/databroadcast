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
        console.log('DataViz Containers:', containers); // Log to see if plotmap container is present
    
        containers.forEach(container => {
            const dataUrlBase = `/api/posts/data/${container.getAttribute('data-url')}`;
            const vizType = container.getAttribute('data-viztype');
            const queryParams = new URLSearchParams({ vizType }); // Always include vizType

            if (vizType === 'linechart' || vizType === 'plotchart') {
                const xKey = container.getAttribute('data-xkey');
                const yKey = container.getAttribute('data-ykey');
                const plotLabel = container.getAttribute('data-plotlabel');

                if (xKey) queryParams.append('x', xKey);
                if (yKey) queryParams.append('y', yKey);
                if (plotLabel) queryParams.append('plotLabel', plotLabel);

                const dataUrl = `${dataUrlBase}?${queryParams.toString()}`;
                console.log(`API URL for ${vizType}:`, dataUrl);


                if (vizType === 'linechart') {
                    ReactDOM.render(<LineChart dataUrl={dataUrl} xKey={xKey} yKey={yKey} />, container);
                } else if (vizType === 'plotchart') {
                    ReactDOM.render(<PlotChart dataUrl={dataUrl} xKey={xKey} yKey={yKey} plotLabel={plotLabel} />, container);
                }
            } else if (vizType === 'plotmap') {
                const view = container.getAttribute('data-view');
                const plotLabel = container.getAttribute('data-plotlabel');
                const colorField = container.getAttribute('data-color'); // if you use colorField

                if (plotLabel) queryParams.append('plotLabel', plotLabel);
                const dataUrl = `${dataUrlBase}?${queryParams.toString()}`;

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
import React, { useEffect } from 'react';
import MarkdownRenderer from '../../components/posts/blog/MarkdownRenderer';
import ReactDOM from 'react-dom';
import LineChart from '../../components/posts/blog/viz/LineChart';
import PlotChart from '../../components/posts/blog/viz/PlotChart';
import dynamic from 'next/dynamic';
import BlogLayout from '../../components/main/BlogLayout';

const PlotMap = dynamic(() => import('../../components/posts/blog/viz/PlotMap'), { ssr: false });

export async function getServerSideProps(context) {
    const { filename } = context.params;
    
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const url = `${protocol}://${host}/api/posts/md/content/${filename}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
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

        containers.forEach(container => {
            const dataUrlBase = `/api/posts/data/${container.getAttribute('data-url')}`;
            const vizType = container.getAttribute('data-viztype');
            const queryParams = new URLSearchParams({ vizType });

            if (vizType === 'plotchart') {
                const xKey = container.getAttribute('data-xkey');
                const yKey = container.getAttribute('data-ykey');
                const colorKey = container.getAttribute('data-colorkey');
                const plotLabel = container.getAttribute('data-plotlabel');

                queryParams.append('x', xKey);
                queryParams.append('y', yKey);
                queryParams.append('color', colorKey);
                queryParams.append('plotLabel', plotLabel);

                const dataUrl = `${dataUrlBase}?${queryParams.toString()}`;
                console.log(`API URL for ${vizType}:`, dataUrl);

                ReactDOM.render(
                    <PlotChart 
                        dataUrl={dataUrl} 
                        xKey={xKey} 
                        yKey={yKey} 
                        colorKey={colorKey}
                        plotLabel={plotLabel} 
                    />, 
                    container
                );
            }

            if (vizType === 'linechart') {
                const xKey = container.getAttribute('data-xkey');
                const yKey = container.getAttribute('data-ykey');
                const plotLabel = container.getAttribute('data-plotlabel');

                queryParams.append('x', xKey);
                queryParams.append('y', yKey);
                queryParams.append('plotLabel', plotLabel);

                const dataUrl = `${dataUrlBase}?${queryParams.toString()}`;
                console.log(`API URL for ${vizType}:`, dataUrl);

                ReactDOM.render(
                    <LineChart dataUrl={dataUrl} xKey={xKey} yKey={yKey} />, 
                    container
                );
            }

            if (vizType === 'plotmap') {
                const view = container.getAttribute('data-view');
                const plotLabel = container.getAttribute('data-plotlabel');
                const color = container.getAttribute('data-color');

                queryParams.append('plotLabel', plotLabel);
                queryParams.append('color', color);

                const dataUrl = `${dataUrlBase}?${queryParams.toString()}`;
                ReactDOM.render(
                    <PlotMap dataUrl={dataUrl} view={view} colorField={color} />, 
                    container
                );
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

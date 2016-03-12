/**
 * Created by luowei on 3/12/16.
 */
import React from 'react';
import marked from 'marked';

const Article = (props) => (
  <article id='article'>
    <h2>
      <span className='article_title'>{props.article.title}</span>
      <small>
        <span>来自：<span className='article_channel'>{props.article.channel}</span></span>
        <span className='article_timeRecorded'>12小时前</span>
      </small>
    </h2>
    {/*todo cache marked content*/}
    <div id='article_content' dangerouslySetInnerHTML={{__html: marked(props.article.content)}}></div>
  </article>
);

export default Article;
const pageOnError = (message) => `
      <style>
      #empty_article{
            text-align: center;
      }

      figcaption a{
            font-size: 12px;
      }

      .warning{
            font-style: italic;
      }

      .empty_article_figure img{
            width: 60%;
      }

      </style>
      
      <article id="empty_article">
            <figure class="empty_article_figure">
                  <img src="./images/nodata.png" 
                        alt="Empty Article Image">
                  <figcaption>
                        <a href="https://storyset.com/data" aria-label="image attribution link" tabindex="0">Illustration by Freepik Storyset</a>                                   
                  </figcaption>
            </figure>
            <h3 class="warning" tabindex="0">
                  ${message}
            </h3>
      </article>   
`;

export default pageOnError;

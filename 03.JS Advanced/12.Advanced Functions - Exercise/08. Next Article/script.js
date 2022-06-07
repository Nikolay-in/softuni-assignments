function getArticleGenerator(articles) {
    return () => {
        let article = articles.shift();
        if (article !== undefined) {
            let output = document.createElement('article');
            output.textContent = article;
            let content = document.querySelector('#content');
            content.appendChild(output);
        }
    }
}

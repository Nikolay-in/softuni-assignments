function solution() {
    //Get main section
    let main = document.getElementById('main');

    //Get articles
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    .then(res => res.json())
    .then(data => handleData(data))
    .catch((e) => { console.log(e.message) });

    const handleData = (data) => { 
        for (article of data) {
            //article div
            let accordion = document.createElement('div');
            accordion.className = 'accordion';
            main.appendChild(accordion);

            //head div
            let head = document.createElement('div');
            head.className = 'head'
            accordion.appendChild(head)

            //title
            let title = document.createElement('span')
            title.textContent = article.title;
            head.appendChild(title)

            //button
            let button = document.createElement('button');
            button.className = 'button';
            button.id = article._id;
            button.textContent = 'More'
            button.addEventListener('click', moreHandler);
            head.appendChild(button);
        }
    }

    function moreHandler(e) {
        //If content is not present
        if (!e.target.parentElement.nextElementSibling) {
            //Get article
            let articleId = e.target.id;

            //Fetch data
            fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + articleId)
            .then(res => res.json())
            .then(data => handleContent(data.content))
            .catch((e) => { console.log(e.message) });

            //Handle content
            function handleContent(content) {
                //content div
                let extra = document.createElement('div');
                extra.className = 'extra';
                e.target.parentElement.parentElement.appendChild(extra);

                //Paragraph
                let p = document.createElement('p');
                p.textContent = content;
                extra.appendChild(p);

                extra.style.display = 'block';
                e.target.textContent = 'Less'
            }
            
        //If content is present
        } else if (e.target.parentElement.nextElementSibling.style.display == 'block') {
            e.target.parentElement.nextElementSibling.style.display = 'none';
            e.target.textContent = 'More'
        } else {
            e.target.parentElement.nextElementSibling.style.display = 'block';
            e.target.textContent = 'Less'
        }
    }
}

solution();
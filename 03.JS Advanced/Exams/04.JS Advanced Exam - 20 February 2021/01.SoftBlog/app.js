function solve(){
   function createTag(tag, text, className = null) {
      let el = document.createElement(tag);
      el.textContent = text;
      if (className) {
         el.className = className;
      }
      return el;
   }

   let author = document.querySelector('input#creator');
   let title = document.querySelector('input#title');
   let category = document.querySelector('input#category');
   let content = document.querySelector('textarea#content');
   let postsSection = document.querySelector('main > section');

   let createBtn = document.querySelector('button[class*="create"]');
   createBtn.addEventListener('click', onCreate);

   function onCreate(e) {
      e.preventDefault();
      let article = document.createElement('article');
      
      //Title
      let h1 = createTag('h1', title.value);
      article.appendChild(h1);

      //Category
      let p = createTag('p', 'Category: ');
      let strong = createTag('strong', category.value);
      p.appendChild(strong);
      article.appendChild(p);

      //Creator
      p = createTag('p', 'Creator: ');
      strong = createTag('strong', author.value);
      p.appendChild(strong);
      article.appendChild(p);

      //Content
      p = createTag('p', content.value);
      article.appendChild(p);

      //Buttons div
      let buttons = createTag('div', '', 'buttons');
      let delBtn= createTag('button', 'Delete', 'btn delete');
      let archiveBtn = createTag('button', 'Archive', 'btn archive');
      buttons.appendChild(delBtn);
      buttons.appendChild(archiveBtn);
      article.appendChild(buttons);

      delBtn.addEventListener('click', onDel);
      archiveBtn.addEventListener('click', onArchive);

      [author, title, category, content].forEach(el => el.value = '');
      postsSection.appendChild(article);
   }

   function onDel(e) {
      e.target.parentElement.parentElement.remove();
   }

   function onArchive(e) {
      let title = e.target.parentElement.parentElement.children[0].textContent;
      let archive = document.querySelector('aside ol');
      let li = createTag('li', title);
      archive.appendChild(li);
      e.target.parentElement.parentElement.remove();

      //Sort
      let lis = Array.from(document.querySelectorAll('aside ol li'));
      lis.sort((a, b) => a.textContent.localeCompare(b.textContent));
      lis.forEach(li => {
         li.remove();
         archive.appendChild(li);
      });
   }
}

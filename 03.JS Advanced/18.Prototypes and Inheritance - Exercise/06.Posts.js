function solution() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            let output = Object.values(this);
            return `Post: ${output[0]}\nContent: ${output[1]}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let comments = '';
            if (this.comments.length > 0) {
                comments = this.comments.map(el => ' * ' + el);
                comments.unshift('Comments:');
                comments.unshift('');
                comments = comments.join('\n');
            }
            return `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}${comments}`;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

const classes = solution();
let post = new classes.Post("Post", "Content");

console.log(post.toString());

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

let blg = new classes.BlogPost('Test Title', 'Test content', 1);

console.log(blg.toString());

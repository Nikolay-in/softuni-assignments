class Story {
    _comments = [];
    _likes = [];
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        }

        if (this._likes.length === 1) {
            return `${this._likes[0]} likes this story!`;
        }

        return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
    }

    like(username) {
        if (this._likes.indexOf(username) !== -1) {
            throw new Error('You can\'t like the same story twice!');
        }

        if (this.creator === username) {
            throw new Error('You can\'t like your own story!')
        }

        this._likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        let userIndex = this._likes.indexOf(username);
        if (userIndex === -1) {
            throw new Error('You can\'t dislike this story!');
        }

        this._likes.splice(userIndex, 1);
        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id) {
        let commentIndex = this._comments.findIndex(el => el.id === id);
        if (!id || commentIndex === -1) {
            this._comments.push({
                id: this._comments.length + 1,
                username,
                content,
                replies: []
            });

            return `${username} commented on ${this.title}`;
        }

        let localId = Number(this._comments[commentIndex].replies.length) + 1;
        this._comments[commentIndex].replies.push({
            id: Number(commentIndex + 1 + '.' + localId),
            username,
            content
        });

        return 'You replied successfully';
    }

    toString(sortingType) {
        let comments = [];
        function sortMe(input) {
            if (sortingType === 'asc') {
                return input.sort((a, b) => a.id - b.id);
            } else if (sortingType === 'desc') {
                return input.sort((a, b) => b.id - a.id);
            } else if (sortingType === 'username') {
                return input.sort((a, b) => a.username.localeCompare(b.username));
            }
        }

        this._comments = sortMe(this._comments);

        for (let comment of this._comments) {
            comments.push(`-- ${comment.id}. ${comment.username}: ${comment.content}`);
            
            if (comment.replies.length > 1) {
                comment.replies = sortMe(comment.replies);
            }

            comment.replies.forEach(reply => {
                comments.push(`--- ${reply.id}. ${reply.username}: ${reply.content}`);
            });
        }
        if (comments.length > 0) {
            comments.unshift('');
        }
        return `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:${comments.join('\n')}`;
    }
}



let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));

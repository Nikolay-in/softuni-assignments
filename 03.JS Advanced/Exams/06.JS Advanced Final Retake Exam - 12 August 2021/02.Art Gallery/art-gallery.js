class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture": 200, "photo": 50, "item": 250 };
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        if (!this.possibleArticles[articleModel.toLowerCase()]) {
            throw new Error('This article model is not included in this gallery!');
        }

        let existingArticleIndex = this.listOfArticles.findIndex(el => el.articleModel == articleModel.toLowerCase() && el.articleName == articleName);
        if (existingArticleIndex === -1) {
            this.listOfArticles.push({
                'articleModel': articleModel.toLowerCase(),
                articleName,
                quantity
            });
        } else {
            this.listOfArticles[existingArticleIndex].quantity += quantity;
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest(guestName, personality) {
        if (this.guests.find(el => el.guestName == guestName)) {
            throw new Error(`${guestName} has already been invited.`);
        }

        let points = 50;
        if (personality == 'Vip') {
            points = 500;
        } else if (personality == 'Middle') {
            points = 250;
        }

        this.guests.push({
            guestName,
            points,
            purchaseArticle: 0
        });

        return `You have successfully invited ${guestName}!`;
    }

    buyArticle(articleModel, articleName, guestName) {
        let articleIndex = this.listOfArticles.findIndex(el => el.articleName == articleName);
        if (articleIndex === -1 || this.listOfArticles[articleIndex].articleModel !== articleModel.toLowerCase()) { //LC
            throw new Error('This article is not found.')
        }

        if (this.listOfArticles[articleIndex].quantity === 0) {
            return `The ${articleName} is not available.`;
        }

        let guestIndex = this.guests.findIndex(el => el.guestName === guestName);
        if (guestIndex === -1) {
            return 'This guest is not invited.';
        }

        if (this.guests[guestIndex].points < this.possibleArticles[articleModel.toLowerCase()]) {
            return 'You need to more points to purchase the article.';
        }

        this.guests[guestIndex].points -= this.possibleArticles[articleModel.toLowerCase()];
        this.listOfArticles[articleIndex].quantity--;
        this.guests[guestIndex].purchaseArticle++;
        return `${guestName} successfully purchased the article worth ${this.possibleArticles[articleModel.toLowerCase()]} points.`;
    }

    showGalleryInfo(criteria) {
        if (criteria === 'article') {
            let articles = [];
            for (let article of this.listOfArticles) {
                articles.push(`${article.articleModel} - ${article.articleName} - ${article.quantity}`);
            }
            if (articles.length > 0) {  articles.unshift(''); }
            return `Articles information:${articles.join('\n')}`;
        } else if (criteria === 'guest') {
            let guests = [];
            for (let guest of this.guests) {
                guests.push(`${guest.guestName} - ${guest.purchaseArticle}`);
            }
            if (guests.length > 0) { guests.unshift(''); }
            return `Guests information:${guests.join('\n')}`;
        }
    }
}

const artGallery = new ArtGallery('Curtis Mayfield');
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));
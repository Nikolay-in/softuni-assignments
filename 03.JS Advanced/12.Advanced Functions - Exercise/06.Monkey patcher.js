function solution(input) {
    if (input == 'upvote') {
        this.upvotes++;
    } else if (input == 'downvote') {
        this.downvotes++;
    } else if (input == 'score') {
        let upVotes = this.upvotes;
        let downVotes = this.downvotes;
        let totalVotes = upVotes + downVotes;
        //Addition
        if (totalVotes > 50) {
            let addition = Math.ceil(0.25 * Math.max(upVotes, downVotes));
            upVotes += addition;
            downVotes += addition;
        }
        //Rating
        this.rating = 'new';
        if (this.upvotes / totalVotes > 0.66 && totalVotes >= 10) {
            this.rating = 'hot';
        } else if (this.upvotes / totalVotes <= 0.66 && this.downvotes / totalVotes <= 0.66 && this.upvotes - this.downvotes >= 0 && this.upvotes + this.downvotes > 100) {
            this.rating = 'controversial';
        } else if (this.upvotes - this.downvotes < 0 && totalVotes >= 10) {
            this.rating = 'unpopular';
        }
        return [upVotes, downVotes, this.upvotes - this.downvotes, this.rating];
    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
solution.call(post, 'downvote');         // (executed 50 times)
score = solution.call(post, 'score');     
console.log(score);
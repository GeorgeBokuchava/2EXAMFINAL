import {Giphy} from '../main-giphy/main-gif.js'

class Search extends Giphy {

    topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
    prevIndex = -1;
    

    constructor() {
        super();
        this._saveSearches();
        this._searchByTopic();
    }

    _saveSearches() {
        let topicBox = document.createElement('div');
        topicBox.id = 'topic';
        document.getElementById('btn').appendChild(topicBox);
        for (let i = 0; i < this.topics.length; i++) {
            let button = document.createElement('input');
            button.id = 'btnActive'
            button.type = 'button';
            button.style.backgroundColor = 'rgb(231, 231, 231)';
            button.style.fontSize = '1.2rem';
            button.style.border = 'transparent';
            button.style.borderRadius = '.5rem';
            button.style.height = '2.5rem';
            button.value = this.topics[i];
            button.style.margin = '.2rem';
            topicBox.appendChild(button);
        }
    }

    async _getAny() {
        let query = document.getElementById('query').value;
        if (query.length !== 0 ){
            this.topics.push(query);
            if (this.topics.length <= 6) {
                document.getElementById('topic').remove();
                this._saveSearches();
            } else if (this.topics.length > 6) {
                document.getElementById('topic').remove();
                this.topics.shift();
                this._saveSearches();
            }
            this._searchByTopic();
            return super.getGiphy(query);
        }
    }


    async _getTrending() {
        return super.getTrending();
    }

    _searchGiphy() {
        document.getElementById('search').onclick = this._getAny.bind(this);
        document.getElementById('trending').onclick = this._getTrending.bind(this);
    }

    _searchByTopic() {
        document.getElementById('topic').querySelectorAll('input[type="button"]')
            .forEach((item, index) => {
                item.addEventListener('click', () => {
                    return super.getGiphy(item.value);
                });
                item.addEventListener('click', () => {
                    if (this.prevIndex !== -1) {
                        document.getElementById('topic').children[this.prevIndex].style.border = 'transparent';
                    }
                    document.getElementById('topic').children[index].style.border = '2px solid #798fff';
                    this.prevIndex = index;
                })
            });


    }
}

new Search()._searchGiphy();

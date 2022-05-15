 export class Giphy {

    topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
    search_url = 'https://api.giphy.com/v1/gifs/search?';
    trending_url = 'https://api.giphy.com/v1/gifs/trending?';
    apikey = '3mIxmBZUIIPyb8R69gtxaW8Hsh74dFKV';
    limit = 10;
    giphyArr = [];
    imgBox;

    async getGiphy(query) {
        const giphy = await fetch(this.search_url + `&q=${query}&limit=${this.limit}&api_key=${this.apikey}`);
        return this.showGiphy(giphy);
    }

    async getTrending() {
        const giphy = await fetch(this.trending_url + `&limit=${this.limit}&api_key=${this.apikey}`);
        return this.showGiphy(giphy);
    }

    async showGiphy(giphy_api) {
        const giphyImg = await giphy_api.json();
        this.giphyArr = await giphyImg.data;
        if (!this.imgBox === false) {
            document.getElementById('imgBox').remove();
        }
        this.imgBox = document.createElement('div');
        this.imgBox.id = 'imgBox';
        document.body.appendChild(this.imgBox);
        return this.giphyArr.map(gif => {
            let divImg = document.createElement('div');
            let img = document.createElement('img');
            let imgText = document.createElement('p');
            divImg.id = 'divImg';
            imgText.id = 'imgText';
            img.id = 'img';
            imgText.innerText = 'rating: ' + gif.rating;
            divImg.style.height = gif.images.fixed_height.height + 'px';
            divImg.style.width = gif.images.fixed_height.width + 'px';
            img.src = gif.images.fixed_height.url;
            divImg.appendChild(img);
            divImg.appendChild(imgText);
            this.imgBox.appendChild(divImg);
        })
    }


}

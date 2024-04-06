class ImageGenerator {
    constructor(searchResults, parentElement) {
        this.searchResults = [];
        this._parentElement = document.querySelector('.result-container');
        this.container = document.querySelector('.container');
        document.querySelector('#search-btn').addEventListener('click', () => {
            this.render(this.getqurrey());
        });

        // Using event delegation for click events on .col elements
        this._parentElement.addEventListener('click', (e) => {
            const target = e.target.closest('.col');
            console.log(e)
            if (target) {
                this.overlay(target);
            }
        });

        document.querySelector('.cancelbtn').addEventListener('click', () => {
            document.querySelector('.overlay').style.display = "none";
            document.body.style.overflow = 'visible';
        });
    }

    async render(data) {
        this.renderSpinner();
        this._parentElement.innerHTML = '';
        await this.fetchApi(data);
        const markup = this.generateMarkup(this.searchResults);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    getqurrey() {
        return document.querySelector('#image-qurrey').value;
    }

    async fetchApi(query) {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=cwAj67RC0CDx_aEw7SS0pzt93AZL9neDIP9k-8CroMI`);
            const { results: data } = await response.json();
            const results = data.map(result => ({
                description: result.alt_description,
                imageUrl: result.urls.full,
                date: this.getTime(result.created_at)
            }));
            this.searchResults = results;
        } catch (err) {
            console.log(err);
        }
    }

    generateMarkup(data) {
        return data.map(result => this.generatePreview(result)).join('');
    }

    generatePreview(data) {
        return `<div class="col">
            <div class="card">
                <img src="${data.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.description}</h5>
                    <p class="card-text">${data.date}</p>
                </div>
            </div>
        </div>`;
    }

    renderSpinner() {
        const markup = `<div class="spinner">
            <img src="assets/images/Spinner@1x-1.0s-200px-200px.svg" alt="" class="mx-auto d-block">
        </div>`;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    getTime(timestamp) {
        const month = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const date = new Date(timestamp);
        return `${date.getDay()}/${month[date.getMonth()]}/${date.getFullYear()}`;
    }

    overlay(target ) {
        document.body.style.overflow = 'hidden';
        const overlay = document.querySelector('.overlay'); // Set top position based on y coordinate
        overlay.style.display = "block";
        const img = target.querySelector('img');
        const imgUrl = img.getAttribute('src');
        document.querySelector('#overlayImg').setAttribute("src", imgUrl);
    }
}

const generator = new ImageGenerator();

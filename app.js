const markup=` `


class ImageGenerator{
    _data;
    _parentElement=document.querySelector('.result-container')
    render(){
      
    }
    fetchApi(qurey){
        fetch('https://api.unsplash.com/search/photos?page=3&query=office&client_id=cwAj67RC0CDx_aEw7SS0pzt93AZL9neDIP9k-8CroMI')
        .then(res=>res.json())
        .then(data=>this._data=data)
        console.log(this._data)
    }
    generateMarkup(){
        this._parentElement.innerHTML='';
        return `<div class="col">
        <div class="card">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            </div>
        </div>
        </div>`
    }
    renderSpinner(){
        
    }
}

const generator=new ImageGenerator()
console.log(generator)
generator.fetchApi()
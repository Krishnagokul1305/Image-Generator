
const month=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
]


class ImageGenerator{
    constructor(searchResults,parentElement){
      this.searchResults=[];
      this._parentElement=document.querySelector('.result-container')
      document.querySelector('#search-btn').addEventListener('click',()=>{
        this.render(this.getqurrey())
      })
    }
    async render(data){
        this.renderSpinner()
        this._parentElement.innerHTML='';
        const result=await this.fetchApi(data)
        const markup=this.generateMarkup(this.searchResults)
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
    getqurrey(){
        return document.querySelector('#image-qurrey').value
    }
    async fetchApi(qurey){
       try {const response=await fetch(`https://api.unsplash.com/search/photos?page=1&query=${qurey}&client_id=cwAj67RC0CDx_aEw7SS0pzt93AZL9neDIP9k-8CroMI`)
        const {results:data}=await response.json()
       const results= data.map( result=> {
        // console.log(result)
            return {
                description:result.alt_description,
                imageUrl:result.urls.full,
                date:this.getTime(result.created_at)
            }
        }); 
        this.searchResults=results
        console.log(this.searchResults)}
       catch(err){
        console.log(err)
       }
    }
    generateMarkup(data){ 
        return data.map(result =>this.generatePreview(result)).join('');
    }
    generatePreview(data){
        return `<div class="col">
        <div class="card">
            <img src="${data.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data.description}</h5>
            <p class="card-text">${data.date}</p>
            </div>
        </div>
        </div>`
    }
    renderSpinner(){
        this._parentElement.innerHTML=''
        const markup=`<div class="spinner">
        <img src="assets/images/Spinner@1x-1.0s-200px-200px.svg" alt="" class="mx-auto d-block">
      </div>`
      this._parentElement.innerHTML=markup
    }
        getTime(timestamp){
            const date=new Date(timestamp)
            return `${date.getDay()}/${month[date.getMonth()]}/${date.getFullYear()}`
        }
}

const generator=new ImageGenerator()
console.log(generator)
// generator.fetchApi("chair")


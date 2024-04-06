
const month=[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
]
const day=[
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]
const markup=` `


class ImageGenerator{
    constructor(data,parentElement){
      this._parentElement=document.querySelector('.result-container')
      document.querySelector('#search-btn').addEventListener('click',()=>{
        this.render(this.getqurrey())
      })
    }
    render(data){
        this._parentElement.innerHTML='';
        const result=this.fetchApi(data)
        console.log(result)
       
    }
    getqurrey(){
        return document.querySelector('#image-qurrey').value
    }
    async fetchApi(qurey){
        const response=await fetch(`https://api.unsplash.com/search/photos?page=3&query=${qurey}&client_id=cwAj67RC0CDx_aEw7SS0pzt93AZL9neDIP9k-8CroMI`)
        const {results:data}=await response.json()
        console.log(data)
       const results= data.map( result=> {
        console.log(result)
            return {
                description:result.alt_description,
                imageUrl:result.urls.full,
                date:this.getTime(result.created_at)
            }
        }); 
        console.log(results)
    }
    generateMarkup(data){
        return data.forEach(result => {
            this.generatePreview
        });
    }
    generatePreview(data){
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
        getTime(timestamp){
            const date=new Date(timestamp)
            return `${date.getDay()}/${month[date.getMonth()]}/${date.getFullYear()}`
        }
}

const generator=new ImageGenerator()
console.log(generator)
generator.fetchApi("chair")


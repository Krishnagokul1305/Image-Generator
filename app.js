const markup=` <div class="col">
<div class="card">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title"></h5>
    <p class="card-text"></p>
    </div>
</div>
</div>`

async function fetchApi(){
   const response=await fetch('https://api.unsplash.com/search/photos?page=1&query=office')
}
fetchApi()
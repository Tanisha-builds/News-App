const API_KEY="pub_88cf27ca64b644d6a7001fc8ca8a3730";
const newsList=document.getElementById("newsList");
const message=document.getElementById("msg");
const searchForm=document.getElementById("searchForm");
const searchInput=document.getElementById("searchInput");
const buttons=document.querySelectorAll("#categories button");

async function getNews(url){
    message.textContent="Loading...";
    newsList.innerHTML="";

    try{
        const response= await fetch(url);
        const data=await response.json();

        if(data.status === "error"){
            message.textContent = data.message;
            return;
        }

        message.textContent="Showing resultss";
        showNews(data.results);

    }catch(error){

        message.textContent="Some Error Occured";
    }
}


function showNews(arr){
    arr=arr.filter(function(a){
        return(a.title && a.image_url && a.description && a.link);
    }).slice(0,10);


    if(arr.length===0){
        message.textContent="No Article Was Found";
        return;
    }


    for(const i=0;i<arr.length;i++){
        const news=arr[i];
        newsList.innerHTML+=`<a href="${news.link}">
            <img src="${news.image_url}" alt="${news.title}">
            <h2>${news.title}</h2>
            <h2>${news.description}</h2>
        </a>`
    }
}

for(const btn of buttons){
    btn.addEventListener("click",function(){
        for(const b of buttons){
            b.classList.remove("active");
        }
        btn.classList.add("active");
        getNews(
            "https://newsdata.io/api/1/latest?apikey=" + API_KEY +
         "&country=in&language=en&category=" + btn.dataset.category
     );
    })
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const query=searchInput.value.trim();
   getNews(
    "https://newsdata.io/api/1/latest?apikey=" + API_KEY +
    "&q=" + encodeURIComponent(query) +
    "&country=in&language=en"
);
    for(const btn of buttons){
        btn.classList.remove("active");
    }
});

getNews(
    "https://newsdata.io/api/1/latest?apikey=" + API_KEY +
    "&country=in&language=en&category=top"
);
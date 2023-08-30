const getUniverseData  = async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const responseData = await response.json();
    let data = responseData.data.tools;
    data = data.slice(0,11)
    getData(data)

}



const root = document.getElementById('root');


const getData = (items) =>{
   
    let htmlCode = '';

    items.forEach(item =>{
         htmlCode += createHtmlCode(item)
    })

    root.innerHTML = htmlCode;
   

}



function createHtmlCode(item){

    const {image,features,name,published_in} = item;

    const htmlCode = `
    
       <div class = "border cursor-pointer p-5 rounded-md">
            <img src="${image}" alt="">
            <h2 class = " text-3xl my-3">Feture</h2>
            <ol class = "mb-4 ms-1 leading-relaxed">
                <li>1. ${features[0]}</li>
                <li>2. ${features[1]}</li>
                <li>3. ${features[2]}</li>
            </ol>

           <div class = " flex justify-between items-center">
                <div>
                    <h3>${name}</h3>
                    <h5>${published_in}</h5>
                </div>
                <div>
                <button  onclick = getModalData('${item.id}') class =" bg-green-600 text-white px-4 py-2 rounded-md">Show Details</button>
                </div>
           </div>
       </div>

    
    `

    return htmlCode;

}

async function getModalData(id){
    const singleItem = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const singleData = await singleItem.json();

    showModal(singleData.data)
    my_modal_5.showModal()
}

const showModal = (singleData) =>{

    console.log(singleData)

    const {description,features,integrations,image_link,accuracy} = singleData;
    

    const modalHtml = `
    
    <dialog id="my_modal_5" class=" w-[100%] md:w-[60%] rounded-md">
            <form method="dialog" class=" p-6 w-full">
                <div class = " border-2 p-6 rounded-md md:flex gap-8">
                    <div>
                        <div>
                            <p>${description}</p>
                        </div>
                        <div class="md:flex gap-10 mt-5">
                            <div>
                                <div>
                                    <h3 class = "text-2xl mb-2">Feature</h3>
                                    <ul class = "list-disc ms-5">
                                        <li>${features['1'].feature_name}</li>
                                        <li>${features['2'].feature_name}</li>
                                        <li>${features['3'].feature_name}</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 class = "text-2xl mb-2">integrations</h3>
                                    <ul class = "list-disc ms-5">
                                        <li>${integrations[0]}</li>
                                        <li>${integrations[1]}</li>
                                        <li>${integrations[2]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center space-y-3">
                        <img class="mb-5 mt-5 md:mt-0" src="${image_link[0]}" alt="">
                        <h4 class = "text-2xl"> Score :${accuracy.score? accuracy.score : 'Not Data'}</h4>
                        <p>${accuracy.description}</p>
                    </div>
                </div>

                <div class="modal-action">
                <button class="btn">Close</button>
             </div>
            </form>
          </dialog>
    
    `

    document.getElementById('modal').innerHTML = modalHtml;

    
}



   


    document.getElementById('showBtn').addEventListener('click',() =>{
        getUniverseData();
        loadingSpiner(true)
     })  
     
     

     function loadingSpiner(value){
        const loading = document.getElementById('loading')
        if(value){
            loading.classList.remove('hidden');
        }
     }
  
    

    
  
    
const loadPhone = async(search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phones,dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    // show all data
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    
    // display no phone found
    const noPhone = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhone.classList.remove('hidden');
    }
    else{
        noPhone.classList.add('hidden');
    }
    for (const phone of phones) {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl')
        phoneDiv.innerHTML = `
        <figure class="bg-white"><img class="h-52 w-40 mt-2" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body bg-white text-orange-900">
        <h3 class="text-lg font-bold text-primary">${phone.brand}</h3>
        <h2 class="card-title">${phone.phone_name}</h2>
        <div class="flex items-end justify-end"><label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal-4" class="btn modal-button btn-primary">Details</label></div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    }
    // stop spinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const phoneField = document.getElementById('phone-value');
    const phoneValue = phoneField.value;
    loadPhone(phoneValue,dataLimit);
    // phoneField.value = '';
}

const searchPhone = () => {
    // start loader
    processSearch(10);
} 
// search by using key press enter
document.getElementById('phone-value').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const {mainFeatures} = phone;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <div class="flex gap-4">
    <figure class="bg-white w-64"><img class="h-52 w-44 mt-2" src="${phone.image}" alt="Shoes" /></figure>
    <div class="w-72 border-l-2 border-gray-400 pl-3">
    <h3 class="text-lg font-bold text-primary">${phone.brand}</h3>
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <div id="main-features">
    
    </div>
    <p class="py-1"><span class="text-primary capitalize font-semibold">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'No release date'}</p>
    </div>
    </div>
    <div class="overflow-x-auto">
    <table class="table w-full">
    <!-- head -->
    <thead>
      <h1 class="text-center text-xl font-semibold bg-orange-100 p-2 mt-6">Other Features</h1>
    </thead>
    <tbody id="others">
      
    </tbody>
    </table>
    </div>  
    `

    for(const features in mainFeatures){
        const main = document.getElementById('main-features');
        const p = document.createElement('p');
        p.innerHTML = `
        <span class="text-primary capitalize font-semibold">${features?features:'Not avaiable'}</span> : ${mainFeatures[features]?mainFeatures[features]:'Not available'}
        ` 
        main.appendChild(p);
    }

    for(const i in phone.others){
        const others= document.getElementById('others');
        const tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${i?i:'Not available'}</td>
        <td>${phone.others[i]?phone.others[i]:'Not available'}</td>
        `
        others.appendChild(tr)
    }
}

loadPhone('a')

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
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl')
        phoneDiv.innerHTML = `
        <figure><img class="h-64 w-full" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body bg-white text-orange-900">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur asperiores beatae ea exercitationem obcaecati ab necessitatibus debitis fuga maiores reiciendis.</p>
        <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal-4" class="btn modal-button">open modal</label>
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
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <p class="py-1">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release'}</p>
    <p class="py-1">Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage'}</p>
    <p class="py-1">Others: ${phone.others ? phone.others.Bluetooth : 'No bluetooth'}</p>
    `
}

// loadPhone('a')
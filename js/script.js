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


const loadPhone = async(search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}
const displayPhone = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    phones = phones.slice(0,30);
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
    toggleSpinner(false);
}

const searchPhone = () => {
    // start loader
    toggleSpinner(true);
    const phoneField = document.getElementById('phone-value');
    const phoneValue = phoneField.value;
    loadPhone(phoneValue);
    phoneField.value = '';
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

loadPhone('p');
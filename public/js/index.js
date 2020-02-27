const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const success = document.querySelector('#success');
const error = document.querySelector('#error');

success.textContent = '';
error.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    success.textContent = 'Loading...';
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                success.textContent = data.error;
            } else {
                console.log(data.forecastData);
                success.textContent = data.location;
                error.textContent = data.forecastData.forecast;
                search.value = "";
            }
            
        })
    })
})
const scriptURL = 'https://script.google.com/macros/s/AKfycbykwC-ny_iNllt63xZhzxIt-vVPgA38dk7v_2I1W1DKwB6PCHxBk9KsaXR4suif3XzC/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
     msg.innerHTML ="Thank You For Subscribing "
     setTimeout(function(){
        msg.innerHTML =""
     },5000)
     form.reset()   
    })
    .catch(error => console.error('Error!', error.message))
})
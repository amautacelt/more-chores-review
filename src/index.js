const choreListDiv = document.querySelector("#chore-list")
const eForm = document.querySelector("#new-chore-form")


fetch('http://localhost:3000/chores')
    .then(resp => resp.json())
    .then(choreArr => {
            choreArr.forEach(choreObj => renderOneCard(choreObj))
    })

function renderOneCard(choreObj){
        let chCard = document.createElement('div')
            chCard.classList.add('chore-card')
            chCard.dataset.id = choreObj.id

            chCard.innerHTML = `
            <button class="delete-button" data-id="${choreObj.id}">x</button>
            <h3> ${choreObj.title} </h3>
            <p> Duration: ${choreObj.duration} </p>
            <input type="text" name="name" value= "${choreObj.priority}" />
            ` 
        choreListDiv.append(chCard)
}

eForm.addEventListener('submit', event => {
    event.preventDefault()

    let newChoreObj = {
        id: "",
        title: event.target.title.value,
        duration: event.target.priority.value,
        priority: event.target.duration.value
    }

    fetch('http://localhost:3000/chores', {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newChoreObj)
    })
})

choreListDiv.addEventListener('click', event => {  
    if(event.target.matches('.delete-button')){

        fetch(`http://localhost:3000/chores/${event.target.dataset.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(choreObj => {
            let cardDiv = event.target.closest('div.chore-card')  
                cardDiv.remove()
        })     
    }
})
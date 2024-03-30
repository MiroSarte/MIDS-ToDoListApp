const btnTheme =  document.getElementById("theme");
const setMode = document.querySelectorAll(".set-mode")
const themeIcon = document.getElementById("theme-icon")
const btnAddTodos = document.getElementById("add-todos-btn")
const cntAddtodos = document.querySelector(".add-todos-container")




//change theme when the button is click.
btnTheme.addEventListener("click", ()=>{
    //use for each to target all element that has setMode class
    Array.from(setMode).forEach((element, i) =>{
        //if the class of element is set in nightTheme then 
        //change to dayTheme otherwise nightTheme.
        if(element.classList.contains("nightTheme")){
            element.classList.remove("nightTheme");
            element.classList.add("dayTheme");
            themeIcon.setAttribute("name", "moon-outline");
        }
        else{
            element.classList.add("nightTheme");
            element.classList.remove("dayTheme");
            themeIcon.setAttribute("name", "sunny-outline")
        }
    }
  
)})

//display and hide the input box when its click.
//save todos in the localStorage
btnAddTodos.addEventListener("click", ()=>{
    if(cntAddtodos.style.visibility == "hidden"){
        cntAddtodos.style.visibility = "visible"
        btnAddTodos.style.rotate = "45deg"
    }
        else{
            cntAddtodos.style.visibility = "hidden"
            btnAddTodos.style.rotate = "0deg"
        }
         
    })
        //saving todos
        const btnSave = document.getElementById("save-btn")
        btnSave.addEventListener("click",()=>{
             let todos = document.getElementById("todos")
             //create variable keys and use timestamp for uniqueness of todos keys.
             const keys = "todos_"+ new Date().getTime()

             //if there is no input show warning message.
             if(todos.value == ""){
                alert("Kindly input your todos before hitting the save.")
             }
             else{
                localStorage.setItem(keys, todos.value)
                //clear the input element
                todos.value = ""
                //close the add button
                cntAddtodos.style.visibility = "hidden"
                btnAddTodos.style.rotate = "0deg"
                displayTodos();
             }
            // call the displayTodos to update the list
           
        })



       
    
   

//displaying the to dos in list element.

displayTodos();

function displayTodos(){
    const list_container = document.querySelector(".todos-container");
    //clear the existing list items before re-populating the list.
    list_container.innerHTML = "";

    //get all keys from local storage and sort them based on time stamp.
    let keys = Object.keys(localStorage).sort((a,b)=>{
           return parseInt(a.split("_")[1]) -  parseInt(b.split("_")[1]);
    });

    //Iterate sorted keys to retrieve and display todos item.
    keys.slice().reverse().forEach(key => {
        let todo = localStorage.getItem(key);

        //create element and append it in list element
        let listElement = document.createElement('li');
        listElement.classList.add("list-element");
        
        //create removeIcon and assign the icon close-outline from ion-icon
        let removeIcon = document.createElement("ion-icon");
        removeIcon.setAttribute("name", "close-outline");
        //assign id #remove
        removeIcon.setAttribute("class", "remove");
        
        //create element div, checkbox, and span
        let div = document.createElement("div");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("todos-checkbox")
        let span = document.createElement("span");
        //create textNode and assign the todo
        let textNode = document.createTextNode(todo);
        
        //appending the element
        span.appendChild(textNode);
        div.appendChild(checkbox);
        div.appendChild(span)
        div.appendChild(removeIcon)
        listElement.appendChild(div)
        list_container.appendChild(listElement)
    });
}

//put a mark on checked to-dos.
const checkbox = document.getElementsByClassName("todos-checkbox")
Array.from(checkbox).forEach((element)=>{
    element.addEventListener("click", function(){
        if (this.checked) {
            this.nextElementSibling.style.textDecoration = "line-through";
            
          } else{
            this.nextElementSibling.style.textDecoration = "none";
          }
        
        
    })
  
})


//deleting a todos
const todoListContainer = document.querySelector(".todos-container");

// Add event listener to the parent element (todo list container)
todoListContainer.addEventListener("click", function(event) {
    // Check if the clicked element is a remove button
    if (event.target.classList.contains("remove")) {
        // Find the parent li element
        let listElement = event.target.closest(".list-element");
        // Find the text content of the span element within the parent li
        let todo = listElement.querySelector("span").textContent;

        // Iterate through local storage to find the key corresponding to the todo text
        for (let index = 0; index < localStorage.length; index++) {
            let key = localStorage.key(index);
            if (localStorage.getItem(key) === todo) {
                localStorage.removeItem(key);
                // Remove the parent li element from the DOM
                listElement.remove();
                break;
            }
        }
    }
});


//filtering searched todos
function searchTodo(){
  let div, span, textValue;
  let search = document.getElementById("search")
  let listElement = document.getElementsByClassName("list-element");
  let filter = search.value.toUpperCase()
  
  //hide the list that is not match on the searched todo.
  for (let index = 0; index < listElement.length; index++) {
    span = listElement[index].getElementsByTagName("span")[0];
    textValue = span.textContent;

    if(textValue.toUpperCase().indexOf(filter) != -1){
        listElement[index].style.display = "block"
    }
    else{
        listElement[index].style.display = "none"
    }
    
  }
}
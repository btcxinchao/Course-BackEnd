//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    const formChange  = document.querySelector("#form-change-status")
    const path = formChange.getAttribute("data-path")
    let url = new URL(window.location.href)
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange = statusCurrent === "active" ? "inactive" : "active"
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChange.action = action;
            
            console.log(action);
            
            formChange.submit();
            
        })
    })
}
//end change status

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")

    // check all
    inputCheckAll.addEventListener("click", () => {
        inputIds.forEach(input => input.checked = inputCheckAll.checked)
    })

    // uncheck all
    inputIds.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            inputCheckAll.checked = countChecked === inputIds.length
        })
    })
}

// form change multi
const formChange = document.querySelector("[form-change-multi]")
if (formChange) {
    formChange.addEventListener("submit", (e) => {
        e.preventDefault()

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

        if (inputsChecked.length > 0) {
            const ids = Array.from(inputsChecked).map(input => input.value)
            const inputIDS = formChange.querySelector("input[name='ids']")
            if (inputIDS) inputIDS.value = ids.join(",")

            // submit thật
            formChange.submit()
        } else {
            alert("Bạn chưa chọn gì cả")
        }
    })
}
//delete one item 
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0 ){
    const formDelete = document.querySelector("#form-delete-item")
    const Path = formDelete.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("ban co chac muon xoa san pham nay?")
        if(isConfirm){
            const id = button.getAttribute("data-id")
           
            const action = `${Path}/${id}?_method=DELETE`
            //CHUYEN ACTION VAO FORM 
            formDelete.action = action;

            formDelete.submit();
        }
    })
    })
    
}
//end delete one item 
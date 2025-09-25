const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0 ){
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status")

            if(status){
               url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
           window.location.href = url.href 
        }
    ) 
    });
}
//end status

//keyword 
const form_search = document.querySelector("#form-search")
if(form_search){
    let url = new URL(window.location.href)
    form_search.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value
       if(keyword){
        url.searchParams.set("keyword",keyword)
       }else{
        url.searchParams.delete("keyword")
       }
    window.location.href  = url.href
       
    })
}
//xóa text
const inputKeyword = document.querySelector("input[name='keyword']");

if (inputKeyword) {
  inputKeyword.addEventListener("input", () => {
    if (inputKeyword.value.trim() === "") {
      const url = new URL(window.location.href);
      url.searchParams.delete("keyword");
      window.location.href = url.href;
    }
  });
}

//pagination 
const btn_pagi = document.querySelectorAll("[button-pagination]")
if(btn_pagi){
    let url = new URL(window.location.href)
    btn_pagi.forEach(button =>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination")
        if(page){
        url.searchParams.set("page",page)
       }else{
        url.searchParams.delete("page")
       }
       window.location.href  = url.href
        })
    })
}
//end pagination 



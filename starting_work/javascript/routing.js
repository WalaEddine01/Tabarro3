//  inject side bare in the all page and set active to the selection section 
let sidebar = document.getElementById("sidebar")
async function renderingSb() {
   let res = await fetch("../components/sidebar.html") 
   let text  = await res.text()
   sidebar.innerHTML=  text
   let content = document.getElementById("content")
document.querySelectorAll(".sidebar ul li a").forEach(link=>{
   link.className = ""
   if (link.children[1].textContent==content.className) {
      link.className = "active"
   }
})

}
renderingSb()

// injected the header in the all  page
let headers = document.getElementById("hdrs")
async function renderingHdrs(){
   let res = await fetch("../components/header.html")
   let headerContennt  = await res.text()
   headers.innerHTML = headerContennt
}
renderingHdrs()
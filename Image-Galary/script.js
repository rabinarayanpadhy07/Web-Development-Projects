let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel",(evt)=>{
    evt.preventDefault();
    scrollContainer.scrollLeft+= evt.deltaY;
    scrollContainer.style.scrollBehvior = "auto";
})
nextBtn.addEventListener("click",()=>{
    scrollContainer.style.scrollBehvior = "smooth";
     scrollContainer.scrollLeft +=900;
});
backBtnBtn.addEventListener("click",()=>{
    scrollContainer.style.scrollBehvior = "smooth";
    scrollContainer.scrollLeft -=900;
});
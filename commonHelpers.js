import{a as m,S as h,i as c}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const g="44705167-ce06f8750cd1d65bf02e5b322",L="https://pixabay.com/api/";async function p(t,r=1){return(await m.get(L,{params:{key:g,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const S=new h(".gallery-item a",{captionsData:"alt",captionDelay:250});function f(t){const r=t.map(a=>`<li class="gallery-item">
                <a class="gallery-link" href="${a.largeImageURL}">
                  <img
                    width="360"
                    height="200"
                    class="gallery-image"
                    src="${a.webformatURL}"
                    alt="${a.tags}" />
                  <div class="image-info">
                    <p>LIKES: ${a.likes}</p>
                    <p>VIEWS: ${a.views}</p>
                    <p>COMMENTS: ${a.comments}</p>
                    <p>DOWNLOADS: ${a.downloads}</p>
                  </div>
                </a>
              </li>`).join("");s.imgGallery.insertAdjacentHTML("beforeend",r),S.refresh()}function y(){s.loader.classList.remove("hidden")}function d(){s.loader.classList.add("hidden")}const s={formSearch:document.querySelector("#search"),inputImgSearch:document.querySelector(".input-img-search"),imgGallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.getElementById("load-more")};let n=1,i="";s.formSearch.addEventListener("submit",async t=>{if(t.preventDefault(),i=t.currentTarget.elements.search.value.trim(),!i){c.warning({title:"Warning",message:"Enter a word for the query, please.",layout:2,position:"topRight",displayMode:"once"});return}n=1,s.imgGallery.innerHTML="",s.loadMoreBtn.style.display="none";try{y();const r=await p(i,n);if(r.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",layout:2,position:"topRight",displayMode:"once"}),d();return}d(),f(r.hits),r.totalHits>15&&(s.loadMoreBtn.style.display="block")}catch(r){console.log(r)}});s.loadMoreBtn.addEventListener("click",async()=>{n+=1;try{y();const t=await p(i,n);f(t.hits),n*15>=t.totalHits&&(s.loadMoreBtn.style.display="none",c.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})),d(),b()}catch(t){console.log(t)}});function b(){const{height:t}=s.imgGallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

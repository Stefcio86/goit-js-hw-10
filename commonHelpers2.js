import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-7cdf2dd2.js";document.querySelector(".form").addEventListener("submit",function(e){e.preventDefault();const r=parseInt(e.target.elements.delay.value),s=e.target.elements.state.value;o(r,s).then(t=>{i.success({title:"Success",message:t})}).catch(t=>{i.error({title:"Error",message:t})})});function o(e,r){return new Promise((s,t)=>{setTimeout(()=>{r==="fulfilled"?s(`✅ Fulfilled promise in ${e}ms`):t(`❌ Rejected promise in ${e}ms`)},e)})}
//# sourceMappingURL=commonHelpers2.js.map

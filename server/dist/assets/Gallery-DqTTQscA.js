import{r as s,j as e,H as c,L as m}from"./index-DKvulAwk.js";import{d}from"./config-CKn1YUnS.js";const h="/assets/musica-galeria-B0pHdNFp.m4a";function u(){const r=s.useRef(null),[l,t]=s.useState([]),i=async()=>{try{const a=await(await fetch(d)).json();t(a.map(o=>o.secure_url))}catch{console.error("Error al obtener las imágenes por tag:")}};return s.useEffect(()=>{r.current.play(),i()},[]),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx("title",{children:"Galería | Halloween Target Card"})}),e.jsxs("audio",{loop:!0,ref:r,children:[e.jsx("source",{src:h,type:"audio/mp3"}),"Your browser does not support the audio element."]}),e.jsx(m,{to:"/",className:"btn-galery in-galery",children:"🔙 Volver"}),e.jsx("div",{className:"halloween-container",children:e.jsxs("div",{className:"gallery-container",children:[e.jsx("h1",{className:"gallery-title",children:"Galería del Terror"}),l.length>0?e.jsx("div",{className:"image-grid",children:l.map((n,a)=>e.jsx("div",{className:"image-wrapper",children:e.jsx("img",{src:n,alt:`Halloween image ${a+1}`,className:"gallery-image"})},a))}):e.jsx("div",{className:"not-image",children:e.jsxs("h2",{children:["No hay imagenes para mostrar ",e.jsx("span",{children:"."}),e.jsx("span",{children:"."}),e.jsx("span",{children:"."})]})})]})})]})}export{u as default};

(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t(1),r=t(14),a=t.n(r),u=t(3),s=function(e){var n=e.name,t=e.number,c=e.handleFunction,r=e.id;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("p",{children:[n," ",t]},n),Object(o.jsx)("button",{onClick:function(){return c(r)},children:"delete"})]})},i=function(e){var n=e.search,t=e.persons,c=e.handleFunction;return Object(o.jsx)("div",{children:t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return Object(o.jsx)(s,{name:e.name,number:e.number,handleFunction:c,id:e.id},e.id)}))})},l=function(e){var n=e.handleSearch,t=e.search;e.persons;return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{children:["filter shown with ",Object(o.jsx)("input",{value:t,onChange:n})]})})},d=function(e){var n=e.action,t=e.newName,c=e.handleInput,r=e.newNumber,a=e.handleNumber;return Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:t,onChange:c})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:r,onChange:a})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},f=function(e){var n=e.message,t=e.status;return null===n||null===t?null:"error"===t?Object(o.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},className:"message",children:n}):"success"===t?Object(o.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},className:"message",children:n}):null},b=t(4),h=t.n(b),j="/api/persons",m={getAll:function(){return h.a.get(j).then((function(e){return e.data}))},create:function(e){return h.a.post(j,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return h.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))}},p=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),s=Object(u.a)(a,2),b=s[0],h=s[1],j=Object(c.useState)(""),p=Object(u.a)(j,2),g=p[0],O=p[1],x=Object(c.useState)(""),v=Object(u.a)(x,2),w=v[0],S=v[1],y=Object(c.useState)(null),k=Object(u.a)(y,2),N=k[0],I=k[1],C=Object(c.useState)(null),F=Object(u.a)(C,2),T=F[0],R=F[1];Object(c.useEffect)((function(){m.getAll().then((function(e){console.log("Response received"),console.log(e),r(e)}))}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(f,{message:N,status:T}),Object(o.jsx)(l,{handleSearch:function(e){console.log(e.target.value),S(e.target.value)},search:w,persons:t}),Object(o.jsx)("h2",{children:"add a new"}),Object(o.jsx)(d,{action:function(e){e.preventDefault();var n={name:"".concat(b),number:"".concat(g)};if(t.some((function(e){return e.name==="".concat(b)}))){if(window.confirm("".concat(b," is already added to the phonebook, replace the old number with the new one?"))){var o=t.find((function(e){return e.name===b})),c=o.id;m.update(c,n).then((function(e){r(t.map((function(n){return n.id!==c?n:e}))),h(""),O(""),R("success"),I("Information of ".concat(o.name," is updated!")),setTimeout((function(){return I(null)}),5e3)})).catch((function(e){console.log(e),I("Information of ".concat(o.name," is already deleted from server")),R("error"),setTimeout((function(){I(null),R("success")}),5e3),r(t.filter((function(e){return e.id!==c})))}))}}else m.create(n).then((function(e){console.log("Response received"),console.log(e),r(t.concat(e)),h(""),O(""),R("success"),setTimeout((function(){return I(null)}),5e3),I("Information of ".concat(n.name," is added to the server"))})).catch((function(e){console.log(e.response.data),I(e.response.data.error),R("error"),setTimeout((function(){I(null),R("success")}),5e3)}))},newName:b,handleInput:function(e){console.log(e.target.value),h(e.target.value)},newNumber:g,handleNumber:function(e){console.log(e.target.value),O(e.target.value)}}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(i,{search:w,persons:t,handleFunction:function(e){window.confirm("Delete ".concat(t.find((function(n){return n.id===e})).name," ?"))&&m.deletePerson(e).then((function(n){console.log(n),I("Information of ".concat(t.find((function(n){return n.id===e})).name," is deleted from server")),R("success"),setTimeout((function(){return I(null)}),5e3),r(t.filter((function(n){return n.id!==e})))})).catch((function(n){console.log(n),I("Information of ".concat(t.find((function(n){return n.id===e})).name," is already deleted from server")),R("error"),setTimeout((function(){I(null),R("success")}),5e3),r(t.filter((function(n){return n.id!==e})))}))}})]})};a.a.render(Object(o.jsx)(p,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.22562126.chunk.js.map
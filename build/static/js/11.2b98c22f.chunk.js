(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[11],{680:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));var n=c(120);var s=c(175);function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(s.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},905:function(e,t,c){"use strict";c.r(t);var n=c(680),s=c(173),i=c(1),r=c(67),o=c(403),a=c(682),l=c.n(a),u=c(44),j=c(10);t.default=function(){var e=Object(i.useState)(!1),t=Object(s.a)(e,2),c=t[0],a=t[1],d=Object(i.useState)(!1),b=Object(s.a)(d,2),h=b[0],f=b[1],O=Object(i.useState)([]),m=Object(s.a)(O,2),p=m[0],y=m[1],x=Object(i.useState)("Echec du processus. Veuillez essayer ult\xe9rieurement !"),w=Object(s.a)(x,2),g=w[0],v=(w[1],Object(i.useState)(!1)),S=Object(s.a)(v,2),_=S[0],k=S[1],C=Object(i.useState)([]),z=Object(s.a)(C,2),A=z[0],E=z[1];Object(i.useEffect)((function(){P(!0),fetch("".concat("http://ec2-18-218-81-138.us-east-2.compute.amazonaws.com:8080","/api/type_essais/")).then((function(e){return e.json()})).then((function(e){return E(e)})).then((function(){return P(!1)})).catch((function(e){console.log(e),P(!1)}))}),[]);var T=Object(i.useState)(!1),D=Object(s.a)(T,2),N=D[0],P=D[1];return Object(j.jsxs)("div",{children:[Object(j.jsxs)("a",{href:"/#/test_types/create",children:[Object(j.jsx)(r.f,{variant:"outline",color:"success",children:"Ajouter"}),Object(j.jsx)(l.a,{loading:N,size:25})]}),Object(j.jsx)(r.p,{items:A||null,fields:[{key:"id",label:"ID",_style:{width:"2%"}},{key:"nom",label:"Nom",_style:{width:"20%"}},{key:"sigle",label:"Abbr\xe9viation",_style:{width:"20%"}},{key:"description",label:"Description",_style:{width:"20%"}},{key:"createdDate",label:"Date de cr\xe9ation",_style:{width:"10%"}},{key:"show_details",label:"Actions",_style:{width:"1%"},sorter:!1,filter:!1}],columnFilter:!0,tableFilter:!0,footer:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{show_details:function(e,t){return Object(j.jsx)("td",{className:"py-2",children:Object(j.jsx)(r.f,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:function(){!function(e,t){var c=p.indexOf(e),s=p.slice();-1!==c?s.splice(c,1):s=[].concat(Object(n.a)(p),[e]),y(s)}(t,e.id)},children:p.includes(t)?"Cacher":"Voir"})})},details:function(e,t){return Object(j.jsxs)(r.m,{show:p.includes(t),children:[Object(j.jsx)(o.a,{testType:e}),Object(j.jsxs)(r.h,{children:[Object(j.jsx)("a",{href:"/#/test_types/edit/".concat(e.id),children:Object(j.jsx)(r.f,{size:"sm",color:"info",children:"Modifier"})}),Object(j.jsxs)(r.f,{size:"sm",color:"danger",className:"ml-1",onClick:function(){!function(e){if(window.confirm("Confirmer la suppression")){k(!0);var t={method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(u.a.getToken()),"Access-Control-Allow-Credentials":!0}};fetch("".concat("http://ec2-18-218-81-138.us-east-2.compute.amazonaws.com:8080","/api/type_essais/")+e,t).then((function(e){return console.log(e)})).then((function(){return a(!0)})).then((function(){return k(!1)})).catch((function(e){console.log(e),f(!0),k(!1)}));var c=A.filter((function(t){return t.id!==e}));E(c)}setTimeout((function(){a(!1),f(!1)}),3e3)}(e.id)},children:["Suprimmer   ",Object(j.jsx)(l.a,{loading:_,size:15})]})]})]})}}}),Object(j.jsx)(r.l,{sm:"12",lg:"6",children:Object(j.jsx)(r.ab,{position:"top-right",children:Object(j.jsxs)(r.X,{show:c,autohide:4e3,fade:!0,children:[Object(j.jsx)(r.Z,{closeButton:!0,children:Object(j.jsx)(r.b,{className:"mr-1",color:"success",children:"SUCC\xc8S"})}),Object(j.jsx)(r.Y,{color:"success",children:"Op\xe9ration r\xe9ussie !"})]})})}),Object(j.jsx)(r.l,{sm:"12",lg:"6",children:Object(j.jsx)(r.ab,{position:"top-right",children:Object(j.jsxs)(r.X,{show:h,autohide:4e3,fade:!0,children:[Object(j.jsx)(r.Z,{closeButton:!0,children:Object(j.jsx)(r.b,{className:"mr-1",color:"danger",children:"ECHEC"})}),Object(j.jsx)(r.Y,{color:"success",children:g})]})})})]})}}}]);
//# sourceMappingURL=11.2b98c22f.chunk.js.map
"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[74],{5812:function(e,l,a){a.d(l,{T:function(){return o}});var t=a(4161),u=a(4870),s=a(3718);const n=(0,s.c)(),i=(0,u.iH)(n.$state.credentials),d=(0,u.iH)(i.value._id),c=(0,u.iH)(i.value.name);function o(){async function e(e,l){try{await t.Z.post("/api/logs",{handlerID:d.value,handlerName:c.value,type:l,activity:e,time:new Date})}catch(a){return a}}return{updateLog:e}}},1765:function(e,l,a){a.d(l,{Z:function(){return N}});a(7658);var t=a(3396),u=a(7139),s=a(7674),n=a(3718),i=a(4870),d=a(4161),c=a(2483);const o=e=>((0,t.dD)("data-v-4cefafa0"),e=e(),(0,t.Cn)(),e),v={class:"navbar is-hidden-desktop"},r={class:"navbar-brand"},_={class:"navbar-item"},m={class:"label"},b=o((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),p=o((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),w=o((()=>(0,t._)("span",{"aria-hidden":"true"},null,-1))),h=[b,p,w],f=o((()=>(0,t._)("figure",{class:"image is-128x128",style:{margin:"auto"}},[(0,t._)("img",{src:s})],-1))),g={class:"title is-2 has-text-centered has-text-white is-hidden-mobile"},C={class:"subtitle has-text-centered has-text-white is-hidden-mobile"},y=o((()=>(0,t._)("hr",null,null,-1))),k=o((()=>(0,t._)("br",null,null,-1))),D={key:0,class:"menu-list has-text-centered"},I={key:1,class:"menu-list has-text-centered"};var S=(0,t.aZ)({__name:"NavPanel",setup(e){const l=(0,c.tv)(),a=(0,n.c)(),s=(0,i.iH)(a.$state.credentials),o=(0,i.iH)(s.value.name),b=(0,i.iH)(s.value.handler),p=(0,i.iH)(!1);async function w(){await d.Z["delete"]("/session"),a.$reset(),l.push("/")}return(e,l)=>{const a=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("nav",v,[(0,t._)("div",r,[(0,t._)("a",_,[(0,t._)("label",m,(0,u.zw)(o.value)+" ("+(0,u.zw)(b.value)+")",1)]),(0,t._)("a",{role:"button",class:(0,u.C_)(["navbar-burger",{"is-active":p.value}]),"aria-label":"menu","aria-expanded":"false","data-target":"navbar",onClick:l[0]||(l[0]=e=>p.value=!p.value)},h,2)])]),(0,t._)("aside",{class:(0,u.C_)(["menu box",{"is-hidden-mobile":!p.value,"is-menu-fullheight-fullwidth":p.value}])},[f,(0,t._)("h2",g,(0,u.zw)(o.value),1),(0,t._)("p",C,"("+(0,u.zw)(b.value)+")",1),y,k,"admin"===b.value?((0,t.wg)(),(0,t.iD)("ul",D,[(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"adminDashboard"}},{default:(0,t.w5)((()=>[(0,t.Uk)("OVERVIEW")])),_:1})]),(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"adminStudentRecords"}},{default:(0,t.w5)((()=>[(0,t.Uk)("STUDENT RECORDS")])),_:1})]),(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"adminAccounts"}},{default:(0,t.w5)((()=>[(0,t.Uk)("ACCOUNTS")])),_:1})]),(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"adminSecurity"}},{default:(0,t.w5)((()=>[(0,t.Uk)("SECURITY")])),_:1})]),(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"adminSupport"}},{default:(0,t.w5)((()=>[(0,t.Uk)("SUPPORT")])),_:1})]),(0,t._)("li",null,[(0,t._)("a",{onClick:w},"LOGOUT")])])):((0,t.wg)(),(0,t.iD)("ul",I,[(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"studentGrades"}},{default:(0,t.w5)((()=>[(0,t.Uk)("GRADES")])),_:1})]),(0,t._)("li",null,[(0,t.Wm)(a,{to:{name:"studentSecurity"}},{default:(0,t.w5)((()=>[(0,t.Uk)("SECURITY")])),_:1})]),(0,t._)("li",null,[(0,t._)("a",{onClick:w},"LOGOUT")])]))],2)],64)}}}),L=a(89);const E=(0,L.Z)(S,[["__scopeId","data-v-4cefafa0"]]);var N=E},5074:function(e,l,a){a.r(l),a.d(l,{default:function(){return Fe}});a(7658);var t=a(3396),u=a(7139),s=a(9242),n=a(4870),i=a(1765),d=a(4161),c=a(8976),o=a(5812);const v={class:"main-wrapper"},r={class:"columns"},_={class:"column is-2"},m={class:"column"},b={class:"section"},p=(0,t._)("div",{class:"modal-background"},null,-1),w={class:"modal-content"},h={class:"container box"},f={class:"container is-fluid"},g=(0,t._)("br",null,null,-1),C=(0,t._)("h3",{class:"title is-3"},"Student Information",-1),y={class:"field"},k=(0,t._)("label",{class:"label"}," Student ID No. ",-1),D={class:"control"},I={class:"field"},S=(0,t._)("label",{class:"label"}," Student Last Name ",-1),L={class:"control"},E={class:"field"},N=(0,t._)("label",{class:"label"}," Student First Name ",-1),U={class:"control"},H={class:"field"},x=(0,t._)("label",{class:"label"}," Student Address ",-1),A={class:"control"},T={class:"field"},z=(0,t._)("label",{class:"label"}," Student Year Level ",-1),V={class:"control"},j={class:"select"},Z=(0,t._)("option",{value:"I"},"I",-1),Y=(0,t._)("option",{value:"II"},"II",-1),F=(0,t._)("option",{value:"III"},"III",-1),R=(0,t._)("option",{value:"IV"},"IV",-1),O=[Z,Y,F,R],W={class:"field"},$=(0,t._)("label",{class:"label"}," Student Course ",-1),G={class:"control"},M={class:"field"},P=(0,t._)("label",{class:"label"}," Student Email ",-1),q={class:"control"},K={class:"container is-fluid"},B=(0,t._)("br",null,null,-1),J=(0,t._)("h3",{class:"title is-3"},"Subjects Enrolled ",-1),Q={key:0,class:"container"},X={class:"field"},ee=(0,t._)("label",{class:"label"}," Subject Code ",-1),le={class:"control"},ae={class:"field"},te=(0,t._)("label",{class:"label"}," Subject Description ",-1),ue={class:"control"},se={class:"field"},ne=(0,t._)("label",{class:"label"}," Grade ",-1),ie={class:"control"},de={class:"field"},ce=(0,t._)("label",{class:"label"}," Subject Instructor ",-1),oe={class:"control"},ve=(0,t._)("p",{class:"help"},"LAST NAME, FIRST NAME, MIDDLE INITIAL",-1),re={class:"buttons is-right"},_e={class:"table-container"},me={class:"table is-fullwidth is-hoverable"},be=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th"),(0,t._)("th",null,"Subject Code"),(0,t._)("th",null,"Subject Description"),(0,t._)("th",null,"Grade"),(0,t._)("th",null,"Instructor")])],-1),pe={class:"buttons"},we=["onClick"],he=["onClick"],fe={class:"buttons is-centered"},ge={class:"container"},Ce={class:"columns has-text-centered"},ye={class:"column"},ke={class:"field header-control"},De={class:"control has-icons-right"},Ie=(0,t._)("span",{class:"icon is-right"},[(0,t._)("i",{class:"fas fa-search"})],-1),Se={class:"column"},Le={class:"field"},Ee={class:"control has-icons-right"},Ne=(0,t._)("i",{class:"fa-solid fa-plus"},null,-1),Ue={key:0,class:"table-container"},He={key:0,class:"table is-fullwidth is-hoverable"},xe=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"ID No."),(0,t._)("th",null,"Last Name"),(0,t._)("th",null,"First Name"),(0,t._)("th",null,"Address"),(0,t._)("th",null,"Year Level"),(0,t._)("th",null,"Course"),(0,t._)("th",null,"Email"),(0,t._)("th",null,"Subjects"),(0,t._)("th",null,"GPA")])],-1),Ae=["onClick"],Te={class:"columns"},ze={key:1,class:"container"},Ve=(0,t._)("div",{class:"notification is-info"},"Empty records",-1),je=[Ve];var Ze=(0,t.aZ)({__name:"StudentRecordsView",setup(e){const{updateLog:l}=(0,o.T)(),a=(0,n.iH)(""),Z=(0,n.iH)(),Y=(0,n.iH)(""),F=(0,n.iH)(""),R=(0,n.iH)(""),Ve=(0,n.iH)(""),Ze=(0,n.iH)(""),Ye=(0,n.iH)(""),Fe=(0,n.iH)("I"),Re=(0,n.iH)(""),Oe=(0,n.iH)(""),We=(0,n.iH)(new Array),$e=(0,n.iH)(""),Ge=(0,n.iH)(""),Me=(0,n.iH)(),Pe=(0,n.iH)(""),qe=(0,n.iH)(!1),Ke=(0,n.iH)(""),Be=(0,n.iH)(!1),Je=(0,n.iH)();(0,t.bv)((async()=>{await d.Z.get("/api/student-records").then((e=>Z.value=e.data)).catch((e=>{Y.value=e.code,F.value=e.msg}))}));const Qe=(0,t.Fl)((()=>We.value)),Xe=(0,t.Fl)((()=>Z.value?Z.value.filter((e=>e.studentIDNo.toLowerCase().includes(a.value.toLowerCase())||e.studentFirstName.toLowerCase().includes(a.value.toLowerCase())||e.studentLastName.toLowerCase().includes(a.value.toLowerCase())||e.studentAddress.toLowerCase().includes(a.value.toLowerCase())||e.studentYearLevel.toLowerCase().includes(a.value.toLowerCase())||e.studentCourse.toLowerCase().includes(a.value.toLowerCase()))).sort(((e,l)=>e.studentLastName.localeCompare(l.studentLastName))):[]));function el(){Be.value=!0,Je.value=void 0,$e.value="",Ge.value="",Me.value="",Pe.value=""}function ll(){!We.value.find((e=>e.code==$e.value))&&""!==$e.value&&""!==Ge.value&&Me.value&&(We.value.push({code:$e.value,description:Ge.value,grade:parseFloat(Me.value),instructor:Pe.value}),$e.value="",Ge.value="",Me.value="",Pe.value="")}function al(e,l){Be.value=!0,Je.value=l,$e.value=e.code,Ge.value=e.description,Me.value=e.grade,Pe.value=e.instructor}function tl(){Qe.value[Je.value].code=$e.value,Qe.value[Je.value].description=Ge.value,Qe.value[Je.value].grade=Me.value,Qe.value[Je.value].instructor=Pe.value,Be.value=!1,Je.value=void 0,$e.value="",Ge.value="",Me.value="",Pe.value=""}function ul(e){We.value=We.value.filter((l=>l.code!==e))}async function sl(){""!==R.value&&""!==Ve.value&&""!==Ze.value&&""!==Ye.value&&""!==Fe.value&&""!==Re.value&&""!==Oe.value&&(await d.Z.post("/api/student-records",{studentIDNo:R.value,studentFirstName:Ve.value,studentLastName:Ze.value,studentAddress:Ye.value,studentYearLevel:Fe.value,studentCourse:Re.value,studentEmail:Oe.value,studentSubjectsEnrolled:We.value}).catch((e=>{Y.value=e.code,F.value=e.message})),await d.Z.get("/api/student-records").then((e=>Z.value=e.data)).catch((e=>{Y.value=e.code,F.value=e.msg})),l(`Added new student record with ID: ${R.value}`,"ADD").catch((e=>{Y.value=e.code,F.value=e.message})),qe.value=!1,cl())}function nl(e){Ke.value=e._id,qe.value=!0,R.value=e.studentIDNo,Ve.value=e.studentFirstName,Ze.value=e.studentLastName,Ye.value=e.studentAddress,Fe.value=e.studentYearLevel,Re.value=e.studentCourse,Oe.value=e.studentEmail,We.value=e.studentSubjectsEnrolled}async function il(){""!==R.value&&""!==Ve.value&&""!==Ze.value&&""!==Ye.value&&""!==Fe.value&&""!==Re.value&&""!==Oe.value&&(await d.Z.put(`/api/student-records/${Ke.value}`,{studentIDNo:R.value,studentFirstName:Ve.value,studentLastName:Ze.value,studentAddress:Ye.value,studentYearLevel:Fe.value,studentCourse:Re.value,studentEmail:Oe.value,studentSubjectsEnrolled:We.value}).catch((e=>{Y.value=e.code,F.value=e.message})),await d.Z.get("/api/student-records").then((e=>Z.value=e.data)).catch((e=>{Y.value=e.code,F.value=e.msg})),l(`Edited student record of ID: ${R.value}`,"EDIT").catch((e=>{Y.value=e.code,F.value=e.message})),qe.value=!1,Ke.value="",cl())}async function dl(){await d.Z["delete"](`/api/student-records/${Ke.value}`).catch((e=>{Y.value=e.code,F.value=e.message})),await d.Z.get("/api/student-records").then((e=>Z.value=e.data)).catch((e=>{Y.value=e.code,F.value=e.msg})),l(`Deleted student record of ID: ${R.value}`,"DELETE").catch((e=>{Y.value=e.code,F.value=e.message})),qe.value=!1,Ke.value="",cl()}function cl(){R.value="",Ve.value="",Ze.value="",Ye.value="",Fe.value="I",Re.value="",Oe.value="",We.value=[],$e.value="",Ge.value="",Me.value=""}return(e,l)=>((0,t.wg)(),(0,t.iD)("div",v,[(0,t._)("div",r,[(0,t._)("div",_,[(0,t.Wm)(i.Z)]),(0,t._)("div",m,[(0,t._)("section",b,[(0,t._)("div",{class:(0,u.C_)(["modal",{"is-active":qe.value}])},[p,(0,t._)("div",w,[(0,t._)("div",h,[Ke.value?((0,t.wg)(),(0,t.iD)("button",{key:0,class:"button is-danger is-small",onClick:dl},"DELETE STUDENT INFORMATION")):(0,t.kq)("",!0),(0,t._)("div",f,[g,C,(0,t._)("div",y,[k,(0,t._)("div",D,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[0]||(l[0]=e=>R.value=e)},null,512),[[s.nr,R.value]])])]),(0,t._)("div",I,[S,(0,t._)("div",L,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[1]||(l[1]=e=>Ze.value=e)},null,512),[[s.nr,Ze.value]])])]),(0,t._)("div",E,[N,(0,t._)("div",U,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[2]||(l[2]=e=>Ve.value=e)},null,512),[[s.nr,Ve.value]])])]),(0,t._)("div",H,[x,(0,t._)("div",A,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[3]||(l[3]=e=>Ye.value=e)},null,512),[[s.nr,Ye.value]])])]),(0,t._)("div",T,[z,(0,t._)("div",V,[(0,t._)("div",j,[(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":l[4]||(l[4]=e=>Fe.value=e)},O,512),[[s.bM,Fe.value]])])])]),(0,t._)("div",W,[$,(0,t._)("div",G,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[5]||(l[5]=e=>Re.value=e)},null,512),[[s.nr,Re.value]])])]),(0,t._)("div",M,[P,(0,t._)("div",q,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[6]||(l[6]=e=>Oe.value=e)},null,512),[[s.nr,Oe.value]])])])]),(0,t._)("div",K,[B,J,(0,t._)("button",{class:"button is-info",onClick:el},"Add Subject"),Be.value?((0,t.wg)(),(0,t.iD)("div",Q,[(0,t._)("div",X,[ee,(0,t._)("div",le,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[7]||(l[7]=e=>$e.value=e)},null,512),[[s.nr,$e.value]])])]),(0,t._)("div",ae,[te,(0,t._)("div",ue,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[8]||(l[8]=e=>Ge.value=e)},null,512),[[s.nr,Ge.value]])])]),(0,t._)("div",se,[ne,(0,t._)("div",ie,[(0,t.wy)((0,t._)("input",{class:"input",type:"number","onUpdate:modelValue":l[9]||(l[9]=e=>Me.value=e)},null,512),[[s.nr,Me.value]])])]),(0,t._)("div",de,[ce,(0,t._)("div",oe,[(0,t.wy)((0,t._)("input",{class:"input",type:"text","onUpdate:modelValue":l[10]||(l[10]=e=>Pe.value=e)},null,512),[[s.nr,Pe.value]])]),ve]),(0,t._)("div",re,[(0,t._)("button",{class:"button is-danger is-light",onClick:l[11]||(l[11]=e=>Be.value=!1)},"Cancel"),void 0==Je.value?((0,t.wg)(),(0,t.iD)("button",{key:0,class:"button is-success is-light",onClick:ll},"Confirm")):((0,t.wg)(),(0,t.iD)("button",{key:1,class:"button is-info is-light",onClick:tl}," Update "))])])):(0,t.kq)("",!0),(0,t._)("table",_e,[(0,t._)("div",me,[be,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,n.SU)(Qe),((e,l)=>((0,t.wg)(),(0,t.iD)("tr",{key:l},[(0,t._)("th",null,[(0,t._)("div",pe,[(0,t._)("button",{class:"button is-info is-small",onClick:a=>al(e,l)},"Edit",8,we),(0,t._)("button",{class:"button is-danger is-small",onClick:l=>ul(e.code)},"Remove",8,he)])]),(0,t._)("th",null,(0,u.zw)(e.code),1),(0,t._)("td",null,(0,u.zw)(e.description),1),(0,t._)("td",null,(0,u.zw)(e.grade),1),(0,t._)("td",null,(0,u.zw)(e.instructor),1)])))),128))])])])]),(0,t._)("div",fe,[(0,t._)("button",{class:"button is-danger",onClick:l[12]||(l[12]=e=>(qe.value=!1,cl(),Ke.value=""))},"Cancel"),Ke.value?((0,t.wg)(),(0,t.iD)("button",{key:1,class:"button is-info",onClick:il},"Update")):((0,t.wg)(),(0,t.iD)("button",{key:0,class:"button is-success",onClick:sl},"Confirm"))])])])],2),(0,t._)("div",ge,[(0,t.Wm)(c.Z,{"err-code":Y.value,"err-message":F.value},null,8,["err-code","err-message"]),(0,t._)("div",Ce,[(0,t._)("div",ye,[(0,t._)("div",ke,[(0,t._)("div",De,[(0,t.wy)((0,t._)("input",{type:"text",class:"input is-rounded is-medium",placeholder:"Search...","onUpdate:modelValue":l[13]||(l[13]=e=>a.value=e)},null,512),[[s.nr,a.value]]),Ie])])]),(0,t._)("div",Se,[(0,t._)("div",Le,[(0,t._)("div",Ee,[(0,t._)("button",{class:"button is-medium is-rounded",onClick:l[14]||(l[14]=e=>qe.value=!0)},[(0,t.Uk)("Add Student   "),Ne])])])])]),Z.value?((0,t.wg)(),(0,t.iD)("div",Ue,[0!==Object.keys(Z.value).length?((0,t.wg)(),(0,t.iD)("table",He,[xe,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,n.SU)(Xe),(e=>((0,t.wg)(),(0,t.iD)("tr",{key:e._id,onClick:l=>nl(e)},[(0,t._)("th",null,(0,u.zw)(e.studentIDNo),1),(0,t._)("td",null,(0,u.zw)(e.studentLastName),1),(0,t._)("td",null,(0,u.zw)(e.studentFirstName),1),(0,t._)("td",null,(0,u.zw)(e.studentAddress),1),(0,t._)("td",null,(0,u.zw)(e.studentYearLevel),1),(0,t._)("td",null,(0,u.zw)(e.studentCourse),1),(0,t._)("td",null,(0,u.zw)(e.studentEmail),1),(0,t._)("td",null,[(0,t._)("div",Te,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e.studentSubjectsEnrolled,(e=>((0,t.wg)(),(0,t.iD)("div",{class:"column",key:e},(0,u.zw)(e.code)+": "+(0,u.zw)(e.grade),1)))),128))])]),(0,t._)("td",null,(0,u.zw)(e.studentSubjectsEnrolled.reduce(((l,a)=>l+a.grade/e.studentSubjectsEnrolled.length),0)),1)],8,Ae)))),128))])])):((0,t.wg)(),(0,t.iD)("div",ze,je))])):(0,t.kq)("",!0)])])])])]))}});const Ye=Ze;var Fe=Ye}}]);
//# sourceMappingURL=74.0602cc03.js.map
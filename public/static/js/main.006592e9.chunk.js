(window.webpackJsonpoutlookcalendar=window.webpackJsonpoutlookcalendar||[]).push([[0],{37:function(e,t,n){e.exports=n(54)},42:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(27),i=n.n(o),l=(n(42),n(10)),u=n(11),c=n(13),s=n(12),m=n(14),d=n(6),p=n(32),f=n(18),h=n(4),v=n.n(h),g=n(64),E=n(65),b=n(56),x=n(7),y=(n(44),n(55)),k=n(57),O=n(58),w=n(59),j=n(60),T=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.url;return r.a.createElement("div",null,r.a.createElement(y.a,{color:"dark",dark:!0,expand:"md",fixed:"top"},r.a.createElement(b.a,null,r.a.createElement(k.a,{href:"/"},"BOOKING WEB APP"),r.a.createElement(O.a,{navbar:!0},r.a.createElement(w.a,null,this.props.showRegister?r.a.createElement(j.a,{href:e,target:"_blank"},"Register"):null)))))}}]),t}(r.a.Component),D=n(61),S=n(62),B=n(63);function M(){var e=Object(d.a)(["\n  flex-grow: 1;\n  margin: 15px 10px 0px;\n"]);return M=function(){return e},e}function N(){var e=Object(d.a)(["\n  flex-grow: 1;\n  margin: 10px 10px 0px;\n"]);return N=function(){return e},e}function A(){var e=Object(d.a)(["\n  display: flex;\n"]);return A=function(){return e},e}function I(){var e=Object(d.a)(["\n  text-align: center;\n"]);return I=function(){return e},e}function C(){var e=Object(d.a)(["\n  margin: 10px auto;\n"]);return C=function(){return e},e}var P=x.a.div(C()),U=x.a.h2(I()),R=x.a.div(A()),W=x.a.div(N()),L=x.a.div(M()),F=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={userName:null,userEmail:null},n.inputName=function(e){n.setState({userName:e.target.value},function(){n.props.getUserInfo(n.state)})},n.inputEmail=function(e){var t="";e.target.value&&(t=null!==e.target.value.match(/^[a-zA-Z0-9.!#$%&\u2019*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i)?e.target.value:"NotRightFormat");n.setState({userEmail:t},function(){n.props.getUserInfo(n.state)})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(P,null,r.a.createElement(U,null,"Information"),r.a.createElement(R,null,r.a.createElement(W,null,r.a.createElement(D.a,null,r.a.createElement(S.a,{type:"text",name:"userName",id:"userName",placeholder:"Name (Required)",onChange:this.inputName})),r.a.createElement(D.a,null,r.a.createElement(S.a,{type:"email",name:"email",id:"email",placeholder:"Email (Required)",onChange:this.inputEmail})),r.a.createElement(D.a,null,r.a.createElement(B.a,{for:"select"},"Select Service"),r.a.createElement(S.a,{type:"select",name:"select",id:"select"},r.a.createElement("option",null,"IFN502 Student Consultation"),r.a.createElement("option",null,"IFN660 Student Consultation"),r.a.createElement("option",null,"IFN647 Student Consultation"),r.a.createElement("option",null,"Project meeting")))),r.a.createElement(L,null,r.a.createElement(D.a,null,r.a.createElement(B.a,{for:"exampleText"},"Please let me know if you have any special requests."),r.a.createElement(S.a,{type:"textarea",name:"text",id:"exampleText",rows:"5"})))))}}]),t}(r.a.Component);function Z(){var e=Object(d.a)(["\n  width: 35px;\n  height: 35px;\n  text-align: center;\n  line-height: 33px;\n  :hover {\n    border-radius: 50%;\n    background-color: #0088ff;\n    color: white;\n  }\n"]);return Z=function(){return e},e}function H(){var e=Object(d.a)(["\n  border-top-right-radius: 10px;\n  border-top-left-radius: 10px;\n  background-color: #89c8ff;\n  padding: 5px;\n  display: flex;\n  justify-content: space-between;\n  line-height: 33px;\n"]);return H=function(){return e},e}var z=x.a.div(H()),Y=x.a.div(Z());var q=function(e){var t=e.current,n=v()(t).startOf("week"),a=v()(t).endOf("week"),o=v()(n).format("D")+"-"+v()(a).format("D");return r.a.createElement(z,null,r.a.createElement(Y,{onClick:function(){return e.prevWeek(t)}}," ","<"," "),r.a.createElement("div",null,o+" "+v()(t).format("MMM YYYY")),r.a.createElement(Y,{onClick:function(){return e.nextWeek(t)}}," ",">"," "))};function J(){var e=Object(d.a)(["\n  border: 1px dashed rgb(228, 228, 228);\n  width: 100%;\n  height: 25px;\n  text-align: center;\n  line-height: 26px;\n  margin: 1px 0px;\n  transition: all 0.05s ease-in-out;\n"]);return J=function(){return e},e}var $=x.a.div(J()),G=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={time:n.props.time,isPicked:null,isHovered:!1},n.checkAfterToday=function(){var e=v()(new Date);return!!(n.state.time>e)},n.handleMouseEnter=function(e){e.target.value=n.state.time,n.setState({isHovered:!0})},n.handleMouseLeave=function(e){n.setState({isHovered:!1})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.time,a=t.isHovered,o=this.props,i=o.isBusy,l=o.tempBookTime,u=!1,c="";return this.checkAfterToday()&&i?c="busy":this.checkAfterToday()&&!1===i&&(c="mouse-on"),this.checkAfterToday()&&l.tempStartTime<=n&&n<l.tempEndTime&&(i?(u=!0,this.props.handleChooseBusyDay(u)):c+=" selecting"),r.a.createElement($,{className:c,value:n,onMouseDown:function(t){return e.props.handleMouseDown(t,e.checkAfterToday(),!i)},onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},a?v()(n).format("hh:mm A"):"")}}]),t}(r.a.Component);function K(){var e=Object(d.a)(["\n  border: 1px dashed rgb(228, 228, 228);\n  width: 100%;\n  height: 51px;\n  text-align: center;\n  line-height: 26px;\n  margin: 1px 0px;\n"]);return K=function(){return e},e}function _(){var e=Object(d.a)([""]);return _=function(){return e},e}function Q(){var e=Object(d.a)(["\n  padding: 5px 20px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n"]);return Q=function(){return e},e}function V(){var e=Object(d.a)(["\n  font-size: 20px;\n"]);return V=function(){return e},e}function X(){var e=Object(d.a)(["\n  margin: 5px 10px;\n  width: 14.2%;\n  height: 45px;\n  line-height: 23px;\n"]);return X=function(){return e},e}function ee(){var e=Object(d.a)(["\n  width: 100%;\n  margin: 0px 2.5px;\n"]);return ee=function(){return e},e}var te=x.a.div(ee()),ne=x.a.div(X()),ae=x.a.div(V()),re=x.a.div(Q()),oe=x.a.div(_()),ie=x.a.div(K()),le=["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],ue=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={tempBookTime:{tempStartTime:null,tempEndTime:null},mouseIsDown:!1},n.handleMouseDown=function(e,t,a){t&&a?n.setState({tempBookTime:{tempStartTime:e.target.value,tempEndTime:v()(e.target.value+18e5)},mouseIsDown:!0},function(){n.props.getDate(n.state.tempBookTime)}):alert("Please choose another day.")},n.handleMouseOver=function(e){var t=n.state.tempBookTime;n.setState({tempBookTime:{tempStartTime:t.tempStartTime,tempEndTime:v()(e.target.value+18e5)}},function(){n.props.getDate(n.state.tempBookTime)})},n.handleMouseUp=function(){n.setState({mouseIsDown:!1})},n.handleChooseBusyDay=function(e){var t=n.state.tempBookTime;e&&n.setState({tempBookTime:{tempStartTime:t.tempStartTime,tempEndTime:v()(t.tempStartTime+18e5)},mouseIsDown:!1},function(){n.props.getDate(n.state.tempBookTime)})},n.renderCells=function(e,t){for(var a,o=v()(e).hour(8).minute(0).second(0).millisecond(0),i=v()(e).hour(17).minute(0).second(0).millisecond(0),l=[],u=o,c=0;u<i;){if(a=!1,c<t.length){var s=t[c].start.diff(u,"minutes")<=0,m=t[c].end.diff(u,"minutes")>0;s&&m&&(a=!0),0===t[c].end.diff(u,"minutes")&&c++}l.push(r.a.createElement(G,{key:u,time:u,isBusy:a,tempBookTime:n.state.tempBookTime,handleMouseDown:n.handleMouseDown,handleChooseBusyDay:n.handleChooseBusyDay})),u=v()(u).add(30,"m")}return r.a.createElement(oe,null,l)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){for(var e,t,n,a,o=this,i=this.props,l=i.current,u=i.events,c=this.state.mouseIsDown,s=v()(l).day(0),m=[],d=function(i){e=v()(s).add(i,"d"),t="",n=v()(e),(a=n.diff(new Date,"hours"))<0?t="before":0===a&&(t="today");var l=[];u.forEach(function(e){n.date()===v()(e.start).date()&&l.push({start:v()(e.start),end:v()(e.end)})}),m.push(r.a.createElement(te,{key:i,className:t,onMouseOver:c?o.handleMouseOver:null,onMouseUp:o.handleMouseUp},r.a.createElement(ne,null,r.a.createElement("div",null,v()(e).format("ddd")),r.a.createElement(ae,null,v()(e).format("D"))),o.renderCells(e,l)))},p=0;p<7;p++)d(p);return r.a.createElement(re,null,r.a.createElement(te,null,r.a.createElement(ne,null),r.a.createElement(oe,null,le.map(function(e){return r.a.createElement(ie,{key:e},e)}))),m)}}]),t}(r.a.Component);function ce(){var e=Object(d.a)(["\n  width: 97%;\n  border-top: 1px dashed red;\n  position: relative;\n  top: -282.5px;\n"]);return ce=function(){return e},e}function se(){var e=Object(d.a)(["\n  border-top-right-radius: 10px;\n  border-top-left-radius: 10px;\n  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);\n  position: relative;\n"]);return se=function(){return e},e}var me=x.a.div(se()),de=x.a.hr(ce()),pe=[],fe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={currentMonth:new Date,eventsArr:[]},n.storeEvents=function(e){pe=[],e.forEach(function(e){pe.push({start:e.start.dateTime,end:e.end.dateTime})}),0===n.state.eventsArr.length&&n.setState({eventsArr:pe})},n.processMSTime=function(e){for(var t=e.match(/(\d+[dhms]+)(\d*[hms]*)(\d*[ms]*)(\d*[s]*)/i),n={},a=[],r=1;r<=4;r++)n={},""!==t[r]&&(n.num=t[r].slice(0,-1),n.duration=t[r].slice(-1),a.push(n));for(var o,i=0,l=0;l<a.length;l++)switch(o=parseInt(a[l].num),a[l].duration){case"S":i+=o;break;case"M":i+=60*o;break;case"H":i+=60*o*60;break;case"D":i+=60*o*60*24;break;default:console.log("no matching duration with"+a[l].duration)}return i},n.prevWeek=function(e){var t=v()(e).diff(v()(new Date),"days");-7<t&&t<14&&n.setState({currentMonth:v()(e).subtract(1,"w")})},n.nextWeek=function(e){var t=v()(e).diff(v()(new Date),"days");-7<=t&&t<13&&n.setState({currentMonth:v()(e).add(1,"w")})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(){null!==this.props.events&&0===pe.length&&this.storeEvents(this.props.events)}},{key:"render",value:function(){var e=this.state,t=e.currentMonth,n=e.eventsArr;return r.a.createElement(r.a.Fragment,null,r.a.createElement(me,null,r.a.createElement(q,{current:t,prevWeek:this.prevWeek,nextWeek:this.nextWeek}),r.a.createElement(ue,{current:t,events:n,getDate:this.props.getSelectedDate}),r.a.createElement(de,null)))}}]),t}(r.a.Component);function he(){var e=Object(d.a)(["\n  height: 75vh;\n  display: flex;\n  text-align: center;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);return he=function(){return e},e}function ve(){var e=Object(d.a)([""]);return ve=function(){return e},e}function ge(){var e=Object(d.a)(["\n  width: 100vw;\n  height: 100vh;\n  background-color: white;\n  position: relative;\n  top: -71px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return ge=function(){return e},e}function Ee(){var e=Object(d.a)(["\n  margin: 0px auto 10px;\n  display: flex;\n  justify-content: center;\n"]);return Ee=function(){return e},e}var be=Object(x.a)(g.a)(Ee()),xe=x.a.div(ge()),ye=Object(x.a)(E.a)(ve()),ke=x.a.div(he()),Oe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={business:null,calendarEvents:null,services:null,regisURL:null,selectedDate:null,userInfo:{userName:null,userEmail:null},isLoad:!1},n.getURLandBookingsData=function(){fetch("/url").then(function(e){return e.text()}).then(function(e){fetch("/book").then(function(e){return e.json()}).then(function(t){n.setState({business:t.business,calendarEvents:t.events,services:t.services,regisURL:e,isLoad:!0})})})},n.getSelectedDate=function(e){n.setState({selectedDate:e})},n.getUserInfo=function(e){n.setState({userInfo:e})},n.sentData=function(){var e=n.state,t=e.selectedDate,a=e.userInfo;t&&a.userName&&a.userEmail?"NotRightFormat"!==a.userEmail?(alert("Thank you for using BOOKING WEB APP.\nPlease wait for 5 sec ..."),fetch("/book",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"@odata.type":"#microsoft.graph.bookingAppointment",customerEmailAddress:a.userEmail,customerName:a.userName,customerNotes:"Please be on time.",customerPhone:"213-555-0199",end:{"@odata.type":"#microsoft.graph.dateTimeTimeZone",dateTime:v()(t.tempEndTime).format(),timeZone:"Australia/Brisbane"},serviceId:"6fbd2880-9e81-4f0f-9d78-291d0ce9066f",serviceName:"Initial consult",start:{"@odata.type":"#microsoft.graph.dateTimeTimeZone",dateTime:v()(t.tempStartTime).format(),timeZone:"Australia/Brisbane"}})}).then(function(e){window.location.reload()})):alert("Format of Email is wrong!"):null===t?alert("Please choose time~"):alert("Please input Name and Email !")},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getURLandBookingsData()}},{key:"render",value:function(){var e=this,t=this.state,n=t.business,a=t.calendarEvents,o=t.services,i=t.regisURL,l=t.isLoad,u="hidden",c="";console.log(n),console.log(a),console.log(o),l||(c="hidden",u="");var s=l&&null===n&&null===a&&null===o;return r.a.createElement(r.a.Fragment,null,r.a.createElement(xe,{className:u},r.a.createElement(ye,{color:"primary"})),r.a.createElement("div",{className:c},r.a.createElement(T,{url:i,showRegister:s}),r.a.createElement(b.a,null,s?r.a.createElement(ke,null,r.a.createElement("h1",null,"There is no data in the database"),r.a.createElement("h1",null,"Administrator have to register at first !")):r.a.createElement(p.a,null,r.a.createElement(f.a,{exact:!0,path:"/",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,{getUserInfo:e.getUserInfo}),r.a.createElement(fe,{events:e.state.calendarEvents,getSelectedDate:e.getSelectedDate}),r.a.createElement(be,{color:"primary",onClick:e.sentData},"Sent Book"))}})))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.006592e9.chunk.js.map
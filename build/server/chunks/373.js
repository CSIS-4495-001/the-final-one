exports.id=373,exports.ids=[373],exports.modules={4710:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,9918,23)),Promise.resolve().then(s.t.bind(s,2057,23)),Promise.resolve().then(s.t.bind(s,6148,23)),Promise.resolve().then(s.t.bind(s,8359,23)),Promise.resolve().then(s.t.bind(s,1860,23)),Promise.resolve().then(s.t.bind(s,2427,23))},4817:(e,t,s)=>{Promise.resolve().then(s.bind(s,9770))},6857:(e,t,s)=>{"use strict";s.d(t,{Z:()=>components_Chat});var a=s(80),r=s(9885),n=s(6748),l=s(6160);let components_ChatMessage=({message:e})=>{let t=!1,{user:s}=(0,n._)(),{data:i}=(0,l.Q)(),o=(0,r.useRef)(null);(0,r.useEffect)(()=>{o.current?.scrollIntoView({behavior:"smooth"})},[e]);let d=new Date(1e3*e.date.seconds);return t=!!s&&e.senderId===s.uid,(0,a.jsxs)("div",{ref:o,className:`flex ${t?"justify-end":"justify-start"} items-center mb-4 ml-2 mr-2`,children:[t&&a.jsx("p",{className:"text-xs text-gray-400 ml-2 mr-2",children:d.toLocaleString()}),(0,a.jsxs)("div",{className:`max-w-[70%] p-3 rounded-lg ${t?"bg-gray-800 text-white shadow-lg":"bg-gray-400 text-black shadow-lg"} ${t?"float-right":"float-left"}`,children:[e.text.split("\n").map((e,t)=>a.jsx("p",{children:e},t)),e.image&&a.jsx("img",{src:e?.image,alt:"",className:"mt-2 rounded-md w-full h-auto"})]}),!t&&a.jsx("p",{className:"text-xs text-gray-500 ml-2 mr-2",children:d.toLocaleString()})]})};var i=s(1522),o=s(6876);let components_ChatMessages=()=>{let[e,t]=(0,r.useState)([]),{data:s}=(0,l.Q)();return(0,r.useEffect)(()=>{let e=(0,i.cf)((0,i.JU)(o.db,"chats",s.chatId),e=>{e.exists()&&t(e.data().messages)});return()=>{e()}},[s.chatId]),console.log("messages => ",e),a.jsx("div",{children:e.map(e=>a.jsx(components_ChatMessage,{message:e},e.id))})};var d=s(1640);let{v4:c}=s(1768),components_ChatInput=()=>{let e=c(),[t,s]=(0,r.useState)(" "),[m,u]=(0,r.useState)(null),[h,g]=(0,r.useState)(!1),{user:x}=(0,n._)(),{data:p}=(0,l.Q)(),handleSend=async()=>{if(m){let s=(0,d.iH)(o.tO,"chats/"+e),a=(0,d.B0)(s,m);a.on("state_changed",e=>{},e=>{console.error(e)},()=>{(0,d.Jt)(a.snapshot.ref).then(async s=>{await (0,i.r7)((0,i.JU)(o.db,"chats",p.chatId),{messages:(0,i.vr)({id:e,text:t,senderId:x.uid,date:i.EK.now(),image:s})})})})}else await (0,i.r7)((0,i.JU)(o.db,"chats",p.chatId),{messages:(0,i.vr)({id:e,text:t,senderId:x.uid,date:i.EK.now()})});await (0,i.r7)((0,i.JU)(o.db,"userChats",x.uid),{[p.chatId+".lastMessage"]:{text:t},[p.chatId+".date"]:(0,i.Bt)()}),await (0,i.r7)((0,i.JU)(o.db,"userChats",p.Nuser.uid),{[p.chatId+".lastMessage"]:{text:t},[p.chatId+".date"]:(0,i.Bt)()}),s(""),u(null),g(!1)},handleImageChange=e=>{let t=e.target.files?.[0]||null;u(t)};return(0,a.jsxs)("div",{className:"bottom-0 left-0 w-full bg-gray-700 flex items-center ",children:[a.jsx("input",{type:"text",placeholder:"Enter your message...",className:"w-full border border-gray-800 p-4 mr-2 rounded focus:outline-none focus:border-gray-500 text-white bg-gray-800",onChange:e=>s(e.target.value),onKeyDown:e=>{"Enter"===e.key&&handleSend()},value:t}),(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("label",{htmlFor:"file",className:"cursor-pointer",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-gray-800 hover:text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})})}),a.jsx("input",{type:"file",style:{display:"none"},id:"file",onChange:e=>{handleImageChange(e),g(!0)}})]}),m&&a.jsx("div",{className:"mr-2",children:a.jsx("button",{className:"text-blue-500 underline cursor-pointer",onClick:()=>g(!0)})}),h&&a.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:(0,a.jsxs)("div",{className:"bg-gray-800 p-4 rounded text-white",children:[a.jsx("p",{className:"justify-center",children:"Image Selected"}),a.jsx("button",{className:"bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2",onClick:handleSend,children:"Send"}),a.jsx("button",{className:"bg-gray-700 text-white font-bold py-2 px-4 rounded",onClick:()=>{u(null),g(!1)},children:"Cancel"})]})}),a.jsx("div",{className:"bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-pointer",onClick:handleSend,children:"Send"})]})},capitalizeFirstLetter=e=>e.replace(/\b\w/g,e=>e.toUpperCase()),components_Chat=()=>{let{data:e}=(0,l.Q)();console.log("data Latest => ",e);let t=e.Nuser?.displayName||"",s=t?capitalizeFirstLetter(t):"Chat Window";return(0,a.jsxs)("div",{className:"w-596 overflow-hidden flex flex-col bg-gray-200",style:{height:"43rem"},children:[(0,a.jsxs)("div",{className:"p-4 bg-gray-700",children:[a.jsx("span",{className:"font-semibold text-lg text-white",children:s}),a.jsx("hr",{className:"border-t border-white mt-2"})]}),a.jsx("div",{className:"flex-grow overflow-y-auto bg-gray-700",children:a.jsx(components_ChatMessages,{})}),a.jsx(components_ChatInput,{})]})}},6748:(e,t,s)=>{"use strict";s.d(t,{H:()=>AuthContextProvider,_:()=>UserAuth});var a=s(80),r=s(9885),n=s(8241),l=s(6876),i=s(1522),o=s(6160);let d=(0,r.createContext)(),AuthContextProvider=({children:e})=>{let[t,s]=(0,r.useState)(null),[c,m]=(0,r.useState)(!1),handleSendEmailLink=async e=>{let t=(0,n.v0)(),s={url:window.location.origin,handleCodeInApp:!0};try{console.log("dropping mail",s),(0,n.oo)(t,e,s).then(()=>{window.localStorage.setItem("emailForSignIn",e),console.log("Email link sent. Check your email to sign in.")}).catch(e=>{e.code,e.message,console.error("Error sending email link:",e)})}catch(e){console.error("Error sending email link - :",e)}};(0,r.useEffect)(()=>{let e=(0,n.Aj)(l.I8,e=>{s(e)});return e},[t]);let saveUserDetails=async e=>{console.log({user:e}),e.displayName||(e.displayName=e.email.split("@")[0]);let t={displayName:e.displayName.toLowerCase(),email:e.email,uid:e.uid},s=(0,i.JU)(l.db,"users",e.uid),a=(0,i.JU)(l.db,"userChats",e.uid);try{let e=await (0,i.QT)(s);e.exists()?console.log("User document already exists. Skipping creation."):(await (0,i.pl)(s,t),console.log("User document written successfully."));let r=await (0,i.QT)(a);r.exists()?console.log("UserChats document already exists. Skipping creation."):(await (0,i.pl)(a,{}),console.log("UserChats document written successfully."))}catch(e){console.error("Error adding document: ",e)}};return a.jsx(d.Provider,{value:{user:t,isAdmin:c,setIsAdmin:m,googleSignIn:()=>{let e=new n.hJ;(0,n.rh)(l.I8,e).then(e=>{saveUserDetails(e.user)}).catch(e=>{console.error(e)})},logOut:()=>{(0,n.w7)(l.I8)},handleSendEmailLink,saveUserDetails},children:a.jsx(o.R,{children:e})})},UserAuth=()=>(0,r.useContext)(d)},6160:(e,t,s)=>{"use strict";s.d(t,{Q:()=>ChatAuth,R:()=>ChatContextProvider});var a=s(80),r=s(9885);s(8241),s(6876),s(1522),s(6857);var n=s(6748);let l=(0,r.createContext)(),ChatContextProvider=({children:e})=>{let{user:t}=(0,n._)(),[s,i]=(0,r.useReducer)((e,s)=>"CHANGE_USER"===s.type?{Nuser:s.payload,chatId:t.uid>s.payload.uid?t.uid+s.payload.uid:s.payload.uid+t.uid}:e,{chatId:"null",Nuser:{}});return a.jsx(l.Provider,{value:{data:s,dispatch:i},children:e})},ChatAuth=()=>(0,r.useContext)(l)},6876:(e,t,s)=>{"use strict";s.d(t,{I8:()=>d,db:()=>c,tO:()=>m});var a=s(8241),r=s(2856),n=s(8264),l=s(1522),i=s(1640);let o=(0,r.ZF)({apiKey:"AIzaSyBuAHsQuDml9p5BZpM8qhmUh4r893hXzA8",authDomain:"trademate-ccec1.firebaseapp.com",projectId:"trademate-ccec1",storageBucket:"trademate-ccec1.appspot.com",messagingSenderId:"579948238014",appId:"1:579948238014:web:531bb2e2b28cafe6a2baef",measurementId:"G-ZWJ9YVY5T8"});(0,n.Gb)().then(e=>e?(0,n.IH)(o):null);let d=(0,a.v0)(o),c=(0,l.ad)(o),m=(0,i.cF)(o)},9770:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>RootLayout});var a=s(80),r=s(7270),n=s.n(r);s(3824);var l=s(1440),i=s.n(l),o=s(7114),d=s(9885),c=s.n(d),m=s(6748),u=s(8680),h=s.n(u),g=s(5064),x=s.n(g),p=s(4751);s(5996);var f=s(8241);let navbar=()=>{let{user:e,googleSignIn:t,logOut:s,handleSendEmailLink:r,saveUserDetails:n,isAdmin:l,setIsAdmin:u}=(0,m._)(),[g,y]=(0,d.useState)(!1),[b,v]=c().useState(!0),[j,w]=(0,d.useState)(!1),[N,C]=(0,d.useState)(""),S=(0,o.useRouter)(),handleSignIn=async()=>{try{await t()}catch(e){console.log(e),y(!0)}},handleEmailVerification=()=>{let e=(0,f.v0)(),t=(0,f.JB)(e,window.location.href);if(t){let t=window.localStorage.getItem("emailForSignIn");t?(0,f.P6)(e,t,window.location.href).then(e=>{console.log("Successfully signed in:",e.user),window.localStorage.removeItem("emailForSignIn"),n(e.user)}).catch(e=>{console.error("Error signing in:",e)}):console.error("Email address not found.")}},openEmailLogin=async()=>{w(!0)},handleEmailLogin=async()=>{if(""!==N.trim())try{console.log({email:N,handleSendEmailLink:r}),await r(N),w(!1),p.Am.success("Email has been sent successfully!",{position:"bottom-left",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark"})}catch(e){console.error("Error sending email link:",e)}},handleSignOut=async()=>{try{await s(),console.log("Logged out, redirecting to home"),S.push("/")}catch(e){console.log(e)}};return(0,d.useEffect)(()=>{let checkAuthentication=async()=>{await new Promise(e=>setTimeout(e,500)),v(!1)};e&&(e&&"xXynFyfXtpbYJrt1mltsCRAfOiX2, Qodiq2Gg9igsPCcGMfvfrvTbJAn1".split(", ").includes(e.uid)?u(!0):u(!1)),checkAuthentication(),handleEmailVerification()},[e,l]),h().setAppElement("#app-root"),(0,a.jsxs)("nav",{className:"relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4 p-5 bg-gray-700 pt-9 pb-9 pr-9",children:[a.jsx(p.Ix,{}),a.jsx("div",{className:"flex items-center flex-1 md:absolute md:inset-y-0 md:left-0",children:a.jsx("div",{className:"flex items-center justify-between w-full md:w-auto",children:a.jsx("div",{className:"-mr-2 flex items-center md:hidden",children:a.jsx("button",{type:"button",id:"main-menu","aria-label":"Main menu","aria-haspopup":"true",className:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",children:a.jsx("svg",{stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",className:"h-6 w-6",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})})})})}),e?l?(0,a.jsxs)("div",{className:"hidden md:flex md:space-x-10",children:[a.jsx(i(),{href:"/admin",className:"font-medium text-white hover:text-gray-900 transition duration-150 ease-in-out",children:"Dashboard"}),a.jsx(i(),{href:"/admin/moderate",className:"font-medium text-white hover:text-gray-900 transition duration-150 ease-in-out",children:"Moderate"})]}):(0,a.jsxs)("div",{className:"hidden md:flex md:space-x-10",children:[a.jsx(i(),{href:"/explore",className:"font-medium text-white hover:text-gray-900 transition duration-150 ease-in-out",children:"Explore"}),a.jsx(i(),{href:"/profile",className:"font-medium text-white hover:text-gray-900 transition duration-150 ease-in-out",children:"Profile"}),a.jsx(i(),{href:"/chat",className:"font-medium text-white hover:text-gray-900 transition duration-150 ease-in-out",children:"Chat"})]}):a.jsx("div",{}),a.jsx("div",{className:"hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0",children:b?null:e?a.jsx("div",{className:"flex items-center pr-2",children:a.jsx("button",{onClick:handleSignOut,className:"bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600",children:"Sign Out"})}):(0,a.jsxs)("ul",{className:"flex",children:[a.jsx("li",{onClick:handleSignIn,className:"p-2 cursor-pointer hover:underline",children:a.jsx("div",{className:"px-6 sm:px-0 max-w-sm",children:(0,a.jsxs)("button",{type:"button",className:"text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2",children:[a.jsx("svg",{className:"mr-2 -ml-1 w-4 h-4","aria-hidden":"true",focusable:"false","data-prefix":"fab","data-icon":"google",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 488 512",children:a.jsx("path",{fill:"currentColor",d:"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"})}),"Login with Google",a.jsx("div",{})]})})}),a.jsx("li",{className:"p-2 cursor-pointer hover:underline",children:a.jsx("div",{className:"px-6 sm:px-0 max-w-sm",children:a.jsx("button",{type:"button",className:"text-white w-full bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-gray-700 mr-2 mb-2",onClick:openEmailLogin,children:"Login with Email"})})}),g?a.jsx("p",{className:"text-red-500",children:"Error signing in"}):null]})}),a.jsx(h(),{isOpen:j,onRequestClose:()=>w(!1),contentLabel:"Enter Email Modal",className:x().modal,shouldCloseOnOverlayClick:!0,style:{overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(19, 19, 19, 0.75)"}},children:(0,a.jsxs)("div",{className:x().emailModal,children:[a.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Enter Your Email"}),a.jsx("input",{type:"email",placeholder:"Please enter your email",value:N,onChange:e=>C(e.target.value),className:"border border-gray-300 rounded-md py-2 px-3 mb-4 w-full"}),a.jsx("button",{onClick:handleEmailLogin,className:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400",children:"Send Email Link"})]})})]})};function RootLayout({children:e}){return(0,a.jsxs)("html",{lang:"en",children:[a.jsx("head",{children:a.jsx("title",{children:"TradeMate - A project by Gaurav and Anshdeep"})}),(0,a.jsxs)("body",{className:n().className,children:[a.jsx("div",{id:"app-root",children:(0,a.jsxs)(m.H,{children:[a.jsx(navbar,{}),e]})}),a.jsx("script",{async:!0,src:"/js/static.js"}),a.jsx("script",{async:!0,src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyClGrRrDVhzjZKtCfww9Y85AhJHeDaYzsA&libraries=places&callback=initMap"})]})]})}},5064:e=>{e.exports={modal:"navbar_modal__LLVRE",overlay:"navbar_overlay__y_v0F",emailModal:"navbar_emailModal__CFyR5"}},9197:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>l,__esModule:()=>n,default:()=>o});var a=s(7536);let r=(0,a.createProxy)(String.raw`/Users/gauravmehla/Documents/code/4495/the-final-one/src/app/layout.tsx`),{__esModule:n,$$typeof:l}=r,i=r.default,o=i},3824:()=>{}};
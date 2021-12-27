(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1653:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return d}));var n,a=r(83),i=r.n(a),o=r(82),s=r.n(o),l=r(590),c=r(84),h=r(97),u=r(1);!function(e){e.Edit="edit",e.Importing="importing"}(n||(n={}));class d extends s.a.Component{constructor(e){super(e),i()(this,"unmounted",!1),i()(this,"file",Object(o.createRef)()),i()(this,"passphrase",Object(o.createRef)()),i()(this,"onFormChange",e=>{const t=this.file.current.files||[];this.setState({enableSubmit:""!==this.passphrase.current.value&&t.length>0})}),i()(this,"onFormSubmit",e=>(e.preventDefault(),this.startImport(this.file.current.files[0],this.passphrase.current.value),!1)),i()(this,"onCancelClick",e=>(e.preventDefault(),this.props.onFinished(!1),!1)),this.state={enableSubmit:!1,phase:n.Edit,errStr:null}}componentWillUnmount(){this.unmounted=!0}startImport(e,t){return this.setState({errStr:null,phase:n.Importing}),function(e){return new Promise((t,r)=>{const n=new FileReader;n.onload=e=>{t(e.target.result)},n.onerror=r,n.readAsArrayBuffer(e)})}(e).then(e=>l.a(e,t)).then(e=>this.props.matrixClient.importRoomKeys(JSON.parse(e))).then(()=>{this.props.onFinished(!0)}).catch(e=>{if(u.a.error("Error importing e2e keys:",e),this.unmounted)return;const t=e.friendlyText||Object(c.a)("Unknown error");this.setState({errStr:t,phase:n.Edit})})}render(){const e=this.state.phase!==n.Edit;return s.a.createElement(h.a,{className:"mx_importE2eKeysDialog",onFinished:this.props.onFinished,title:Object(c.a)("Import room keys")},s.a.createElement("form",{onSubmit:this.onFormSubmit},s.a.createElement("div",{className:"mx_Dialog_content"},s.a.createElement("p",null,Object(c.a)("This process allows you to import encryption keys that you had previously exported from another Matrix client. You will then be able to decrypt any messages that the other client could decrypt.")),s.a.createElement("p",null,Object(c.a)("The export file will be protected with a passphrase. You should enter the passphrase here, to decrypt the file.")),s.a.createElement("div",{className:"error"},this.state.errStr),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputTable"},s.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},s.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},s.a.createElement("label",{htmlFor:"importFile"},Object(c.a)("File to import"))),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},s.a.createElement("input",{ref:this.file,id:"importFile",type:"file",autoFocus:!0,onChange:this.onFormChange,disabled:e}))),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},s.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},s.a.createElement("label",{htmlFor:"passphrase"},Object(c.a)("Enter passphrase"))),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},s.a.createElement("input",{ref:this.passphrase,id:"passphrase",size:64,type:"password",onChange:this.onFormChange,disabled:e}))))),s.a.createElement("div",{className:"mx_Dialog_buttons"},s.a.createElement("input",{className:"mx_Dialog_primary",type:"submit",value:Object(c.a)("Import"),disabled:!this.state.enableSubmit||e}),s.a.createElement("button",{onClick:this.onCancelClick,disabled:e},Object(c.a)("Cancel")))))}}},590:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return h}));var n=r(84),a=r(93),i=r(1);const o=window.crypto.subtle||window.crypto.webkitSubtle;function s(e,t){return{message:e,friendlyText:t}}function l(){return Object(n.a)("Your browser does not support the required cryptography extensions")}async function c(e,t){const r=function(e){const t=(new TextDecoder).decode(new Uint8Array(e));let r=0;for(;;){const e=t.indexOf("\n",r);if(e<0)throw new Error("Header line not found");const n=t.slice(r,e).trim();if(r=e+1,n===d)break}const n=r;for(;;){const e=t.indexOf("\n",r);if("-----END MEGOLM SESSION DATA-----"===t.slice(r,e<0?void 0:e).trim())break;if(e<0)throw new Error("Trailer line not found");r=e+1}const a=r;return function(e){const t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r}(t.slice(n,a))}(e),i=a.a.get().brand;if(r.length<1)throw s("Invalid file: too short",Object(n.a)("Not a valid %(brand)s keyfile",{brand:i}));if(1!==r[0])throw s("Unsupported version",Object(n.a)("Not a valid %(brand)s keyfile",{brand:i}));const c=r.length-69;if(c<0)throw s("Invalid file: too short",Object(n.a)("Not a valid %(brand)s keyfile",{brand:i}));const h=r.subarray(1,17),p=r.subarray(17,33),m=r[33]<<24|r[34]<<16|r[35]<<8|r[36],y=r.subarray(37,37+c),f=r.subarray(-32),[w,b]=await u(h,m,t),E=r.subarray(0,-32);let g,C;try{g=await o.verify({name:"HMAC"},b,f,E)}catch(e){throw s("subtleCrypto.verify failed: "+e,l())}if(!g)throw s("hmac mismatch",Object(n.a)("Authentication check failed: incorrect password?"));try{C=await o.decrypt({name:"AES-CTR",counter:p,length:64},w,y)}catch(e){throw s("subtleCrypto.decrypt failed: "+e,l())}return(new TextDecoder).decode(new Uint8Array(C))}async function h(e,t,r){const n=(r=r||{}).kdf_rounds||5e5,a=new Uint8Array(16);window.crypto.getRandomValues(a);const i=new Uint8Array(16);window.crypto.getRandomValues(i),i[8]&=127;const[c,h]=await u(a,n,t),m=(new TextEncoder).encode(e);let y;try{y=await o.encrypt({name:"AES-CTR",counter:i,length:64},c,m)}catch(e){throw s("subtleCrypto.encrypt failed: "+e,l())}const f=new Uint8Array(y),w=1+a.length+i.length+4+f.length+32,b=new Uint8Array(w);let E=0;b[E++]=1,b.set(a,E),E+=a.length,b.set(i,E),E+=i.length,b[E++]=n>>24,b[E++]=n>>16&255,b[E++]=n>>8&255,b[E++]=255&n,b.set(f,E),E+=f.length;const g=b.subarray(0,E);let C;try{C=await o.sign({name:"HMAC"},h,g)}catch(e){throw s("subtleCrypto.sign failed: "+e,l())}const v=new Uint8Array(C);return b.set(v,E),function(e){const t=Math.ceil(e.length/96),r=new Array(t+3);r[0]=d;let n,a=0;for(n=1;n<=t;n++)r[n]=p(e.subarray(a,a+96)),a+=96;return r[n++]="-----END MEGOLM SESSION DATA-----",r[n]="",(new TextEncoder).encode(r.join("\n")).buffer}(b)}async function u(e,t,r){const n=new Date;let a,c;try{a=await o.importKey("raw",(new TextEncoder).encode(r),{name:"PBKDF2"},!1,["deriveBits"])}catch(e){throw s("subtleCrypto.importKey failed: "+e,l())}try{c=await o.deriveBits({name:"PBKDF2",salt:e,iterations:t,hash:"SHA-512"},a,512)}catch(e){throw s("subtleCrypto.deriveBits failed: "+e,l())}const h=new Date;i.a.log("E2e import/export: deriveKeys took "+(h.getTime()-n.getTime())+"ms");const u=c.slice(0,32),d=c.slice(32),p=o.importKey("raw",u,{name:"AES-CTR"},!1,["encrypt","decrypt"]).catch(e=>{throw s("subtleCrypto.importKey failed for AES key: "+e,l())}),m=o.importKey("raw",d,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]).catch(e=>{throw s("subtleCrypto.importKey failed for HMAC key: "+e,l())});return await Promise.all([p,m])}const d="-----BEGIN MEGOLM SESSION DATA-----";function p(e){const t=String.fromCharCode.apply(null,e);return window.btoa(t)}}}]);
//# sourceMappingURL=28.js.map
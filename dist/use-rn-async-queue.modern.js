import{useState as n,useRef as t,useEffect as r,useCallback as e}from"react";import u from"next-tick";function c(){return c=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}return n},c.apply(this,arguments)}function i(i){const{done:o,drain:s,inflight:m}=i;let{concurrency:g}=i;g<1&&(g=Infinity);const[h,l]=n({numPending:0,numInFlight:0,numDone:0}),a=t(!0),p=t([]),f=t([]);r(()=>{if(h.numDone>0&&s&&0===p.current.length&&0===f.current.length&&!a.current)return a.current=!0,u(s);for(;p.current.length<g&&f.current.length>0;){a.current=!1;const n=f.current.shift();p.current.push(n),l(n=>c({},n,{numPending:n.numPending-1,numInFlight:n.numInFlight+1})),m&&m(c({},n,{stats:h}));const t=n.task();t.then(()=>{p.current.pop(),l(n=>c({},n,{numInFlight:n.numInFlight-1,numDone:n.numDone+1})),o&&o(c({},n,{result:t,stats:h}))}).catch(()=>{p.current.pop(),l(n=>c({},n,{numInFlight:n.numInFlight-1,numDone:n.numDone+1})),o&&o(c({},n,{result:t,stats:h}))})}},[g,o,s,m,h]);const d=e(n=>{f.current.push(n),l(n=>c({},n,{numPending:n.numPending+1}))},[]);return{add:d,stats:h}}export{i as useRnAsyncQueue};
//# sourceMappingURL=use-rn-async-queue.modern.js.map

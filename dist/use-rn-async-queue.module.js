import{useState as n,useRef as t,useEffect as r,useCallback as e}from"react";import u from"next-tick";function c(c){const{done:i,drain:m,inflight:o}=c;let{concurrency:s}=c;s<1&&(s=Infinity);const[g,h]=n({numPending:0,numInFlight:0,numDone:0}),l=t(!0),a=t([]),d=t([]);r(()=>{if(g.numDone>0&&m&&0===a.current.length&&0===d.current.length&&!l.current)return l.current=!0,u(m);for(;a.current.length<s&&d.current.length>0;){l.current=!1;const n=d.current.shift();a.current.push(n),h(n=>({...n,numPending:n.numPending-1,numInFlight:n.numInFlight+1})),o&&o({...n,stats:g});const t=n.task();t.then(()=>{a.current.pop(),h(n=>({...n,numInFlight:n.numInFlight-1,numDone:n.numDone+1})),i&&i({...n,result:t,stats:g})}).catch(()=>{a.current.pop(),h(n=>({...n,numInFlight:n.numInFlight-1,numDone:n.numDone+1})),i&&i({...n,result:t,stats:g})})}},[s,i,m,o,g]);const p=e(n=>{d.current.push(n),h(n=>({...n,numPending:n.numPending+1}))},[]);return{add:p,stats:g}}export{c as useRnAsyncQueue};
//# sourceMappingURL=use-rn-async-queue.module.js.map

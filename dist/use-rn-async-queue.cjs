var n=require("react");function e(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var t=/*#__PURE__*/e(require("next-tick"));exports.useRnAsyncQueue=e=>{const{done:u,drain:r,inflight:s,isPaused:c}=e;let{concurrency:i}=e;i<1&&(i=Infinity);const[l,o]=n.useState({numPending:0,numInFlight:0,numDone:0}),a=n.useRef(!0),m=n.useRef([]),g=n.useRef([]);n.useEffect(()=>{if(!c){if(l.numDone>0&&r&&0===m.current.length&&0===g.current.length&&!a.current)return a.current=!0,t.default(r);for(;m.current.length<i&&g.current.length>0;){a.current=!1;const n=g.current.shift();m.current.push(n),o(n=>({...n,numPending:n.numPending-1,numInFlight:n.numInFlight+1})),s&&s({...n,stats:l});const e=n.task();e.then(()=>{m.current.pop(),o(n=>({...n,numInFlight:n.numInFlight-1,numDone:n.numDone+1})),u&&u({...n,result:e,stats:l})}).catch(()=>{m.current.pop(),o(n=>({...n,numInFlight:n.numInFlight-1,numDone:n.numDone+1})),u&&u({...n,result:e,stats:l})})}}},[i,u,r,s,l]);const h=n.useCallback(n=>{g.current.push(n),o(n=>({...n,numPending:n.numPending+1}))},[]);return{add:h,stats:l}};
//# sourceMappingURL=use-rn-async-queue.cjs.map

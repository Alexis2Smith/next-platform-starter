'use client';

export default function Error({ reset }) {
  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#f5f8fc',color:'#071d3a',fontFamily:'Arial, sans-serif'}}>
      <div style={{maxWidth:520,textAlign:'center'}}>
        <div style={{fontSize:12,fontWeight:800,letterSpacing:'.12em',textTransform:'uppercase',color:'#1457d9'}}>Ascend AI NOW</div>
        <h2 style={{margin:'10px 0 8px'}}>Governance workspace needs a refresh.</h2>
        <p style={{margin:'0 0 18px',color:'#6d7b90',lineHeight:1.55}}>The Digital Headquarters could not load this governance view.</p>
        <button onClick={() => reset()} style={{minHeight:40,padding:'0 14px',border:0,borderRadius:9,background:'#1457d9',color:'white',fontWeight:700,cursor:'pointer'}}>Try again</button>
      </div>
    </div>
  );
}

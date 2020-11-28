export const setBackImage=(c,x,img)=>{

    for(let i=0;i<c.length;i++)
    {
    const b=document.getElementsByClassName('boxrow')[c[i][0]];
    const br=b.getElementsByClassName('box')[c[i][1]];
    br.innerHTML=`<img src=${img} name=${x[i]}></img>`
    br.style.border="";
   }
    const i= document.getElementsByTagName('img');
    for(let j=0;j<i.length;j++)
    {
        i[j].style.width='100%'
        
    }
}
export const resetBoxes = () =>
{
        var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
    const box=document.getElementsByClassName('box');
        for(let i=0;i<box.length;i++)
        {
            box[i].innerHTML=''
            box[i].style.border='';
            box[i].style.borderRadius=''
        }
}


export const gameStart = (nov,l,range) =>
{
    nov=nov[l-1];
    let x=[];
        let map = new Map();
        for(let i=0;i<nov;)
        {
            let v=Math.floor(Math.random() * range[l-1][1]); 
            if(!map.has(v)){
            map.set(v,1);
            x.push(v);
            i++;}
        }
        let c=[];
        map.clear()
        const m=[];
        for(let i=0;i<nov;)
        {
            let xc=Math.floor(Math.random() * 10);
            let yc=Math.floor(Math.random()*10);
            const t=xc+' '+yc
            console.log(typeof t);
            if(!map.has(t))
            {
                map.set(t,1);
                c.push([xc,yc]);
                i++;
            }
           
        }
    
        for(let i=0;i<nov;i++)
        {
            const b=document.getElementsByClassName('boxrow')[c[i][0]];
            const br=b.getElementsByClassName('box')[c[i][1]];
            console.log(c[i][0],c[i][1],x[i]);
            br.style.color='red';
            br.style.border='3px solid green';
            br.style.borderRadius='50%'
            br.innerHTML=`<div class='inside'>${x[i]}</div>`;
        }
        return {c,x};
}

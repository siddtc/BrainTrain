import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import   './module.MindTrainer.css';
import Button from '@material-ui/core/Button';
import img from './backimg.png'
import {setBackImage, resetBoxes, gameStart} from './logic'
export default class MindTrainer extends Component {
    state={
        level:1,
        arr:[],
        nov:[3,4,5,6,7,8,10,12,14,15],
        range:[],
        values:[],
        disabled:0,
        coordinates:[],
        count:0,
    }
    componentDidMount = ()=>{
        const arr=[];
        for(let i=0;i<10;i++)
        {
            const b=[];
            for(let j=0;j<10;j++)
            {
                b.push(1);
            }
            arr.push(b);
        }
        const range=[];
        let k=0;
        for(let i=0;i<10;i++)
        {
            range[i]=[1,k+7];
            k+=7;
        }
        this.setState({arr,range});
    }
    handleSlider=(e,nv)=>
    {
        if(nv!==this.state.level){
        this.setState({level:nv});
        resetBoxes()
        this.setState({disabled:0,count:0})
    }
    }
    verify=(e)=>
    {
        const v = e.target.name;
        const {coordinates,values,nov} =this.state;
        let {count,level} =this.state;
        const arr =[...values] ;
        arr.sort((a,b)=>a-b);
        if(v==arr[count])
        {
            console.log("yes");
            const k = values.indexOf(arr[count]);
            const b=document.getElementsByClassName('boxrow')[coordinates[k][0]];
            const br=b.getElementsByClassName('box')[coordinates[k][1]];
            br.style.color='red';
            br.style.border='3px solid green';
            br.style.borderRadius='50%'
            br.innerHTML=`<div class='inside'>${v}</div>`;
            count=count+1;
            if(count===nov[level-1])
            {
                level=level+1;
                this.setState({level,count:0});
                this.startGame(level)
            }
            else
            {
                this.setState({count});
            }
        }
      
        
    }
    startGame=(ll)=>
    {
        resetBoxes();
        let {nov,level,range} = this.state;
        if(Number.isInteger(ll))
        level=level+1;
        this.setState({level,count:0});
        const {c,x} = gameStart(nov,level,range);
        this.setState({coordinates:c,values:x})
        setTimeout(()=>
        setBackImage(c,x,img),level>=5?7000:2000)
        this.setState({disabled:1})
    }
    render() {
        const img = document.getElementsByTagName('img');
        img.onClick = (e)=>this.verify();
        const {arr,level,disabled} =this.state;
        return (
            <div className='container'>
                <div>
                    <h3>Choose a Level</h3>
                    <Slider
                    className='slider'
                    defaultValue={level}
                    value={this.state.level}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={this.handleSlider}
                />
                {!disabled?<Button variant="contained" color="primary" onClick={this.startGame}>
                    Start the Game!!!
                </Button>:
                <Button variant="contained" disabled>
                    Start the Game!!!
                </Button>
                }
                </div>
                 <div className='region'>
                 {arr.map((b,i)=>
                         <div className='boxrow' key={i}>
                             {b.map((v,j)=><div
                                          key={j}
                                         className='box'
                                         onClick={this.verify}
                                         >
                                         </div>
                             )}
                                     <br></br>
                         </div>
                 )}
             </div>
            </div>
        )
    }
}



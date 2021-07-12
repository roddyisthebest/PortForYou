import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import wifi from '../wifi';
import stack from './Stack';
const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    position:relative;
    padding:30px;
    margin-bottom:35px;
`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;

`

const Section = styled.h1`
    font-size:24px;
    font-weight: 500;
    margin-bottom:20px;
`

const Input= styled.input`
    border:none;
    border-radius: 10px;
    width:100%;
    height:50px;
    outline: none;
    background-color: #EDEDED;
    padding:10px;
    font-size:20px;
    color:rgba(0,0,0,0.5);
    font-weight:500;
    margin-bottom:20px;

`

const Stacks = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    position:relative;
    grid-gap: 15px;
`


const Button = styled.button`

    background-color: #EDEDED;
    width:100%;
    height:60px;
    border-radius: 20px;
    opacity:${props=> props.select ? "1":"0.34"};
`


const Project = ({data,setDetail,detail,stackData}) => 
    {   
        
        var someStack = []
        const deliVery=[];
        

        useEffect(()=>{
                data.map(e=>{
                    deliVery.unshift({
                        idx:e.idx,
                        content:e.content,
                        stack:e.stack,
                        title:e.title
                    })
                })
                setDetail(deliVery);
            return
        },[])
        
        
        const onChange = (event) => {
            
            const {value,name,id} = event.target;
            let copyDetail =[...detail];
            if(name=="P_TITLE"){
                copyDetail[id].title=value;
            }
            else if(name=="P_DESCRIPTION"){
                copyDetail[id].content=value;
            }
            
            setDetail(copyDetail);
        };

        const StackBtnHandler = (event) => {
            const grandFather=event.target.parentElement.parentElement.id;
            const selected = event.target.dataset.select;
            const selectedId = event.target.id;
            const value = event.target.innerHTML;
            let copyDetail =[...detail];
            console.log(copyDetail);
            if(selected!="true"){
                // copyDetail[grandFather].stack.push({       
                // });
                copyDetail[grandFather].stack.push({
                    idx:parseInt(selectedId),
                    name:value,
                    content:value
                });
                setDetail(copyDetail);

            }
            else{
                copyDetail[grandFather].stack=copyDetail[grandFather].stack.filter(e=>e.idx!=selectedId);
                setDetail(copyDetail);
            }
            copyDetail.map(e=>
                {
                    if(e.stack.length===0){
                        e.stack.push({
                            idx:7,
                            name:'etc',
                            content:"etc"
                        })
                    }
                    setDetail(copyDetail);
                })
            
        }
        return(
        <>
        {stackData&&detail&& detail.map((e,idx)=>
            <Container key={e.idx}>
                
            <SubTitle>Project{e.idx}</SubTitle>
            <Section>Title</Section>
            <Input value={e.title} type="text" name="P_TITLE" id={idx} onChange={onChange}/>
            <Section>Description</Section>
            <Input value={e.content} type="text" name="P_DESCRIPTION" id={idx} onChange={onChange}/>
            <Section>Stack</Section>
            <Stacks id ={idx}>
                
                {someStack=[],
                e.stack.map(e=>{
                    someStack.push(e.name);
                })}
                {stackData&&stackData.map(e=>
                    <Makecenter key={e.idx}>
                    <Button id ={e.idx} select={someStack.includes(`${e.name}`)} type="button" data-select={someStack.includes(`${e.name}`)} onClick={StackBtnHandler}>{e.name}</Button>
                </Makecenter>
                    )}
                
                
            </Stacks>

        </Container>)}
        
        </>
        )
    }


export default Project;
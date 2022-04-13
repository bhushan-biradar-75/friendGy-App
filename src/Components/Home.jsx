import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import './Home.css'

const Home = () => {

    const navigation = useNavigate()
    const [state, setState] = useState([])
    const [search , setsearch] = useState()

    function getdata() {
        axios.get("https://rickandmortyapi.com/api/character").then((res) => {
            setState(res.data.results)
        })
    }
    useEffect(() => {
        getdata()
    }, [])

    const push = (ele, ind) => {
        let char = localStorage.getItem("data")
        if (char == null) {
            var charobj = [];
        } else {
            charobj = JSON.parse(char);
        }
        charobj.push(ele);
        localStorage.setItem("data", JSON.stringify(charobj));
        navigation('/Link')
    }

    let a = JSON.parse(localStorage.getItem("data"))

    const filterdata = () => {
           setState(state.filter((ele)=>{
                if(
                    ele.name.toLowerCase() === search.toLowerCase() || ele.gender.toLowerCase() === search.toLowerCase() || ele.status.toLowerCase() === search.toLowerCase() || ele.species.toLowerCase() === search.toLowerCase() 
                ){
                    console.log(ele)
                    return ele;
                }
            }))
    }

    return (
        <div>
             <div className="container">
             <div className="search-menu">
                <b><button className='btn-dark mx-3' id="blue-btn" onClick={filterdata} >Search</button></b>

                <input className='form-control' id='search-box' onChange={(event) => setsearch(event.target.value)} style={{ border: "2px solid black" , width:'auto' }} type="search" placeholder='search-details' />
                </div>
                </div>
                <div className='row'>
                {
                    state.map((ele, ind) => {

                        return <>
                            <div className="flip-card p-3 m-2">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={ele.image} />
                                    </div>
                                    <div className="flip-card-back">
                                        <h2>Name:{ele.name}</h2>
                                        <hr />
                                        <h3>gender:{ele.gender}</h3>
                                        <h5>species:{ele.species}</h5>
                                        <h6>stauts:{ele.status}</h6>
                                        <hr />
                                        <button className='btn btn-dark' onClick={()=>push(ele,ind)}>Like</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                }
                </div>
            </div>
    )
}

export default Home
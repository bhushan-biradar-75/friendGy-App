import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import './Home.css'

const Home = () => {

    const navigation = useNavigate()
    const [state, setState] = useState([])
    const [search, setsearch] = useState()

    function getdata() {
        axios.get("https://rickandmortyapi.com/api/character").then((res) => {
            setState(res.data.results)
        })
    }
    useEffect(() => {
        getdata()
    }, [])

    //   seting data in local storage  

    const push = (ele) => {
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

    // filtering data

    const filterdata = (event) => {
        event.preventDefault()
        setState(state.filter((ele) => {
            if (
                ele.name.toLowerCase() === search.toLowerCase() || ele.gender.toLowerCase() === search.toLowerCase() || ele.status.toLowerCase() === search.toLowerCase() || ele.species.toLowerCase() === search.toLowerCase()
            ) {
                return ele;
            }
        }))
    }

    return (
        <div>
            <div className="container">
                <h4><marquee><b>friendGy make your friends now hurry...!</b></marquee></h4>
                <form class="d-flex">
                    <input onChange={(event) => setsearch(event.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={filterdata} class="btn btn-light" type="submit">Search</button>
                </form>
            </div>
            <div className='row'>
                {
                    state.map((ele) => {

                        return <>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={ele.image} />
                                    </div>
                                    <div className="flip-card-back">
                                        <h5 className='mt-3'>NAME - <b>{ele.name}</b></h5>
                                        <hr />
                                        <h6>GENDER - <b>{ele.gender}</b></h6>
                                        <p>SPECIES - <b>{ele.species}</b></p>
                                        <p>STATUS - <b>{ele.status}</b></p>
                                        <hr />
                                        <button className='btn btn-dark' onClick={() => push(ele)}>Like</button>
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
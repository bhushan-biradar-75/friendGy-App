import React from 'react'
import './Link.css'


const Link = () => {

    const [state, setState] = React.useState(JSON.parse(localStorage.getItem('data')))
    const [search, setsearch] = React.useState()

    console.log(state)

    let localStoragedata = JSON.parse(localStorage.getItem('data'))

    console.log(localStoragedata)

    const del = (data) => {

        const getlocstrdata = localStorage.getItem('data')
        if (getlocstrdata) {
            const likedarray = JSON.parse(getlocstrdata)
            const filterarray = likedarray.filter((ele) => ele.id !== data.id);
            localStorage.setItem('data', JSON.stringify(filterarray));
            alert("confirm")
            window.location.reload();
        }
    }

    const filterdata = () => {
        setState(state.filter((ele) => {
            if (
                ele.name.toLowerCase() === search.toLowerCase() || ele.gender.toLowerCase() === search.toLowerCase() || ele.status.toLowerCase() === search.toLowerCase() || ele.species.toLowerCase() === search.toLowerCase()
            ) {
                console.log(ele)
                return ele;
            }
        }))
    }

    return (
        <div>
            <div className="search-menu">
                <b><button className='btn-dark mx-3' id="blue-btn" onClick={filterdata} >Search</button></b>

                <input className='form-control' id='search-box' onChange={(event) => setsearch(event.target.value)} style={{ border: "2px solid black", width: 'auto' }} type="search" placeholder='search-details' />
            </div>

            <div className="row">
                {
                    localStoragedata.map((localStoragedata, ind) => {

                        return <>
                            <div className="flip-card p-2 m-2">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={localStoragedata.image} />
                                    </div>
                                    <div className="flip-card-back">
                                        <h2>Name:{localStoragedata.name}</h2>
                                        <hr />
                                        <h3>gender:{localStoragedata.gender}</h3>
                                        <h5>species:{localStoragedata.species}</h5>
                                        <h6>stauts:{localStoragedata.status}</h6>
                                        <hr />
                                        <button className='btn btn-danger' onClick={() => del(localStoragedata)}><h4>Hate @ me</h4></button>
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

export default Link
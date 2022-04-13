import React from 'react'


const Link = () => {

    const [state, setState] = React.useState(JSON.parse(localStorage.getItem('data')))
    const [search, setsearch] = React.useState()

    let localStoragedata = JSON.parse(localStorage.getItem('data'))

    // Delete Function

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

    // filter function

    const filterdata = () => {
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
                <form class="d-flex">
                    <input onChange={(event) => setsearch(event.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={filterdata} class="btn btn-light" type="submit">Search</button>
                </form>
            </div>
            <div className="row">
                {
                    state.map((localStoragedata) => {

                        return <>
                            <div className="flip-card p-2 m-2">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={localStoragedata.image} />
                                    </div>
                                    <div className="flip-card-back">
                                    <h5 className='mt-3'>NAME - <b>{localStoragedata.name}</b></h5>
                                        <hr />
                                        <h6>GENDER - <b>{localStoragedata.gender}</b></h6>
                                        <p>SPECIES - <b>{localStoragedata.species}</b></p>
                                        <p>STATUS - <b>{localStoragedata.status}</b></p>
                                        <hr />
                                        <button className='btn btn-danger' onClick={() => del(localStoragedata)}><h6><b>Dislike</b></h6></button>
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
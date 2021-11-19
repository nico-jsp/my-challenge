import React, { useState, useEffect } from 'react'
import style from "./formulario.css"




const Formulario = () => {

    // Initial State

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [ssn, setSsn] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [fail, setFail] = useState(false);
    const [bottonAvtive, setBotonActive] = useState(false)
    const [fieldsUsed, setFieldsUsed] = useState(0)
    const [token, setToken] = useState('')


    const urlAuth = 'http://localhost:8081/auth';
    const urlMembers = 'http://localhost:8081/api/members';
    const url = 'http://localhost:8081';


    const axios = require('axios');

    useEffect(async () => {

        const token1 = await axios.post(urlAuth, { "username": 'sarah', "password": 'connor' })

        setToken(token1.data.token)


        await axios.get(urlMembers, undefined, { "Authorization": ('Bearer' + token) })
            .then(response => console.log(response))

    }, [])



    const handleName = (e) => {
        setName(e.target.value);
        if (!name.trim()) {
            setFieldsUsed((fieldsUsed + 1))

        }


        if (fieldsUsed > 3) {
            setBotonActive(true)
        }
        if (fieldsUsed < 3) {
            setBotonActive(false)
        }
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
        if (!lastName.trim()) {
            setFieldsUsed((fieldsUsed + 1))

        }


        if (fieldsUsed > 3) {
            setBotonActive(true)
        }
        if (fieldsUsed < 3) {
            setBotonActive(false)
        }
    }



    const handleAddress = (e) => {
        setAddress(e.target.value);
        if (!address.trim()) {
            setFieldsUsed((fieldsUsed + 1))

        }

        if (fieldsUsed > 3) {
            setBotonActive(true)
        }
        if (fieldsUsed < 3) {
            setBotonActive(false)
        }

    }



    const handleSSN = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 9);

        console.log(input)
        console.log(e.target.value)
        const first = input.substring(0, 3);
        const middle = input.substring(3, 5);
        const last = input.substring(5, 9);
        console.log(first)
        console.log(middle)
        console.log(last)
        if (input.length > 5) {
            setSsn(`${first}-${middle}-${last}`)
        }
        else if (input.length > 3) {
            setSsn(`${first}-${middle}`)
        }
        else if (input.length >= 0) {
            setSsn(input)
        }
        if (!ssn.trim()) {
            setFieldsUsed((fieldsUsed + 1))

        }

        if (fieldsUsed > 3) {
            setBotonActive(true)
        }
        if (fieldsUsed < 3) {
            setBotonActive(false)
        }

    }

    const handleReset = () => {
        setName('')
        setLastName('')
        setAddress('')
        setSsn('')
        setFieldsUsed(0)
        setFail(false)
        setBotonActive(false)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(name)
        console.log(lastName)
        console.log(address)
        console.log(ssn)

        if (!name.trim()) {
            setFail(true)
            setError('Please introduce a First Name');
            return;
        }

        if (!lastName.trim()) {
            setFail(true)
            setError('Please introduce a Last Name');
            return;
        }

        if (!address.trim()) {
            setFail(true)
            setError('Please introduce an Address');
            return;
        }

        if (ssn.length < 11) {
            setFail(true)
            setError('Please introduce a valid SSN');
            return;
        }

        const duplicated = list.findIndex((i) => i.ssn === ssn)
        if (duplicated !== -1) {
            setFail(true)
            setError('Duplicate SSN');
            return;
        }



        const user = {
            name,
            lastName,
            address,
            ssn

        }

        await axios.post(urlMembers, undefined, { "Authorization": ('Bearer' + token), user })
            .then(response => console.log(response))
            .catch(response => console.log(response))

        setFail(true)
        setList([...list, user])
        setName('')
        setLastName('')
        setAddress('')
        setSsn('')
        setFieldsUsed(0)
        setBotonActive(false)
        setError('')
    }

    return (

        <div className="formulario">
            <h2>Formulario</h2>
            <div>
                <header className="header">
                    <button className="headerButton">
                        Home
                    </button>
                    <button className="headerButton">
                        Other Page
                    </button>
                </header>
                <body className="formulario-body">
                    <div className="formulario-column">
                        <div>
                            {
                                fail ? (
                                    <span style={{ color: 'red' }}>{error}</span>
                                ) :
                                    (
                                        <span></span>
                                    )
                            }
                            <form >
                                <div>
                                    <input
                                        name='name'
                                        type="text"
                                        placeholder="First Name"
                                        onChange={handleName}
                                        value={name}
                                    />
                                </div>
                                <div>
                                    <input
                                        name='lastName'
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={handleLastName}
                                        value={lastName}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        onChange={handleAddress}
                                        value={address}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="ssn"
                                        type="numeric"
                                        placeholder="SSN"
                                        onChange={handleSSN}
                                        value={ssn}
                                    />
                                </div>
                                <button type="primary" onClick={() => handleReset()}>
                                    Reset
                                </button>
                                <button type="primary" onClick={(e) => handleSubmit(e)} disabled={!bottonAvtive} type="submit">
                                    Save
                                </button>
                            </form>

                        </div>
                    </div>


                    <div className="formulario-column2">
                        <div className="formulario-column22">

                            First Name
                            {
                                list.map(i => (
                                    <div >{i.name}
                                    </div>
                                ))

                            }
                        </div>
                        <div className="formulario-column22">

                            Last Name
                            {
                                list.map(i => (
                                    <div >{i.lastName}
                                    </div>
                                ))

                            }
                        </div>
                        <div className="formulario-column22">

                            Address
                            {
                                list.map(i => (
                                    <div >{i.address}
                                    </div>
                                ))

                            }
                        </div>
                        <div className="formulario-column22">

                            SSN
                            {
                                list.map(i => (
                                    <div>{i.ssn}
                                    </div>
                                ))

                            }
                        </div>

                    </div>

                </body>
                <footer >
                    <div className="footer">
                        <div >
                            copyright
                        </div>
                        <div >
                            All right reserved
                        </div>
                    </div>

                </footer>

            </div>
        </div >
    )
}

export default Formulario;

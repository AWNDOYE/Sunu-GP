import React, { useState } from 'react';
import axios from "axios"
import {Link}  from "react-router-dom"
import Config from "../../Services/Config.json"

const SignIn = () => {
    const [data, setData] = useState({ userEmail: '', userPassword: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const url = `${config.api_url}/signin`;
            // const { data: response } = await Instance.post(url, data);
            const {data : response} = await axios.post(`${Config.api_url}/signIn`,data)
            // await axios.post('http://localhost:5000/api/signIn',data)
            if (response) {
                const user = response.userActif;
                console.log(response.token);
                if (user) {
                    localStorage.setItem("token", response.token);
                    // localStorage.setItem("user", JSON.stringify(user));
                    // Stocker l'heure d'expiration du token
                    // const expiresIn = 86400; // 1 jour en secondes
                    // const expirationTime = new Date().getTime() + expiresIn * 1000;
                    // localStorage.setItem("tokenExpiration", expirationTime);
                    window.location = "/home";
                }
            } else {
                setError("Réponse invalide du serveur");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error);
        }
    };

    return (
        <div className='layout-signin'>
            <h1>Connexion</h1>
            <div className='form-signin'>
                <form onSubmit={handleSubmit}>
                    <div className='parent-form-input'>
                        <label htmlFor='userEmail'>Email:</label>
                        <input
                            className='userEmail'
                            type='userEmail'
                            name='userEmail'
                            id='userEmail'
                            value={data.userEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='parent-form-input'>
                        <label htmlFor='userPassword'>Mot de passe:</label>
                        <input
                            className='input'
                            type='userPassword'
                            name='userPassword'
                            id='userPassword'
                            value={data.userPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} className='btn-form-connection' id='btn-signin'>
                        Se connecter
                    </button>
                </form>

                <div className='container-right-signin'>
                    <div className='card-title-signup sign-in'>
                        <p id='new-user'>Vous N’avez pas de compte ? </p>
                        <Link className='btn-form-connection' to='/signup'>
                            Inscrivez-vous
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                {error && <h1 style={{ color: 'red' }}>{error.response.data.message}</h1>}
            </div>
        </div>
    );
};

export default SignIn;
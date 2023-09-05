import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const LOGIN_QUERY = gql`
query Query($email: String!, $password: String!) {

loginUser(email: $email, password: $password) {
  token
  findMyUser {
    id
    firstName
    lastName
    email
    password
  }
}
}
`;

function Login() {
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const handler = (e:any) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const { loading, error, refetch } = useQuery(LOGIN_QUERY, {
        variables: { email: "", password: "" },
        skip: true, // Initially, skip the query
    });

    const submitData = async () => {
        const { email, password } = state;

        // Validation checks
        if (email === "") {
            setEmailMessage("Email field is required");
            return;
        } else {
            setEmailMessage("");
        }

        if (password === "") {
            setPasswordMessage("Password field is required");
            return;
        } else {
            setPasswordMessage("");
        }

        // Execute the GraphQL query when the button is clicked
        try {
            const { data } = await refetch({ email, password });

            // Handle the query result
            if (loading) return <p>Loading...</p>;
            if (error) return <pre>{error.message}</pre>;

            const user = data ? data.loginUser.findMyUser : null;
            console.log(user);

            // Implement the logic for handling the query result here
            if (user) {
                localStorage.setItem("email", user.email);
                localStorage.setItem("token",data.loginUser.token);
             if(data.loginUser.token){
                navigate("/product");
             }
            } else {
                alert("Try Again with correct credentials");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while logging in. Please try again.");
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center'>Login Here</h1>
                    <div className='col-sm-8 col-md-8 mx-auto'>
                        Email:<input
                            type="email"
                            name="email"
                            className='form-control my-3'
                            placeholder="Your Email Id"
                            value={state.email}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{emailMessage}</div>
                        Password:<input
                            type="password"
                            name="password"
                            className='form-control my-3'
                            placeholder="Your Password"
                            value={state.password}
                            onChange={handler}
                        />
                        <div style={{ color: "red" }}>{passwordMessage}</div>
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={submitData}
                        >Login</button>
                        <span style={{ paddingLeft: "40px" }}>If you don't have an account, please <Link to="/register">Register</Link></span>
                        <span style={{ paddingLeft: "40px" }}>Forgot your password? <Link to="/reset">Reset it</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

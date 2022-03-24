import './App.css';
import { ChakraProvider, useToast } from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useCookies} from 'react-cookie';


import UserService from "./services/user.service";
import Users from "./pages/users";
import NotFound from "./pages/Not-Found";

export const AuthContext = React.createContext();

function App() {
    const toast = useToast();
    const [user, setUser] = useState(null);

    const [cookie, setCookie] = useCookies(['user']);

    useEffect(() => {
        if(!user) {
            if(cookie.user) {
                setUser(cookie.user);
            }
        }
        UserService.fetchLoggedInUserDetails()
            .then(res => {
                setCookie('user', res.data);
                setUser(res.data);
            })
            .catch((error) => toast({
                title: 'Some Error Occured',
                description: `${error.response.data.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            }))
    },[])



  return (
    <ChakraProvider>
        <AuthContext.Provider value={{user}}>
            <div className='App'>
                <Router>
                <Routes>
                    {user && <Route path={'/'} element={<Users />} />}
                    <Route path={'/not-found'} element={<NotFound />}/>
                    <Route path={'*'} element={<NotFound />}/>
                </Routes>
                </Router>
            </div>
        </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;

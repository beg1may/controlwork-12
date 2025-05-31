import {Container, CssBaseline, Typography} from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import NewGroup from "./features/group/NewGroup.tsx";

function App() {

  return (
    <>
        <CssBaseline/>
        <ToastContainer/>
        <header>
            <AppToolbar/>
        </header>
        <main>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/groups/new" element={<NewGroup />}/>
                    <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
  )
}

export default App

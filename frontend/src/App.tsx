import {Container, CssBaseline, Typography} from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import NewGroup from "./features/group/NewGroup.tsx";
import Group from "./features/group/Group.tsx";
import FullGroup from "./features/group/FullGroup.tsx";
import UserGroup from "./features/group/UserGroup.tsx";

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
                    <Route path="/" element={<Group />}/>
                    <Route path="/groups/new" element={<NewGroup />}/>
                    <Route path="/groups/:id" element={<FullGroup />}/>
                    <Route path="/groups/user/:id" element={<UserGroup />} />
                    <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
  )
}

export default App

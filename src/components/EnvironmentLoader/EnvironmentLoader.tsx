import { Route, Routes } from "react-router-dom"
import Home from "../../Pages/Home/Home"
import Admin from "../../Pages/Admin/Admin"
import NotFound from "../../Pages/NotFound/NotFound"
import Login from "../../Pages/Login/Login"
import Users from "../../Pages/Admin/Users/Users"

const EnvironmentLoaderInternal = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin children={<Users />} />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )

}


const EnvironmentLoader = () => {
    return (
        <EnvironmentLoaderInternal />
    )
}

export default EnvironmentLoader;
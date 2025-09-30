import { Route, Routes } from "react-router-dom"
import Home from "../../Pages/Home/Home"
import Admin from "../../Pages/Admin/Admin"
import NotFound from "../../Pages/NotFound/NotFound"

const EnvironmentLoaderInternal = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
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
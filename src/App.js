import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { publicRoutes, privateRoutes } from "./routes";

function App() {
    const { currentUser } = useContext(AuthContext);
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, key) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={key}
                            path={route.path}
                            element={<Page />}
                        ></Route>
                    );
                })}

                {currentUser &&
                    privateRoutes.map((route, key) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                element={<Page />}
                            ></Route>
                        );
                    })}
            </Routes>
        </Router>
    );
}

export default App;

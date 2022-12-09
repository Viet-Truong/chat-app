import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

function App() {
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
            </Routes>
        </Router>
    );
}

export default App;

import { Sidebar } from "./components/molecules/Sidebar/Sidebar.tsx";
import { Main } from "./components/molecules/Main/Main.tsx";

function App() {
    return (
        <>
            <Sidebar />
            <Main />
            <div className="material-symbols-outlined">menu</div>
        </>
    );
}

export default App;

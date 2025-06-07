import { Main } from "./components/molecules/Main/Main.tsx";
import { Logo } from "./components/atoms/Logo/Logo.tsx";

function App() {
    return (
        <div className="h-dvh pt-8">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <Logo />
                <span>
                    The best note-taking app to use on{" "}
                    <span className="text-red-400">
                        {new Date().toLocaleString("en-us", {
                            weekday: "long",
                        })}
                        s
                    </span>
                </span>
            </div>
            <Main />
        </div>
    );
}

export default App;

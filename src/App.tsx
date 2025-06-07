import { Main } from "./components/molecules/Main/Main.tsx";
import { Logo } from "./components/atoms/Logo/Logo.tsx";
import { SessionRefresh } from "./components/molecules/SessionRefresh/SessionRefresh.tsx";

function App() {
    return (
        <div className="h-dvh sm:pt-8">
            <SessionRefresh />
            <div className="w-full flex flex-col items-center justify-center gap-4 pt-8 sm:pt-0">
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

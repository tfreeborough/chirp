import logo from "./chirp.svg";
export const Logo = () => {
    return (
        <img
            style={{ width: 48, height: 48 }}
            src={logo}
            title="Cheep Cheep! I'm a bird"
        />
    );
};

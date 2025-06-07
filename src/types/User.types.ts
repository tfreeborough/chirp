export interface Location {
    city: string;
    postcode: string | number;
    state: string;
    street: string;
}

export interface User {
    email: string;
    birthdate: number;
    first_name: string;
    last_name: string;
    title: string;
    phone_number: string;
    gender: string;
    location: Location;
    username: string;
}

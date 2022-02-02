export interface Departmens {
    id: number;
    name: string;
}

export interface Cities {
    id: number;
    DepartmensId: number;
    name: string;
}

export interface Barrios {
    CitiesId: number;
    name: string;
}
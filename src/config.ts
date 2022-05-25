import dotenv from "dotenv";
dotenv.config();



interface EnvVars{
    PORT: string,
    NODE_ENV: string,
    PGPASSWORD: string,
    PGPORT: number,
    PGUSER: string,
    PGDATABASE: string,
    PGHOST: string

}

export const config:EnvVars = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    PGPORT: +process.env.PGPORT,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST
}


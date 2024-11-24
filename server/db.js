import pkg from "pg";
const { Pool } = pkg;

const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perntodo',
    password: 'Muanna12.',
    port: 5432,
})

export {pool};
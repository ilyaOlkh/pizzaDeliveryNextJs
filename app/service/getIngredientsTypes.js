import { sql } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely';

export default async function getIngredientsTypes() {
    let types = await query()
    return types.map(type => {
        return type.i_type
    })
}

async function query() {
    const db = createKysely({ connectionString: process.env.POSTGRES_URL });
    let query = db
        .selectFrom('ingredient')
        .select([
            sql`distinct i_type`,
        ])
    try {
        const result = await query.execute();
        return result
    } catch (err) {
        console.error('помилка:', err);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};
import { sql } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely';

export default async function getProductTypes() {
    let types = await query()
    return types.map(type => {
        return type.p_type
    })
}

async function query() {
    const db = createKysely({ connectionString: process.env.POSTGRES_URL });
    let query = db
        .selectFrom('product')
        .select([
            sql`distinct product.p_type`,
        ])
    try {
        const result = await query.execute();
        return result
    } catch (err) {
        console.error('Помилка:', err);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

'use server'
import { createKysely } from '@vercel/postgres-kysely';
import { sql } from 'kysely'


export default async (type) => {
    const db = createKysely({ connectionString: process.env.POSTGRES_URL });

    let query = db
        .selectFrom('ingredient')
        .leftJoin('composition', 'composition.ingredient_id', 'ingredient.ingredient_id')
        .leftJoin('product', 'product.product_id', 'composition.product_id')
        .select([
            'i_type',
            sql`STRING_AGG(DISTINCT i_name, ', ')`.as('i_name')
        ])
        .groupBy('i_type');

    if (type) {
        query = query.where('p_type', '=', type);
    }
    try {
        const result = await query.execute();
        return result
    } catch (err) {
        console.error('помилка:', err);

        return []; // Возвращаем пустой массив в случае ошибки
    }
};

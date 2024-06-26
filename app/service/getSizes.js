'use server'
import { createKysely } from '@vercel/postgres-kysely';

export default async (id) => {
    const db = createKysely({ connectionString: process.env.POSTGRES_URL });
    let query = db
        .selectFrom('product')
        .innerJoin('pizzadetails', 'pizzadetails.product_id', 'product.product_id')
        .select([
            'pizzadetails.id',
            'pizzadetails.size_cm',
            'pizzadetails.weight_g',
            'pizzadetails.price',
        ])

    if (id) {
        query = query.where('product.product_id', '=', +id);
    } else (
        console.log('Помилка!')
    )
    try {
        const result = await query.execute();
        return result
    } catch (err) {
        console.error('Помилка:', err);

        return []; // Возвращаем пустой массив в случае ошибки
    }
};
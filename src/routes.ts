import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,         //Desestruturação
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();  //Início da transação

    const insertedIds = await trx('points').insert({  //retorna os ids dos dados inseridos
        image: 'image-fake',                          //usamos trx no lugar de knox para colocar o comando em uma transação
        name,
        email,
        whatsapp,
        latitude,              //Short-sintax
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];
    const pointItems = items.map((item_id: number) => {
        return {
            item_id: item_id,
            point_id
        }
    });

    await trx('point_items').insert(pointItems);

    return response.json({ success: true });
});


export default routes;
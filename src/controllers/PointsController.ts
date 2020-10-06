import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'point not found.' })
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
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

        const point = {
            image: 'https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,              //Short-sintax
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point); //retorna os ids dos dados inseridos
        //usamos trx no lugar de knox para colocar o comando em uma transação
        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id: item_id,
                point_id
            }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit();  //concluir a transação

        return response.json({
            point_id,
            ...point        //spread-operator
        });
    }
}

export default new PointsController(); 
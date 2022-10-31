import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const responseCartao = await axios.get('http://localhost:8001/api/cartao');
    const responseViagens = await axios.get('http://localhost:8001/api/viagem');
    const responseRecarga = await axios.get('http://localhost:8001/api/recarga');

    const info = {
        cartoes: responseCartao.data,
        viagens: responseViagens.data,
        recargas: responseRecarga.data
    }
    res.status(200).json(info);
}

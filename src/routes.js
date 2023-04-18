import { Router } from "express";
import {createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa ,deletePessoa } from './Controller/Pessoa.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api rodando"
    })
})

router.get('/pessoas', selectPessoas);
router.get('/pessoa', selectPessoa);
router.post('/pessoa', insertPessoa);
router.post('/pessoa', updatePessoa);
router.post('/pessoa', deletePessoa);

export default router;
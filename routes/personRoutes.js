const router = require('express').Router()

const Person = require('../models/Person')

//CREATE - Criação de dados
router.post('/', async (req, res) =>{
    //req.body
    //{name: "Isabel", salary: 3000, approved: false}
    //distructor
    const{name, salary, approved} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatorio!'})
        return
    }

    const person = {
        name,
        salary,
        approved,
    }

    try {
        
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sitema com sucesso!'})

    } catch (error) {
        // nem sempre é a melhor alternativa
        res.status(500).json({error: error})
    }
})

// READ - Leitura de dados
router.get('/', async (req, res) => {
    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        // nem sempre é a melhor alternativa
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    //extrair dado da requisição, pela url  req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id})

        if(!person){
            res.status(422).json({message: 'Usuario não encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        // nem sempre é a melhor alternativa
        res.status(500).json({ error: error })
    }
})

//UPDATE - atualização de dados (PUT, PATCH) PUT espera a model inteira pra alterar o patch pode ser parcial
router.patch('/:id', async (req, res) => {
    //extrair dado da requisição, pela url  req.params
    const id = req.params.id

    const{name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'Usuario não encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        // nem sempre é a melhor alternativa
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    //extrair dado da requisição, pela url  req.params
    const id = req.params.id

    const person = await Person.findOne({ _id: id})

    if(!person){
        res.status(422).json({message: 'Usuario não encontrado!'})
        return
    }

    try {
        
        await Person.deleteOne({ _id: id})

        res.status(200).json({message: 'Usuário removido com sucesso!'})

    } catch (error) {
        // nem sempre é a melhor alternativa
        res.status(500).json({ error: error })
    }
})


module.exports = router

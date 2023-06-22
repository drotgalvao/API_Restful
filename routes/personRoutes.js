const router = require("express").Router();

const Person = require("../models/Person"); // importa o model Person

router.post("/", async (req, res) => {
  // rota para criar uma nova pessoa
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "Nome é obrigatório!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person); // cria uma nova pessoa no banco de dados

    res.status(201).json({ message: "Pessoa criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// read - leitura de dados

router.get("/", async (req, res) => {
  // rota para ler todas as pessoas
  try {
    const people = await Person.find(); // busca todas as pessoas no banco de dados

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // rota para ler uma pessoa pelo id
  const { id } = req.params;

  try {
    const person = await Person.findById(id); // busca uma pessoa no banco de dados pelo id

    if (!person) {
      res.status(404).json({ error: "Pessoa não encontrada!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  // rota para atualizar uma pessoa pelo id
  const { id } = req.params;
  const { name, salary, approved } = req.body;

  try {
    const person = await Person.findById(id); // busca uma pessoa no banco de dados pelo id

    if (!person) {
      res.status(404).json({ error: "Pessoa não encontrada!" });
      return;
    }

    if (name) {
      person.name = name;
    }

    if (salary) {
      person.salary = salary;
    }

    if (approved) {
      person.approved = approved;
    }

    await person.save(); // salva a pessoa atualizada no banco de dados

    res.status(200).json({ message: "Pessoa atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - deletar dados
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const person = await Person.findByIdAndRemove(id);
  
      if (!person) {
        return res.status(404).json({ error: "Pessoa não encontrada!" });
      }
  
      return res.status(200).json({ message: "Pessoa deletada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;

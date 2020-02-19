const express = require('express')

// access the database

const db = require('../data/dbConfig')

const router = express.Router();


//GET

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.status(200).json(cars)
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).json({message: 'There was an error fetching the list'})

  })
})

// GET by id
router.get('/:id', (req,res) => {
  db('cars')
  .where({id: req.params.id})
  .then(car => {
    res.status(200).json(car)
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({message: 'There was an error retrieving that car\'s information'})

  })
})

// GET by vin
router.get('/:vin', (req, res) => {
  db('cars')
  .where({id: req.params.vin})
  .then(car => {
    res.status(200).json(car)
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({message: 'There was an error retrieving that car\'s information'})

  })

})

//POST new Car

router.post('/', validateCar, (req, res) => {
  const body = req.body
  db('cars')
  .insert(body)
  .then(car => {
    console.log
    db('cars')
    .where('id', car[0])
    .then(result => {
        console.log(result)
        res.status(201).json({created: result})
    })
    .catch(err => {
        console.log(err.message);
        res.status(550).json({message: 'Record inserted, but cannot retrieve'})

    })
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({message: 'There was an error adding the record'})

    })
})

// PUT - update car info

router.put('/:id', validateID, validateCar, (req, res) => {
  const body = req.body
  db('cars')
  .update(body)
  .where({id: req.params.id})
  .then(updated => {
      db('cars')
      .where({id: req.params.id})
      .then(car => {
          res.status(200).json({message: 'Updated' , car})
      })
      .catch(err => {
          console.log(err.message);
          res.status(500).json({message: 'Record updated, but cannot retrieve'})

      })
  })
  .catch(err => {
      console.log(err.message);
      res.status(500).json({message: 'There was an error updating the record'})
  })
})

// DELETE car

router.delete('/:id', validateID, (req, res) => {
  db('accounts')
  .where({id: req.params.id})
  .del()
  .then(deleted => {
      res.status(200).json({message: 'Record Deleted'})
  })
  .catch(err => {
      console.log(err.message);
      res.status(500).json({message: 'There was an error deleting the record'})
  })
})


// MIDDLEWARE

// Validate ID when used as parameter

function validateID(req, res, next) {
  console.log(typeof req.params.id, req.params.id);

  db('accounts')
  .where({id: req.params.id})
  .first()
    .then(account => {
        console.log(account)
      if (!account) {
        res.status(400).json({ message: 'Invalid ID' });
      } else {
        req.user = req.params.id;
        next();
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ message: 'Error validating ID' });
    });
}

// Validate body on create new car request

function validateCar(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing action data!' });
  } else if (!req.body.make) {  // could we put (!req.body.make || !req.body.make.length) to make sure that they didn't just include the field with no value?
    res.status(400).json({ message: 'Missing required "make" field!' });
  } else if (!req.body.model) {
    res.status(400).json({ message: 'Missing required "model" field!' });
  } else if (!req.body.mileage) {
    res.status(400).json({message: 'Missing required "mileage" field!'})
  } else if (!req.body.vin) {
    res.status(400).json({message: 'Missing required "vin" field!'})
  } else {
    next();
  }
}




module.exports = router
const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Error retrieving posts'})
        })
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({message: 'Must provide title & contents for post.'})
    }

    db.insert(req.body)
        .then(post => {
            res.status(201).json({data: post})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Database error.'})
        })
})

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            res.status(200).json({data: post});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Database error.'});
        })
})

router.delete('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            db.remove(req.params.id)
                .then(post => {
                    res.status(200).json({data: post});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Database error.'});
                })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'Post not found.'})
        })
    
})

router.put('/:id', (req, res) => {
    if (!req.body.title || !req.body.contents){
        return res.status(400).json({message: 'Must provide title and contents.'})
    }

    db.findById(req.params.id)
    .then(post => {
        db.update(req.params.id, req.body)
            .then(post => {
                res.status(200).json({data: post});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: 'Database error.'});
            })
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({message: 'Post not found.'})
    })

})
router.post('/:id/comments', (req, res) => {
    if (!req.body.text) return res.status(400).json({message: 'Please provide text'});

    db.findById(req.params.id)
        .then(post => {
            db.insertComment(req.body)
                .then(comment => {
                    res.status(201).json({data: comment});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Database error.'});
                })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'Post not found'});
        })
})

router.get('/:id/comments', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            db.findPostComments(req.params.id)
                .then(comments => {
                    res.status(200).json({data: comments});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Database error'});
                })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'Post not found.'});
        })
})

module.exports = router;
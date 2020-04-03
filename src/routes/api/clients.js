const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const files = require('../../files');

//Get a single file
router.get('/:id', (req, res) => {
  const found = files.some(file => file.id === parseInt(req.params.id));

  if (found) {
    res.json(files.filter(file => file.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No files with the id of ${req.params.id}` });
  }
});

//Create file
router.post('/', (req, res) => {
  const newFile = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    file: req.body.file
  };

  if (!newFile.name || !newFile.email || !newFile.file) {
    res.status(400).json({ msg: 'Please Include name,email and file' });
  }
  //Save in the files
  files.push(newFile);
  res.json(newFile);
});

//Update source object by client or any changes;
router.put('/:id', (req, res) => {
  const found = files.some(file => file.id === parseInt(req.params.id));
  if (found) {
    const updSrc = req.body;
    files.forEach(fileObject => {
      if (fileObject.id === parseInt(req.params.id)) {
        fileObject.name = updSrc.name ? updSrc.name : fileObject.name;
        fileObject.email = updSrc.email ? updSrc.email : fileObject.email;
        fileObject.file = updSrc.file ? updSrc.file : fileObject.file;
        if (updSrc.file) {
          fileObject.status = 'File has been resubmitted';
        }
        res.json({ msg: 'Data for your file has been submitted successfully ', fileObject });
      }
    });
  } else {
    res.status(400).json({
      msg: `File has been removed by the user or there is no file with the id ${req.params.id}`
    });
  }
});

module.exports = router;

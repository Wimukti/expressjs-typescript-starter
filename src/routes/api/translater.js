const express = require('express');
const router = express.Router();
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

//Get all files
router.get('/', (req, res) => {
  res.json(files);
});

//Update src file with transalated file;
router.put('/:id', (req, res) => {
  const found = files.some(file => file.id === parseInt(req.params.id));
  if (found) {
    const updFile = req.body;
    files.forEach(fileObject => {
      if (fileObject.id === parseInt(req.params.id)) {
        fileObject.translatedFile = updFile.translatedFile
          ? updFile.translatedFile
          : fileObject.translatedFile;
        res.json({ msg: 'Translated file has been submitted successfully ', fileObject });
      }
    });
    res.json(files.filter(file => file.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `File has been removed by the user or there is no file with the id ${req.params.id}`
    });
  }
});

module.exports = router;

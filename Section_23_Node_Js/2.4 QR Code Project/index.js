import inquirer from 'inquirer';
import qr from 'qr-image';
import pipe from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([
    {
        'message':'Input Your Image',
        'name':'url'
    }
  ])
  .then((answers) => {
    const url = answers.url;
    let qrPng = qr.image(`${url}`);
    qrPng.pipe(fs.createWriteStream(`qr_img.png`));
    console.log('Image created');

    fs.writeFile(
        'URL.txt',
        url,
        (err)=>{
            if (err) throw err;
            console.log('URL Was written!');
        }
    )
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('INPUT ERROR: Something Wrong with Your Input')
    } else {
      throw error ;
    }
  });

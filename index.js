const fs = require('fs');

// const text = "Occaecat occaecat dolore ut mollit.";
// const row = "Occaecat est veniam tempor ad deserunt ut laboris. Fugiat proident ex aliqua non in amet tempor proident proident voluptate elit et. Anim dolor et sint consectetur est veniam ut magna elit fugiat cillum id qui. Consequat mollit reprehenderit laboris ullamco do aute consequat voluptate ullamco adipisicing officia.";

// const row3 = `Reprehenderit sunt laborum exercitation minim aliqua. Cupidatat culpa ad consectetur id enim sit veniam in eiusmod Lorem voluptate excepteur.
// Adipisicing nostrud amet voluptate reprehenderit est.
// Eiusmod cupidatat ex labore dolor occaecat do. Consequat adipisicing aliquip elit esse sint mollit laborum consequat mollit.

// Adipisicing consectetur magna consectetur esse nulla aliquip quis consequat id sunt.Ut ad incididunt incididunt deserunt ad ex sint in irure qui. Amet minim laboris Lorem ipsum minim nulla duis. Do sit est ut ex quis laboris ad sunt deserunt nisi quis dolor. Ad duis ea irure laborum elit et irure magna laboris incididunt laborum. Consequat excepteur fugiat nulla proident ullamco et do. Reprehenderit aliqua non do sit cupidatat qui laboris non.`;

// // console.log('1');
// // // row + '\n\n' + text + `\nrow3:\n` + row3
// // fs.writeFileSync("./test.txt", `${row}\n\n${text}\nrow3:\n${row3}`, { encoding: 'utf-8' });
// // console.log('2');

// // console.log('1');
// // fs.writeFile("./async_text.txt", row + '\n\n' + text + `\nrow3:\n` + row3, (err, data) => {
// //  console.log('2');
// //  if (err) {
// //   console.log('err:', err.toString());
// //  }
// //  console.log('data:', data);
// // });
// // console.log('3');

// // console.log('1');
// // await fs.writeFile("./async_text.txt", row + '\n\n' + text + `\nrow3:\n` + row3, (err, data) => {
// //  console.log('2');
// //  if (err) {
// //   console.log('err:', err.toString());
// //  }
// //  console.log('data:', data);
// // });
// // console.log('3');

// const func = async () => {
//  console.log('1');
//  await new Promise((resolve, reject) =>
//   fs.writeFile(
//    "./async_text.txt",
//    row + '\n\n' + text + `\nrow3:\n` + row3,
//    (err, data) => {
//     console.log('2');
//     if (err) {
//      console.log('err:', err.toString());
//      return reject(err);
//     }
//     console.log('data:', data);
//     return resolve(data);
//    }));
//  console.log('3');
// };

// func();

// let arr = [45646, 678678, "fghfgh"];
// fs.writeFile('./arr.json', arr.toString(), () => { });
// let obj = { a: 1 };
// fs.writeFile('./obj.json', JSON.stringify(obj), () => { });
// let arrObj = [{ g: 5 }, { f: 45 }];
// fs.writeFile('./arrObj.json', JSON.stringify(arrObj), () => { });
// fs.appendFile('./arrObj.json', JSON.stringify(arrObj), () => { });
// // fs.re;

// fs.readFile('./arr.json', (err, data) => {
//  if (err) {
//   console.log(err);
//  } else {
//   let text = data.toString(); // type is string
//   console.log(text);
//   let arr = text.split(','); // type is array of string
//   console.log(arr);
//  }
// });


const func = async () => {
 const text = await new Promise((res, rej) => {
  fs.readFile('./scenario.txt', (err, data) => {
   if (err) {
    return rej(err);
   }

   return res(data.toString());
  });
 });

 const charactersWithDuplicates = text
  .match(/^[a-zA-Z]+:/gm);
 if (!charactersWithDuplicates) {
  throw new Error('Character names was not found');
 }
 const characters = charactersWithDuplicates
  .map(character => {
   return character.slice(0, -1);
  });
 console.log(characters);
};

func();
export default function hexGen() {
    const characters = '0123456789ABCDEF';
    let hexNumber = '';
  
    // Loop to generate five
    for (let i = 0; i < 8; i++) {
      hexNumber += characters[Math.floor(Math.random() * 16)];
    }
  
    return hexNumber;
};
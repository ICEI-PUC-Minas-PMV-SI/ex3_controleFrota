const env = process.env.NODE_ENV || 'dev';

const config = () => {
  switch (env) {
    case 'dev':
      return {
        bd_uriString: 'mongodb+srv://nodejs_api:5Xq5eeT74MPiMe6r@cluster0.lh6en.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      }
  }
}

console.log(`Starting API in environment ${env.toLocaleUpperCase()}`);

module.exports = config();
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  console.log('VPC_ID 👉', process.env.VPC_ID);

  return {
    body: JSON.stringify({message: `${process.env.VPC_ID} 🎉`}),
    statusCode: 200,
  };
}

module.exports = {main};

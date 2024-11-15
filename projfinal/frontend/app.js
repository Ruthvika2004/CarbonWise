const config = require('./config');
let web3;
let contract;

async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('Please install MetaMask to use this application!');
    }
}

async function loadContract() {
    const abi = [ 
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "credits",
              "type": "uint256"
            }
          ],
          "name": "CreditsAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "footprint",
              "type": "uint256"
            }
          ],
          "name": "FootprintAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "UserRegistered",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "users",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "totalFootprint",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalCredits",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            }
          ],
          "name": "registerUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "addCarbonFootprint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_credits",
              "type": "uint256"
            }
          ],
          "name": "addCarbonCredits",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "getUserInfo",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        } ];
    const contractAddress = config.contractAddress;
    contract = new web3.eth.Contract(abi, contractAddress);
}

async function registerUser() {
    const name = document.getElementById("name").value;
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.registerUser(name).send({ from: accounts[0] });
        alert('User Registered');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function addFootprint() {
    const footprint = document.getElementById("footprint").value;
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.addCarbonFootprint(footprint).send({ from: accounts[0] });
        alert('Footprint Added');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function addCredits() {
    const credits = document.getElementById("credits").value;
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.addCarbonCredits(credits).send({ from: accounts[0] });
        alert('Credits Added');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function getUserInfo() {
    const accounts = await web3.eth.getAccounts();
    try {
        const userInfo = await contract.methods.getUserInfo(accounts[0]).call();
        document.getElementById("userInfo").innerText = `Name: ${userInfo[0]}, Total Footprint: ${userInfo[1]}, Total Credits: ${userInfo[2]}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

window.onload = async () => {
    await loadWeb3();
    await loadContract();
};

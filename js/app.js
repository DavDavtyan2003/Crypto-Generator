const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Csolana&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true';

const cryptos = document.getElementById("cryptos");

let coins;


let searchBox = document.getElementById('searchBox');



let settings = {
    "async": true,
    "scrossDomain": true,
    "url": url,
    "method": "GET",
    "headers": {}
}



const displayInfo = (coins) => {
    return coins.map((coin) => `
    <div class="crypto">
    <img src=${coin.src} alt="${coin.pair_name}">
    <div class="crypto-info">
    <h3 class="pairName">${coin.pair_name.toUpperCase()}</h3>
    <p class="pairPrice">$${coin.price}</p>
    <p class="pairChange">${coin.d_change.toFixed(2)}%</p>
        </div>
    </div>
    `).join('');
};

const loadData = (data) => {
    coins = [
        {
            name: "bitcoin",
            pair_name: "BTC/USD",
            price: data.bitcoin.usd,
            d_change: data.bitcoin.usd_24h_change,
            src: "./images/Bitcoin.svg.png"
        },
        {
            name: "ethereum",
            pair_name: "ETH/USD",
            price: data.ethereum.usd,
            d_change: data.ethereum.usd_24h_change,
            src: "./images/ethereum-logo.png"
        },

        {
            name: "solana",
            pair_name: "SOL/USD",
            price: data.solana.usd,
            d_change: data.solana.usd_24h_change,
            src: "./images/Solana_logo.png"
        },

        {
            name: "dogecoin",
            pair_name: "DOGE/USD",
            price: data.dogecoin.usd,
            d_change: data.dogecoin.usd_24h_change,
            src: "./images/Dogecoin_Logo.png"
        }
    ];

    const coinsHTML = displayInfo(coins);
    cryptos.innerHTML = coinsHTML;
}





fetch(url, settings)
    .then(response => response.json())
    .then(data => {
        loadData(data)

    })



searchBox.addEventListener('keyup', (e) => {
    let target = e.target.value.toUpperCase();
    const filteredCoins = coins.filter((coin) => {
        return coin.name.toUpperCase().includes(target) || coin.pair_name.toUpperCase().includes(target);
    });
    cryptos.innerHTML = displayInfo(filteredCoins);
})
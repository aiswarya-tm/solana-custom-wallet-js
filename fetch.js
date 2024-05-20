async function main() {
    fetch('https://q3equc7ii6hxykko2u2izhok7qrzd7uaxkxj7uaujf2ohnzujyoa.arweave.net/hskKC-hHj3wpTtU0jJ3K_COR_oC6rp_QFEl047c0Thw')
.then(function (response) {
    console.log("res ", response)
    return response.json();
})
.then(function (data) {
    // Do something with data
});

}

main()
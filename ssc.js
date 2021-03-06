const rp = require('request-promise')
const cheerio = require('cheerio');
const fs = require('fs') ;
let user_list  = [];
let URL = "https://jsonplaceholder.typicode.com/users/"

function make_api_call(id){
    var options = {
        method: 'POST',
        uri: 'https://www.results.shiksha/goa/ssc-results.asp',
        form: {
            rollno:id,
            rollsrch:'Submit'
        },
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
          },
    };
    return rp(options)
}

async function processUsers(){
    let result;
    for(let i = 28003; i <= 29718; i++){
        console.log(i);
        result = await make_api_call(i);
        const $ = cheerio.load(result);
    var roll = $("body > div.topBg > div.myGrid > div.mainDiv > div > div.midsection > div.txt_details.text-area > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > b").text();
    var name = $("body > div.topBg > div.myGrid > div.mainDiv > div > div.midsection > div.txt_details.text-area > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > b").text();
    var res = $("body > div.topBg > div.myGrid > div.mainDiv > div > div.midsection > div.txt_details.text-area > table:nth-child(2)").html();
        user_list.push({roll,name,res});
    }
    return user_list;
}

async function doTask(){
    console.time('start')
    let result = await processUsers();
    console.timeEnd('start');
    writeFinalData (result);
}
function writeFinalData (data) {
    var toWriteListXml = 'mapusa.json',
    toWriteData = JSON.stringify(data);
    fs.writeFile(toWriteListXml, toWriteData, function (err) {
      if (err) {
      }
      console.log("The file was saved!");
    });
  }
doTask();
const wbm = require('wbm');
const config = require('./config')
const fs = require('fs')
let startTime, endTime

const getContact = (path) => {
  const contact = fs.readFileSync(path, {encoding: 'utf-8'})
  return contact;
}

const getContent = (path) => {
  const content = fs.readFileSync(path, {encoding: 'utf-8'})
  return content;
}

function starttimer() {
  startTime = new Date();
}

function endtimer() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  console.log("Time Elapsed: " + seconds + " seconds");
}

starttimer() 

wbm.start().then(async () => {
	let contactlist = getContact(config.contact)
  	const phones = contactlist.split(/\r?\n/)
  	const precontent = getContent(config.content)
    const message = (precontent)
    await wbm.send(phones, message);
    await wbm.end();
    endtimer()
}).catch(err => console.log(err));
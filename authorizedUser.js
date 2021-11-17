const authorizedUser = (req, res, next) => {
    let { email } = req.query;
    // console.log(email);

    if(process.env[email] == undefined){
        process.env[email] = 1;
    } else {
        process.env[email]++
    }
    console.log(process.env[email]);

    if(email != undefined){
        if(process.env[email] <= 5){
            console.log(`Hello, ${email}! You have ${5 - process.env[email]} uses left.`);
        }
    } else {
        console.log("You must add your email to the url, for example:\nhttps://wetsocks.com/?email=example@email.com");
        return;
    }

    if(process.env[email] <= 5) {
        next();
    } else {
        console.log(`You've connected too many times.`);
        return
    }
}

module.exports = authorizedUser;
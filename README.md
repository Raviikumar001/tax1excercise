# tax1excercise

Production live link: https://tax1excercise.vercel.app

Tests as run with cypress, Node should be installed for that to run.

To run tests locally: 

Inside the test folder, the cypress config file contains the base URL which is used for testing, I have set it to the production link,

if you're running the project locally, do include the localhost URL of the index HTML running (you'll have to run the index HTML using a server, live server in vs code can also do the job simply), instead of the production url. 

```
cd test
npm install
npx cypress open
```
project screenshot

![image](https://github.com/Raviikumar001/tax1excercise/assets/52815192/65f794f4-ee35-414b-b144-94118beb8206)



Tests screenshot
![image](https://github.com/Raviikumar001/tax1excercise/assets/52815192/7d3b5852-52dd-4b29-965b-b314abb67edf)


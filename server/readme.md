
# Server Setup

1. Open server in terminal
2. run command "npm install"
3. go to app.js file find mongoose.connect(url)
4. add mongodb url in url variable
5. then run command "npm run dev"

========================================


If got "Connect To DB"
then its working

otherwise
you are on your own

=========================================

auth collection is also server folder please check and use it in postman


Login and Signup doesn't need auth token verification so it will work

for logout you need to add bearer token in headers [authorization] 
refer img for more info [https://ibb.co/4wqG5JN]

store token in cookies or local storage where you like
and use token in authorization when calling api from frontend





Chicken dinner
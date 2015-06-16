poll demo
============================
----------------------------
This demo shows how you can create a web app to run surveys, using a Parse backend, and streamdata.io for automatic updates of the UI.

Follow these steps to make it work:

1. Sign up to Parse at https://www.parse.com/signup and create your first app
2. Go to Core tab, and create 3 custom classes, with the following columns: 
  * Question
    * Title
  * Option
    * Title
    * question_id
  * Vote
    * option_id
    * question_id
3. Declare your Parse Application ID, and REST API Key in app.js (Parse keys can be found in Settings tab)
4. Create an account on streamdata.io to get your streamdata.io app token at https://portal.streamdata.io/#/register.
5. Declare your streamdata.io app toket in app.js
6. Save and launch index.html in your favorite browser (works with Chrome, Firefox, Safari, and IE 10+)

You are done! Use Parse UI in order to declare your surveys (questions and options), host it on a server (we use a PHP cartridge in OpenShift), and give the URL to your audience to start the poll. The UI gets udpated automatically as the audience votes for their favorite option. 
 

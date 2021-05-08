let intro = [
  "Hello, I am CookieBot. How may I help you?",
  "Hi, CookieBot here. How may I help you?",
  "Hello, this is CookieBot. How may I help you?",
];
let help = ["How may i assist you?", "How can i help you?", "What i can do for you?"];
let greetings = [
  "I am good, thank you.",
  "I am fine, what about you?",
  "Doing fine, and you?",
];
let hobbies = [
  "I love to solve people's issues",
  "I like to find solution to people's problems",
  "I like answering to queries",
];
let thank = ["Most welcome.", "Not an issue. :)", "Its my pleasure."];
let dt = new Date();
let week = new Array(7);
week[0] = "Sunday";
week[1] = "Monday";
week[2] = "Tuesday";
week[3] = "Wednesday";
week[4] = "Thursday";
week[5] = "Friday";
week[6] = "Saturday";

let tdy = week[dt.getDay()];

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, "0");
let year = dateObj.getFullYear();
let date = month + "\n" + day + "," + year;
$(function () {
  var INDEX = 0;
  $("#chat-submit").click(function (e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if (msg.trim() == "") {
      return false;
    }
    generate_message(msg, "self");
    var buttons = [
      {
        name: "Existing User",
        value: "existing",
      },
      {
        name: "New User",
        value: "new",
      },
    ];
    setTimeout(function () {
      generate_message_bot(msg, "user");
    }, 1000);
  });

  function generate_message(msg, type) {
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    str += '          <span class="msg-avatar">';
    if (type == "self") str += '            <img src="../images/def.png">';

    str += "          </span>";
    str += '          <div class="cm-msg-text">';
    if (type == "self") str += msg;

    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
      .hide()
      .fadeIn(300);
    if (type == "self") {
      $("#chat-input").val("");
    }
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }
  function generate_message_bot(msg, type) {
    msg = msg.toLowerCase();
    let finalMsg =
      "I could not understand your query, you can mail your queries at cookieclan@gmail.com. Thank you.";
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      finalMsg = intro[Math.floor(Math.random() * intro.length)];
    }
    if (msg.includes("who are you")) {
      finalMsg = intro[Math.floor(Math.random() * intro.length)];
    }
    if (msg.includes("help")) {
      finalMsg = help[Math.floor(Math.random() * help.length)];
    }
    if (msg.includes("day")) {
      finalMsg = `It's ${tdy}.`;
    }
    if (msg.includes("date")) {
      finalMsg = date;
    }
    if (msg.includes("time")) {
      finalMsg = dt.toLocaleTimeString();
    }
    if (msg.includes("assignment")) {
      window.location.href = "/assignments";
    }
    if (msg.includes("how are you")) {
      finalMsg = greetings[Math.floor(Math.random() * greetings.length)];
    }
    if (
      msg.includes("good") ||
      msg.includes("fine") ||
      msg.includes("great") ||
      msg.includes("ok")
    ) {
      finalMsg = "Okay.";
    }
    if (msg.includes("hobbies")) {
      finalMsg = hobbies[Math.floor(Math.random() * hobbies.length)];
    }
    if (msg.includes("thank")) {
      finalMsg = thank[Math.floor(Math.random() * thank.length)];
    }
    if (msg.includes("table")) {
      window.location.href = "/home";
    }
    if (msg.includes("events")) {
      window.location.href = "/events";
    }
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    str += '          <span class="msg-avatar">';
    str += '            <img src="../images/chatbot.jpg">';
    str += "          </span>";
    str += '          <div class="cm-msg-text">';
    str += finalMsg;
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
      .hide()
      .fadeIn(300);
    if (type == "self") {
      $("#chat-input").val("");
    }
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }

  $(document).delegate(".chat-btn", "click", function () {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, "self");
  });

  $("#chat-circle").click(function () {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  });

  $(".chat-box-toggle").click(function () {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  });
});

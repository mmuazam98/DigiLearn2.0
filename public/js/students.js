$(document).ready(() => {
  let btn = $("#submit");
  let form = $("#form");
  let subject = window.location.pathname.split("/")[2];

  let subjectID = subject.substr(1, subject.length);
  let att = [],
    names = [],
    usernames = [],
    uid = [],
    finalObj = {};

  form.submit((e) => {
    e.preventDefault();
    $.each($("input[type='checkbox']"), function () {
      if ($(this).is(":checked")) att.push(1);
      else att.push(0);
    });
    // let cls = $("#class").val();
    // finalObj.subject = cls;
    finalObj.subjectID = subjectID;
    finalObj.attendance = [];
    $(".table tbody tr td:nth-child(2)").each(function () {
      names.push($(this).text());
    });
    $(".table tbody tr td:nth-child(3)").each(function () {
      usernames.push($(this).text());
    });
    $(".table tbody tr td:nth-child(7)").each(function () {
      uid.push($(this).text());
    });

    for (let i = 0; i < names.length; i++) {
      finalObj.attendance.push({
        name: names[i],
        uname: usernames[i],
        uid: uid[i],
        att: att[i],
      });
    }
    let config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finalObj),
    };
    fetch("/mark", config).then(() => {
      console.log("hi");
      window.location.href = "/attendance";
    });
  });
});

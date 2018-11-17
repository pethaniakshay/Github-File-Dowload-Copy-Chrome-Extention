let GITHUB_ROW_URL = "https://raw.githubusercontent.com";
var d = "";
$(document).ready(function() {
  if ($(".file-actions")[0]) {
    injectButton();
    var downloadURL =
      GITHUB_ROW_URL + window.location.pathname.replace("/blob", "");
    $.get(downloadURL, function(data) {
      d = data;
    });
  }

  document.addEventListener("pjax:end", function() {
    if ($(".file-actions")[0]) {
      injectButton();
      var downloadURL =
        GITHUB_ROW_URL + window.location.pathname.replace("/blob", "");
      $.get(downloadURL, function(data) {
        d = data;
      });
    }
  });

  $(document).on("click", ".copy-clipboard", function() {
    var temp = document.createElement("textarea");
    var tempMsg = document.createTextNode(d);
    temp.appendChild(tempMsg);
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  });

  $(document).on("click", ".file-download ", function() {
    var downloadURL =
      GITHUB_ROW_URL + window.location.pathname.replace("/blob", "");
    var file_Name = window.location.pathname.split("/").pop();
    $.get(downloadURL, function(data) {
      $(".result").html(data);
      var a = document.createElement("a");
      var url = URL.createObjectURL(new File([data], { type: "text/plain" }));
      a.href = url;
      a.download = file_Name;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  });

  function injectButton() {
    $(".file-actions").append(
      '<button class="copy-clipboard btn-octicon tooltipped tooltipped-nw" aria-label="Copy Content"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg></button>'
    );
    $(".file-actions").append(
      '<button class="file-download btn-octicon tooltipped tooltipped-nw" aria-label="Download"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path d="M9 12.165h.793c.133 0 .26.054.353.149a.513.513 0 0 1 0 .718l-1.792 1.82a.495.495 0 0 1-.708 0l-1.792-1.82a.511.511 0 0 1-.147-.36c0-.28.224-.507.5-.507H7v-4.06c0-.56.448-1.015 1-1.015s1 .455 1 1.015v4.06zm2-1.015c-.552 0-1-.454-1-1.015 0-.56.448-1.015 1-1.015 1.105 0 2-.909 2-2.03 0-1.121-.895-2.03-2-2.03a1.99 1.99 0 0 0-.258.017A1.995 1.995 0 0 0 9 4.045a1.97 1.97 0 0 0-1.112.343A2.003 2.003 0 0 0 6 3.03c-1.105 0-2 .909-2 2.03 0 .089.006.176.017.262A2.035 2.035 0 0 0 3 7.09c0 1.121.895 2.03 2 2.03.552 0 1 .455 1 1.015 0 .56-.448 1.015-1 1.015-2.21 0-4-1.818-4-4.06a4.09 4.09 0 0 1 1.064-2.758C2.402 2.437 4.036 1 6 1c1.01 0 1.948.383 2.662 1.03a3.962 3.962 0 0 1 3.055 1.066c1.867.342 3.283 2 3.283 3.994 0 2.242-1.79 4.06-4 4.06z" id="cda"></path></button>'
    );
  }
});

function check() {
  const posts = document.querySelectorAll(".post");
  // querySelectorAllメソッドで、postをクラス名にもつ要素を取得
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      // addEventListenerが重複して追加されることを回避
      return null;
      // イベント発火が起きている要素にdata-load = ”true”はまだ追加されていないため、if文の処理は読み込まれず５行下の処理に行く

      // 処理２回目はイベント発火が起きている要素にdata-load = ”true”が追加されているため、post.getAttribute("data-load") != nullの空ではない条件に当てはまり、if文の処理が読み込まれます。その結果、返り値としてreturn null;が返ってきて、処理が止まる流れ
    }
    post.setAttribute("data-load", "true");
    // post.setAttribute("data-load", "true");と記述することで、要素にdata-load = “true”と属性を追加

    // 複数取得した要素に対して、forEachで繰り返し処理
    post.addEventListener("click", () => {
      // 「要素1つずつに対して、『クリック』した際に動作するイベント駆動」
      const postId = post.getAttribute("data-id");
      // getAttributeで属性値を取得することができるので、メモのidを取得
      const XHR = new XMLHttpRequest();
      // 変数XHRから、XMLHttpRequestのメソッドを使用できるように
      XHR.open("GET", `/posts/${postId}`, true);
      // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述
      XHR.responseType = "json";
      // responseTypeメソッドを使用して、レスポンスの形式を指定
      XHR.send();
      // checked.jsに、リクエストを送信
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われます
          // XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示
          return null;
          // avaScriptの処理から抜け出すことができる
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
          // レスポンスに対応する記述
          // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセットします。逆にに未読であればdata-checkは属性ごと削除
        }
      };
    });
  });
}
setInterval(check, 1000);
// setIntervalを使用し、check関数が1秒に1度実行されるように記述
// 第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定

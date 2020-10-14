function memo() {
  const submit = document.getElementById("submit");
  // index.htmlの<%= form.submit '投稿する' , id: "submit" %>に注目してください。id
  submit.addEventListener("click", (e) => {
    // クリックしたときのイベント
    const formData = new FormData(document.getElementById("form"));
    // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    // HTTPメソッドはPOST、パスは/posts、非同期通信はtrueと設定
    XHR.responseType = "json";
    // 返却されるデータ形式はJSONになりますので、jsonを指定
    XHR.send(formData);

    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      // HTMLの描写する場所を指定する際に使用する描画する親要素のlistの要素を取得
      const formText = document.getElementById("content");
      // formTextを取得する理由は、メモの入力フォームをリセットするため

      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。
      // 第一引数にafterendを指定することで、要素listの直後に挿入できます。
      formText.value = "";
      // 「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組み
    };
    e.preventDefault();
    // 処理が重複しないように
  });
}
window.addEventListener("load", memo);
